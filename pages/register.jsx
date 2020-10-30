import React from "react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-4/5 p-5 space-y-10 rounded-md shadow-md md:w-2/5">
        {error && <p className="text-center text-red-600">{error}</p>}

        <h1 className="text-3xl text-center">Register</h1>

        <div className="space-y-5">
          <input
            type="email"
            className={`block w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:border-green-500 ${
              error && "border-red-600"
            }`}
            placeholder="Email"
            onChange={handleChange}
            value={cred.email}
            name="email"
          />
          <input
            type="password"
            className={`block w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:border-green-500 ${
              error && "border-red-600"
            }`}
            placeholder="Password"
            onChange={handleChange}
            value={cred.password}
            name="password"
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-5">
          <button
            className="w-1/2 p-2 text-white bg-green-500 rounded-md"
            onClick={registerUser}
          >
            {!loading ? "Register" : "Registering..."}
          </button>

          <Link href="/login">
            <a className="inline-block text-gray-400">Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
