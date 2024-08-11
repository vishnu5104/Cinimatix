import Image from "next/image";
import React from "react";

const ThumbnailCard = ({ link }: any) => {
  return (
    <>
      <div className="w-[283px] h-[305px] bg-[#D5C10E] ">
        <div className="w-[228px] h-[174px]">
          <Image src={link} width={228} height={174} />
        </div>
        <div>Wallet Address Of Designer :</div>
        <div>Votes:</div>
      </div>
      ;
    </>
  );
};

export default ThumbnailCard;
