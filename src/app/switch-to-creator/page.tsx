"use client";

import ProjectSetup from "@/components/ProjectSetup";
import TwoColumnHeader from "@/components/TwoColumnHeader";
import React from "react";

const SwitchToCreator = () => {
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

      <div className="flex justify-center h-screen w-full mt-[30px]">
        <ProjectSetup />
      </div>
    </>
  );
};

export default SwitchToCreator;
