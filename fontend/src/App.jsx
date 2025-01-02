import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layouts/main";
import AuthPage from "./pages/authPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/auth",
          element: <AuthPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
