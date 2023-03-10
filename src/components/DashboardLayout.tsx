import React from "react";
import SidebarContent from "./SidebarContent";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-screen grid-cols-12">
      <div className="relative z-10 flex flex-col col-span-3 space-y-8 bg-white shadow-lg shadow-gray-400">
        {/* Sidebar */}
        <SidebarContent />
      </div>

      <div className="col-span-9">{children}</div>
    </div>
  );
};

export default Layout;
