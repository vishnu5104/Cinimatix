"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { trpc } from "@server/client";

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
      alert("Vote successful!");
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

      <Button onClick={handleVote} disabled={isVoting}>
        {isVoting ? "Voting..." : "Vote"}
      </Button>
    </div>
  );
};

export default ThumbnailCard;
