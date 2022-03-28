import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import React, { useState } from "react";
import PrivateRoute from "../PrivateRoute";


const AppLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

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
