"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConnectButton from "./ConnectButton";
import SignIn from "./SignIn";

const Header = () => {
  return (
    <header
      className={`w-[1480px] h-[80px] rounded-31xl bg-gray flex flex-row items-center justify-between pl-[60px] pr-[30px] box-border top-[0] z-[99] sticky max-w-full gap-5 lg:pl-[30px] lg:box-border`}
    >
      <div className="text-[20px] font-[700] text-orange-500">Cinimatix</div>
      <div className="flex-grow"></div>{" "}
      <div className="flex text-white justify-center items-center gap-[30px] mx-auto">
        <a>Home</a>
        <a>Features</a>
        <a>About</a>
      </div>
      <div className="flex-grow"></div>
      <SignIn />
    </header>
  );
};

export default Header;
