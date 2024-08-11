"use client";
import Image from "next/image";
import React from "react";

const ThumbnailCard = ({ link }: { link: string }) => {
  return (
    <div className="w-[283px] h-[305px] bg-[#D5C10E] p-2">
      <div className="w-full h-[115px] mx-auto overflow-hidden">
        <Image
          alt="thumbnail"
          width={150} // Fixed width
          height={115} // Fixed height
          src={link}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-2 text-sm">Wallet Address Of Designer:</div>
      <div className="text-sm">Votes:</div>
    </div>
  );
};

export default ThumbnailCard;
