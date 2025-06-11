import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};
function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-1 flex-col  bg-muted">{children}</main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
