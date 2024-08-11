"use client";

import React, { useState } from "react";
import ProjectSetup from "@/components/ProjectSetup";
import TwoColumnHeader from "@/components/TwoColumnHeader";
import { useAccount } from "wagmi";
import DialogModel from "@/components/DialogModel";
import { trpc } from "@server/client";
import ProjectPost from "@/components/ProjectPost";
import { signOut, useSession } from "next-auth/react";

const SwitchToCreator = () => {
  const { address } = useAccount();
  const { data: session, status } = useSession();

  console.log(
    "the data od ses, for waalet?",
    status,
    session?.user?.name,
    address
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const getUsers = trpc.user.getUsers.useQuery();
  const getPosts = trpc.user.getPosts.useQuery();
  const addPost = trpc.user.addPost.useMutation({
    onSettled: () => {
      getPosts.refetch();
    },
    onSuccess: () => {
      console.log("File uploaded successfully!");
    },
    onError: (error) => {
      console.error("Error uploading file on post:", error);
    },
  });

  const handleNewProjectClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = (formData: any) => {
    const { title, theme, thumbnail } = formData;

    console.log("Form Data:", { title, theme, thumbnail });

    addPost.mutate(
      {
        userId: session?.user?.name ?? "",
        walletAddress: address ?? "",
        title: title,
        theme: theme,
        thumbnail: thumbnail,
      },
      {
        onSuccess: () => {
          console.log("is scuesss!");
        },
        onError: (error) => {
          console.error("Error uploading file th creator:", error);
        },
      }
    );
  };

  return (
    <>
      <div className="w-full flex justify-between items-center mx-[20px]">
        <div>CINIMATIX</div>
        <div className="flex-grow flex justify-center mt-10">
          <TwoColumnHeader />
        </div>
        <div className="mr-[20px]">
          <w3m-button />
        </div>
      </div>

      <div className="flex justify-center w-full mt-[30px]">
        <ProjectSetup onNewProjectClick={handleNewProjectClick} />
      </div>
      <div>Projects</div>
      {JSON.stringify(getPosts.data)}
      <ProjectPost />
      <div>
        <DialogModel
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          onSubmit={handleDialogSubmit}
        />
      </div>
    </>
  );
};

export default SwitchToCreator;
