import React, { useState } from "react";
import { AuthAction, withAuthUserSSR } from "next-firebase-auth";
import { authState } from "../contexts/AuthContext";
import Link from "next/link";

const ResetPassword = () => {
  const { resetPassword } = authState();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setEmail(value);
  };

  const reset = async () => {
    if (email === "") return setError("Email required");

    setLoading(true);

    try {
      await resetPassword(email);
      setError("");
      setMessage("Please check email for reset link");
      setLoading(false);
      setEmail("");
    } catch (error) {
      setMessage("");
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-4/5 p-5 space-y-10 rounded-md shadow-md md:w-2/5">
        {message && <p className="text-center text-green-600">{message}</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <h1 className="text-3xl text-center">Reset Password</h1>

        <div className="space-y-5">
          <input
            type="email"
            className={`block w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:border-green-500 ${
              error && "border-red-600"
            }`}
            placeholder="Email"
            onChange={handleChange}
            value={email}
            name="email"
          />
        </div>

        <div className="flex flex-col items-center justify-center space-y-5">
          <button
            className="w-1/2 p-2 text-white bg-green-500 rounded-md"
            onClick={reset}
          >
            {!loading ? "Reset" : "Resetting..."}
          </button>

          <Link href="/login">
            <a className="inline-block text-gray-400">Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default ResetPassword;
