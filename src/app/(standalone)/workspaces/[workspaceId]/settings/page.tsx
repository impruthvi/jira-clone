import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

interface WorkspaceSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceSettingsPage = async ({
  params,
}: WorkspaceSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValue = await getWorkspace({
    workspaceId: params.workspaceId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValue={initialValue} />
    </div>
  );
};

export default WorkspaceSettingsPage;
