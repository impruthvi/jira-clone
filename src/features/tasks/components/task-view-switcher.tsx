"use client";

import { useCallback } from "react";
import { useQueryState } from "nuqs";
import { Loader, PlusIcon } from "lucide-react";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { Button } from "@/components/ui/button";
import { DottedSeparator } from "@/components/dotted-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { DataKanBan } from "./data-kanban";
import { DataFilters } from "./data-filters";

import { TaskStatus } from "../types";

import { useGetTasks } from "../api/use-get-tasks";
import { useBulkUpdateTask } from "../api/use-bulk-update-task ";

import { useTaskFilters } from "../hooks/use-task-filters";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const TaskViewSwitcher = () => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();
  const [view, setView] = useQueryState("task-view", { defaultValue: "table" });
  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate,
  });
  const { open } = useCreateTaskModal();
  const { mutate: bulkUpdate } = useBulkUpdateTask();

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({ json: { tasks } });
    },
    [bulkUpdate]
  );

  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              Table
            </TabsTrigger>

            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Kanban
            </TabsTrigger>

            <TabsTrigger value="calender" className="h-8 w-full lg:w-auto">
              Calender
            </TabsTrigger>
          </TabsList>
          <Button className="w-full lg:w-auto" size="sm" onClick={() => open()}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent className="mt-0" value="table">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent className="mt-0" value="kanban">
              <DataKanBan
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent className="mt-0" value="calender">
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
