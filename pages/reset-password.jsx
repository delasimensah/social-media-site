import React, { useState, useRef } from "react";
import Link from "next/link";
import Fade from "react-reveal/Fade";
import { AuthAction, withAuthUser, withAuthUserSSR } from "next-firebase-auth";
import { authState } from "../contexts/AuthContext";

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
  const { resetPassword } = authState();
  const emailRef = useRef();

  const [loading, setLoading] = useState(false);

  const reset = async () => {
    setLoading(true);
    try {
      await resetPassword(emailRef.current.value);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
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
                Reset Password
              </h1>
            </Fade>

            <Fade bottom duration={1000} distance="60px">
              <form className="space-y-5">
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  icon={<IoMailOutline className="form-icon" />}
                  val={emailRef}
                />
              </form>
            </Fade>

            <div>
              <button
                className="w-40 py-[5px] text-sm text-gray-300 uppercase bg-purple-600 rounded-full flex justify-center"
                onClick={reset}
              >
                {loading ? (
                  <IoCogOutline className="w-5 h-5 text-white animate-spin" />
                ) : (
                  "send"
                )}
              </button>
            </div>

            <div className="flex space-x-4">
              <Link href="/auth">
                <a className="text-sm text-purple-600 capitalize cursor-pointer">
                  Sign in
                </a>
              </Link>
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
})(AuthPage);

// export default AuthPage;
