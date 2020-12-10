import React, { useState, useRef } from "react";
import Link from "next/link";
import Fade from "react-reveal/Fade";
import { AuthAction, withAuthUser, withAuthUserSSR } from "next-firebase-auth";
import { authState } from "../contexts/AuthContext";

//mui
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  IoMailOutline,
  IoPersonCircleOutline,
  IoKeyOutline,
  IoCogOutline,
} from "react-icons/io5";

//components
import Logo from "../components/Logo";
import FormInput from "../components/FormInput";
import Loader from "../components/Loader";

const AuthPage = () => {
  const { signin, signup } = authState();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const signIn = async () => {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setError("All fields required");
      handleClick();
      return;
    }

    setLoading(true);

    try {
      await signin(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
      handleClick();
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (
      usernameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      setError("All fields required.");
      handleClick();

      return;
    }

    if (usernameRef.current.value.includes(" ")) {
      setError("Username cannot have spaces.");
      handleClick();
      return;
    }

    setLoading(true);

    try {
      await signup(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      setError(error.message);
      handleClick();

      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark page-default">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} severity="error" variant="filled">
          {error}
        </MuiAlert>
      </Snackbar>

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
                    placeholder="Username"
                    icon={<IoPersonCircleOutline className="form-icon" />}
                    val={usernameRef}
                  />
                )}
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon={<IoMailOutline className="form-icon" />}
                  val={emailRef}
                />

                <FormInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  icon={<IoKeyOutline className="form-icon" />}
                  val={passwordRef}
                />
              </form>
            </Fade>

            {isSignIn && (
              <div className="flex justify-end w-64">
                <Link href="/reset-password">
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

//server side redirect when still authenticated
export const getServerSideProps = withAuthUserSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

//needed for client-side routing when authenticated
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
})(AuthPage);
