// DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidePanelNav from "./SidePanelNav.jsx";

const DashboardLayout = () => {
    return (
        <div className="flex">
            <SidePanelNav />
            <main className="flex-1 min-h-screen lg:ml-[256px] mt-16 lg:mt-0">
                <Outlet />  {/* <-- renders whatever page is inside /app/... */}
            </main>
        </div>
    );
};

export default DashboardLayout;
