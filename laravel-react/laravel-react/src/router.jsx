import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import DefaultLayout from "./components/defaultLayout";
import User from "./pages/user";
import GuestLayout from "./components/guestLayout";
import UserForm from "./components/userForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <User />,
            },
            {
                path: "/user/new",
                element: <UserForm key="User create" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="User update" />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
