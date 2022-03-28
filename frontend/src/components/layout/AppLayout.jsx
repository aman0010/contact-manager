import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import React, { useState } from "react";

const AppLayout = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div
            style={{
                padding: isOpen ? "0px 0px 0px 240px" : "0px 0px 0px 65px",
                minHeight: "100vh",
            }}
        >
            <Sidebar changeState={setIsOpen} />
            <Outlet />
        </div>
    );
};

export default AppLayout;
