import React, { useState } from "react";
import Link from "next/link";
import Fade from "react-reveal/Fade";

import {
  IoMailOutline,
  IoPersonCircleOutline,
  IoKeyOutline,
  IoCogOutline,
} from "react-icons/io5";

//components
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const signIn = () => {
    console.log("sign in");
  };
  const signUp = () => {
    console.log("sign up");
  };

  return (
    <div className="bg-white dark:bg-dark page-default">
      <div className="grid lg:h-screen lg:grid-cols-2">
        <div className="relative flex items-center justify-center h-screen bg-cover bg-friends-sm md:bg-friends xl:friends-lg lg:h-full">
          <div className="absolute top-0 left-0 z-10 w-full h-full bg-black/40"></div>
          <div className="z-20 w-3/4 md:w-1/2">
            <Fade left duration={1500} distance="30px">
              <h1 className="text-4xl font-bold text-center text-gray-200 xl:text-5xl">
                Connect with friends and family
              </h1>
            </Fade>
          </div>
        </div>

        <div className="flex flex-col h-screen space-y-5 lg:h-full">
          <div className="p-10">
            <div className="w-20 md:w-28">
              <Logo />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow space-y-5">
            <Fade top duration={1000} distance="60px">
              <h1 className="text-2xl font-bold capitalize dark:text-gray-300">
                {isSignIn ? "Sign In" : "Sign up"}
              </h1>
            </Fade>

            <Fade bottom duration={1000} distance="60px">
              <form className="space-y-5">
                {!isSignIn && (
                  <FormInput
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    icon={<IoPersonCircleOutline className="form-icon" />}
                  />
                )}
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon={<IoMailOutline className="form-icon" />}
                />

                <FormInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  icon={<IoKeyOutline className="form-icon" />}
                />
              </form>
            </Fade>

            {isSignIn && (
              <div className="flex justify-end w-64">
                <Link href="/">
                  <a className="text-sm text-purple-600 underline capitalize">
                    forgot password?
                  </a>
                </Link>
              </div>
            )}

            <div>
              <button
                className="w-40 py-[5px] text-sm text-gray-300 uppercase bg-purple-600 rounded-full flex justify-center"
                onClick={isSignIn ? signIn : signUp}
              >
                {loading ? (
                  <IoCogOutline className="w-5 h-5 text-white animate-spin" />
                ) : isSignIn ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            <div className="flex space-x-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {isSignIn ? `Don't have an account?` : "Already Have Account ?"}{" "}
              </p>
              <a
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-sm text-purple-600 capitalize cursor-pointer"
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
