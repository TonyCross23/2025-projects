import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";
import axiosClient from "../axiosClient";

const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    const loggingOut = (e) => {
        e.preventDefault();
        axiosClient.get("/logout").then(({ data }) => {
            setUser(null);
            setToken(null);
        });
    };
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);
    return (
        <div className="min-h-screen flex flex-col">
            <div className="navbar bg-base-100 shadow-md flex justify-between items-center px-4">
                <a className="text-xl font-bold">React + Laravel</a>
                <ul className="menu menu-horizontal space-x-4">
                    <li>
                        <details>
                            <summary>{user?.name || "Guest"}</summary>
                            <ul className="bg-base-100 rounded-t-none">
                                <li>
                                    <button
                                        onClick={loggingOut}
                                        className="btn btn-danger"
                                    >
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
