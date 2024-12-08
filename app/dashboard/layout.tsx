import Header from "@/components/header/Header.component";
import Sidebar from "@/components/sidebar/Sidebar.component";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden gap-10">
      {/* Sidebar */}
      <Sidebar />

      {/* Page content */}
      <div className="flex-1 p-5">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
