import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [searchParans, setSearchParans] = useSearchParams();
  const isLoginMode = searchParans.get("mode") === "login";

  const login = () => {};
  const register = () => {
    const res = fetch(`${import.meta.env.VITE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setSearchParans({ mode: "login" });
    } else {
      console.log("Failed to register");
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
      <form method="POST" onSubmit={handleSubmit}>
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
        <button className="btn btn-neutral w-full">
          {isLoginMode ? "Login" : "Register"} Account
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
