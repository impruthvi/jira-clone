import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl">
            <Navbar />
          </div>
          <main className="h-full py-8 px-6 flex flex-col">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
