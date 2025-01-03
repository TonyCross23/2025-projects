import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Mail = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Mail;
