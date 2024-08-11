"use client";

import ProjectPost from "@/components/ProjectPost";
import { trpc } from "@server/client";
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
  const getPosts = trpc.user.getPosts.useQuery();
  const ethToWei = (eth: number | string): string => {
    if (typeof eth === "string") {
      eth = parseFloat(eth);
    }

    if (isNaN(eth)) {
      throw new Error("Invalid ETH amount");
    }

    // 1 ETH = 1e18 Wei
    const wei = BigInt(Math.round(eth * 1e18));
    return wei.toString();
  };
  const { data: hash, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const valueInWei = ethToWei(amount);

    writeContract({
      address: "0x3235f63AD203987fCD9c5658b701A4cc4EB7442C",
      abi: FundAllocatorABI,
      functionName: "fundCreator",
      args: [creatorAddress],
      value: BigInt(valueInWei), // Send ETH directly
    });
  }

  return (
    <form onSubmit={submit}>
      <h2>Fund a Creator With ETH Amount</h2>
      {getPosts.data?.map((post, index) => (
        <ProjectPost
          key={index}
          link={post.thumbnail ?? ""} // Add null coalescing operator to handle null values
          userId={post.userId ?? ""}
          walletId={post.userId ?? ""}
        />
      ))}
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
