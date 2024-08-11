import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const ProjectPost = ({
  userId,
  link,
  walletId,
}: {
  userId: string;
  link: string;
  walletId: string;
}) => {
  return (
    <>
      <div className="w-[342px] h-[256px] bg-white text-black">
        <div>
          <div>UserId: {userId}</div>
          <div>WalletId: {walletId}</div>
        </div>
        <div className="img">
          <Image
            alt="content"
            src={`https://gateway.pinata.cloud/ipfs/${link}`}
            width={246}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div>Theme to post</div>
        {/* <div className="flex">
          <Button>Fund</Button>
        </div> */}
      </div>
    </>
  );
};

export default ProjectPost;
