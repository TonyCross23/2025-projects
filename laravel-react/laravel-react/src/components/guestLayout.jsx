import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <main></main>
            <Outlet />
        </>
    );
};

export default GuestLayout;
