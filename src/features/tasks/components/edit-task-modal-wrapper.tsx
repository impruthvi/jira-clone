"use client";

import { Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { useGetMembers } from "@/features/members/api/use-get-member";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { EditTaskForm } from "./edit-task-form";
import { useGetTask } from "../api/use-get-task";

interface EditTaskWrapperProps {
  onCancel: () => void;
  id: string;
}

export const EditTaskWrapper = ({ onCancel, id }: EditTaskWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });

  const { data: projects, isPending: isLoadingProjects } = useGetProjects({
    workspaceId,
  });

  const { data: members, isPending: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingMembers || isLoadingProjects || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) return null;

  return (
    <div className="">
      <EditTaskForm
        onCancel={onCancel}
        projectOptions={projectOptions ?? []}
        memberOptions={memberOptions ?? []}
        initialValues={initialValues}
      />
    </div>
  );
};
