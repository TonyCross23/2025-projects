import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const getUserInfo = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/profile`, {
      credentials: "include",
    });
    const useData = await res.json();
    setUserInfo(useData);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const logout = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    if (res.ok) {
      setUserInfo(null);
    }
  };

  return (
    <div className="flex items-center justify-between p-10">
      <Link to={"/"}>
        <h1 className="font-medium text-2xl uppercase">Blog.io</h1>
      </Link>
      <div className="flex items-center gap-3">
        {userInfo ? (
          <>
            <Link to={"/post/create"} className="btn btn-outline">
              Create post
            </Link>
            <p
              onClick={logout}
              className="btn btn-error text-white cursor-pointer"
            >
              Logout
            </p>
          </>
        ) : (
          <>
            <Link to={"/auth?mode=login"} className="btn btn-outline">
              Login
            </Link>
            <Link to={"/auth?mode=register"} className="btn btn-neutral">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
