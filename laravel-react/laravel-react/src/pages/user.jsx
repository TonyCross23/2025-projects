import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";

const User = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            getUsers();
        });
    };

    const getUsers = () => {
        setIsLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setIsLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="flex items-center justify-evenly w-full p-10">
                <div>User</div>
                <Link to={"/users/new"} className="btn btn-success">
                    Add new User
                </Link>
            </div>
            <div className="overflow-x-auto ms-40 px-50">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {isLoading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading.....
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!isLoading && (
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <th>{u.id}</th>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td className="flex gap-3">
                                        <Link
                                            to={"/users/" + u.id}
                                            className="btn btn-outline btn-success"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={(e) => onDeleteClick(u)}
                                            className="btn btn-outline btn-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default User;
