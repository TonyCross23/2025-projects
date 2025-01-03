import React from "react";
import { useSearchParams } from "react-router-dom";

const AuthForm = () => {
  const [searchParans] = useSearchParams();
  const isLoginMode = searchParans.get("mode") === "login";
  return (
    <section className="w-full mx-auto">
      <h2 className="text-center font-blod text-2xl mb-3">
        {isLoginMode ? "Login" : "Register"} Form
      </h2>
      <form>
        <div className="mb-4">
          <label>Enter your name</label>
          <input
            type="text"
            placeholder="Type your name"
            className="input input-bordered w-full block"
          />
        </div>
        <div className="mb-4">
          <label>Enter your password</label>
          <input
            type="password"
            placeholder="Type your password"
            className="input input-bordered w-full block"
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
