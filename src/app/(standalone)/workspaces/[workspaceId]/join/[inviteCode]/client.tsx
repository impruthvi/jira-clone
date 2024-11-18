"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";

const WorkspaceIdJoinClient = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useGetWorkspaceInfo({ workspaceId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <PageError message="Workspace not found" />;
  }
  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm inviteValues={data} />
    </div>
  );
};

export default WorkspaceIdJoinClient;
