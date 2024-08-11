"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { trpc } from "@server/client";

import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "@/actions/verify-acion";

const ThumbnailCard = ({
  link,
  fileId,
  userId,
}: {
  link: string;
  fileId: number;
  userId: number;
}) => {
  console.log("the data", link, fileId, userId);

  const app_id = "app_66b6775cfbfd969d4389df7f4aeba497" as `app_${string}`;
  const action = "vote";

  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  const { setOpen } = useIDKit();

  const onSuccess = (result: ISuccessResult) => {
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
    window.alert(
      "Successfully verified with World ID! Your nullifier hash is: " +
        result.nullifier_hash
    );
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log(
      "Proof received from IDKit, sending to backend:\n",
      JSON.stringify(result)
    ); // Log the proof from IDKit to the console for visibility
    const data = await verify(result);

    console.log("the data", data);
    if (data.success) {
      console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
    } else {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

  const [isVoting, setIsVoting] = useState(false);

  const {
    data: voteCount,
    isLoading,
    error,
    refetch,
  } = trpc.user.getVotes.useQuery(fileId);

  console.log("the current votes", voteCount);
  const voteMutation = trpc.user.vote.useMutation({
    onSuccess: () => {
      // Handle success, e.g., show a success message or update local state
      refetch();
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.log("Vote error:", error);
    },
  });

  const handleVote = async () => {
    if (fileId === undefined || userId === undefined) {
      console.error("fileId or userId is undefined");
      return;
    }

    setOpen(true);

    setIsVoting(true);
    try {
      await voteMutation.mutateAsync({ fileId, userId });
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error("Error voting:", error);
    }
    setIsVoting(false);
  };

  return (
    <div className="w-[283px] h-[305px] bg-[#D5C10E] p-2">
      <div className="w-full h-[115px] mx-auto overflow-hidden">
        <Image
          alt="thumbnail"
          width={150}
          height={115}
          src={link}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-2 text-sm">Wallet Address Of Designer:</div>
      <div className="text-sm">Votes:{voteCount}</div>
      <IDKitWidget
        action={action}
        app_id={app_id}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Device} // Change this to VerificationLevel.Device to accept Orb- and Device-verified users
      />
      <Button onClick={handleVote} disabled={isVoting}>
        {isVoting ? "Voting..." : "Vote"}
      </Button>
    </div>
  );
};

export default ThumbnailCard;
