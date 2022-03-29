import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import PrivateRoute from "../PrivateRoute";


const AppLayout = () => {
    const [isOpen, setIsOpen] = useState(false);        // Sidebar open state

    return (
        <div
            style={{
                padding: isOpen ? "0px 0px 0px 240px" : "0px 0px 0px 65px",
                minHeight: "100vh",
            }}
        >
            <PrivateRoute>
                <Sidebar changeState={setIsOpen} />
                <Outlet />
            </PrivateRoute>
        </div>
    );
};

export default AppLayout;
