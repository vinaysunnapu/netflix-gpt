import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const name = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current?.value || "", password.current?.value || "");
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || "",
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value || "",
            photoURL: USER_AVATAR,
          })
            .then(() => {
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || "",
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="fixed inset-0 -z-10">
        <img className="h-full w-full object-cover" src={BG_URL} alt="background" />
      </div>
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md rounded-xl bg-black bg-opacity-80 p-8 text-white shadow-xl sm:p-10"
        >
        <h1 className="text-2xl font-bold sm:text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="mt-6 w-full rounded-lg bg-gray-700 p-4"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="mt-6 w-full rounded-lg bg-gray-700 p-4"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="mt-6 w-full rounded-lg bg-gray-700 p-4"
        />

        <p className="mt-4 text-center text-sm font-semibold text-red-500">
          {errorMessage}
        </p>

        <button
          className="mt-6 w-full rounded-lg bg-red-700 py-4 text-base font-semibold transition hover:bg-red-600"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="mt-4 text-center text-sm text-white/70 hover:text-white cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
