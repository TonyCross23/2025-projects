import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import DefaultLayout from "./components/defaultLayout";
import User from "./pages/user";
import GuestLayout from "./components/guestLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <User />,
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
