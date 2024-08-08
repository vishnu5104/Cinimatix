"use client";

import React from "react";

import { useAccount } from "wagmi";

const ConnectAsUser = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <>
      <div className="">Wallet Address {address}</div>
    </>
  );
};

export default ConnectAsUser;
