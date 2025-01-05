import { useContext, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const [searchParans, setSearchParans] = useSearchParams();
  const isLoginMode = searchParans.get("mode") === "login";

  const login = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setUserInfo(await res.json());
      setRedirect(true);
    } else {
      alert("Something went wrong");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  const register = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setSearchParans("mode=login");
      setUsername("");
      setPassword("");
    } else {
      alert("Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      login();
    } else {
      register();
    }
  };

  return (
    <section className="w-full mx-auto">
      <h2 className="text-center font-blod text-2xl mb-3">
        {isLoginMode ? "Login" : "Register"} Form
      </h2>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Enter your name</label>
          <input
            type="text"
            placeholder="Type your name"
            className="input input-bordered w-full block"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label>Enter your password</label>
          <input
            type="password"
            placeholder="Type your password"
            className="input input-bordered w-full block"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-neutral w-full">
          {isLoginMode ? "Login" : "Register"} Account
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
