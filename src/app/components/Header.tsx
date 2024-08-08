"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ConnectButton from "./ConnectButton";

import styles from "@/css/sigin.module.css";

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header
      className={`w-[1480px] h-[80px] rounded-31xl bg-gray flex flex-row items-center justify-between pl-[60px] pr-[30px] box-border top-[0] z-[99] sticky max-w-full gap-5 lg:pl-[30px] lg:box-border`}
    >
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn("worldcoin");
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <div className="text-[20px] font-[700] text-orange-500">Cinimatix</div>
      <div className="flex-grow"></div>{" "}
      <div className="flex text-white justify-center items-center gap-[30px] mx-auto">
        <a>Home</a>
        <a>Features</a>
        <a>About</a>
      </div>
      <div className="flex-grow"></div>
      <ConnectButton />
    </header>
  );
};

export default Header;
