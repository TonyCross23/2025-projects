import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layouts/main";
import AuthPage from "./pages/authPage";
import Home from "./pages/home";
import PostDetails from "./pages/postDetails";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/auth",
          element: <AuthPage />,
        },
        {
          path: "/post/:id",
          element: <PostDetails />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
