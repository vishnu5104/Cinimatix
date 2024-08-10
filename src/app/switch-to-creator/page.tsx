"use client";

import React, { useState } from "react";
import ProjectSetup from "@/components/ProjectSetup";
import TwoColumnHeader from "@/components/TwoColumnHeader";

import DialogModel from "@/components/DialogModel";
import { trpc } from "@server/client";

const SwitchToCreator = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getUsers = trpc.user.getUsers.useQuery();
  const addUsers = trpc.user.addUsers.useMutation({
    onSettled: () => {
      getUsers.refetch();
    },
  });

  const handleNewProjectClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = (formData) => {
    const { title, theme, thumbnail } = formData;

    console.log("Form Data:", { title, theme, thumbnail });

    addUsers.mutate({
      name: title,
      theme: theme,
      thumbnail: thumbnail,
    });
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
      <div>some</div>
      <div className="flex justify-center w-full mt-[30px]">
        <ProjectSetup onNewProjectClick={handleNewProjectClick} />
      </div>
      <div>The data</div>
      {JSON.stringify(getUsers.data)}
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
