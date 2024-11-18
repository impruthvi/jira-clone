import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import ProjectIdSettingsPageClient from "./client";

const ProjectIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProjectIdSettingsPageClient />;
};

export default ProjectIdSettingsPage;
