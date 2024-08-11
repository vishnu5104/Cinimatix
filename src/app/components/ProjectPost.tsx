import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const ProjectPost = ({ link }: { link: string }) => {
  return (
    <>
      <div className="w-[542px] h-[296px]">
        <div>
          <div>UserId: {}</div>
          <div>WalletId: {}</div>
        </div>
        <div className="img">
          <Image alt="content" src={link} width={246} height={200} />
        </div>
        <div>Theme to post</div>
        <div>
          <Button>Fund</Button>
        </div>
      </div>
    </>
  );
};

export default ProjectPost;
