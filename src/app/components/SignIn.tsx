"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import ConnectButton from "./ConnectButton"; // Assuming it's in the same directory
import Spinner from "./Spinner";

const SignIn = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log("loading", loading);
  console.log("the session out", session);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div>
        <button
          className="w-[140px] text-[20px] h-[53px] rounded-[30px] bg-white font-[500] text-black"
          onClick={(e) => {
            e.preventDefault();
            signIn("worldcoin");
          }}
        >
          Sign in
        </button>
      </div>
    );
  }

  // If the user is signed in, show the ConnectButton instead of Sign In/Out buttons
  // the sign out here is temp it will be removed becouse the sign out is for the dashboard like for users or investor

  return <ConnectButton />;
};

export default SignIn;
