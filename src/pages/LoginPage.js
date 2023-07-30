import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

function LoginPage() {
  const signInUser = () => {
    console.log("Triggered");
    signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };
  return (
    <div className="grid place-items-center mt-80">
      <h1 className="text-3xl font-bold text-blue-400">ChatApp</h1>
      <button
        onClick={signInUser}
        className="bg-green-400 rounded-lg p-4 text-sm font-bold text-white hover:scale-110 transition-all duration-200 ease-in-out mt-5"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginPage;
