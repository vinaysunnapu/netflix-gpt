import { useState, useRef } from "react";
import Header from "../components/Header";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>("");

  const name = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current?.value || "", password.current?.value || "");
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current?.value || "",
        password.current?.value || "",
      )
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: name.current?.value || "",
            photoURL: USER_AVATAR,
          });
        })
        .catch((error) => {
          const errorCode = error?.code || "";
          const errorMessage = error?.message || error;
          setErrorMessage(errorCode ? errorCode + "-" + errorMessage : errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
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
        })
        .finally(() => {
          setIsLoading(false);
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
          className="w-full max-w-md rounded-xl bg-black/80 p-8 text-white shadow-xl sm:p-10"
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
        <div className="relative mt-6 w-full">
          <input
            ref={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => {
              let val = e.target.value;
              if (val.startsWith(" ")) val = val.trimStart();
              setPasswordValue(val);
            }}
            className="w-full rounded-lg bg-gray-700 p-4 pr-12"
          />
          {passwordValue.length > 0 && (
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          )}
        </div>

        <p className="mt-4 text-start text-sm font-semibold text-red-500">
          {errorMessage}
        </p>

        <button
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-700 py-4 text-base font-semibold transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-800"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading && (
            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSignInForm ? (isLoading ? "Signing In..." : "Sign In") : (isLoading ? "Signing Up..." : "Sign Up")}
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
