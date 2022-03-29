import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { logout } from "../api/api";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    let location = useLocation();

    const checkValidToken = () => {
        if (!token) return false
        let decodedToken = jwt_decode(token);
        let currentDate = new Date();
        return decodedToken.exp * 1000 > currentDate.getTime()
    }

    if (!checkValidToken()) {
        logout()
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
}
