import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-10">
      <h1 className="font-medium text-2xl uppercase">Blog.io</h1>
      <div className="flex items-center gap-3">
        <Link to={"/auth?mode=login"} className="btn btn-outline">
          Login
        </Link>
        <Link to={"/auth?mode=register"} className="btn btn-neutral">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
