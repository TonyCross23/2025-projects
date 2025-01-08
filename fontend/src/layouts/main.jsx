import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Mail = () => {
  return (
    <div>
      <Navbar />
      <section className="p-10">
        <Outlet />
      </section>
    </div>
  );
};

export default Mail;
