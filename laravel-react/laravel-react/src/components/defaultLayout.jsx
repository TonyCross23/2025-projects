import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

const DefaultLayout = () => {
    const { user, token } = useStateContext;
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">React + Laravel</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>{user.name}</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li>
                                        <a
                                            onClick={loggingOut}
                                            className="btn btn-danger"
                                        >
                                            Log out
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default DefaultLayout;
