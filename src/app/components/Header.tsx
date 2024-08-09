"use client";

import React, { useState } from "react";
import SignIn from "./SignIn";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full h-[80px] bg-gray flex items-center justify-between px-4 lg:px-8 z-[99] sticky top-0">
      <div className="text-[20px] font-[700] text-orange-500">Cinimatix</div>
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } fixed top-[100px] right-0 bg-gray w-full h-fit pt-[20px] pb-[20px] flex-col items-center justify-center px-5 transition-transform transform lg:static lg:flex lg:flex-row lg:h-auto lg:w-[500px] lg:bg-transparent lg:justify-between gap-[30px] lg:translate-x-0`}
      >
        <a className="text-white text-lg lg:text-base" href="#home">
          Home
        </a>
        <a className="text-white text-lg lg:text-base" href="#features">
          Features
        </a>
        <a className="text-white text-lg lg:text-base" href="#about">
          About
        </a>
        <div className="lg:hidden mt-4">
          <SignIn />
        </div>
      </nav>
      <div className="hidden lg:flex items-center">
        <SignIn />
      </div>
    </header>
  );
};

export default Header;
