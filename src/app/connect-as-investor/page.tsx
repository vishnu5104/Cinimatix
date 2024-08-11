"use client";

import React, { useState } from "react";
import { useWriteContract } from "wagmi";

const FundAllocatorABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "investor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Funded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_creator",
        type: "address",
      },
    ],
    name: "fundCreator",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const ConnectAsInvestor = () => {
  const [creatorAddress, setCreatorAddress] = useState("");
  const [amount, setAmount] = useState("");

  const { data: hash, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = parseFloat(amount); // Keep the amount in ETH

    writeContract({
      address: "0x3235f63AD203987fCD9c5658b701A4cc4EB7442C",
      abi: FundAllocatorABI,
      functionName: "fundCreator",
      args: [creatorAddress],
      value: value, // Send ETH directly
    });
  }

  return (
    <form onSubmit={submit}>
      <h2>Fund a Creator</h2>
      <input
        name="creatorAddress"
        placeholder="Creator's Wallet Address"
        value={creatorAddress}
        onChange={(e) => setCreatorAddress(e.target.value)}
        required
      />
      <input
        name="amount"
        placeholder="Amount in ETH"
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Fund"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  );
};

export default ConnectAsInvestor;
