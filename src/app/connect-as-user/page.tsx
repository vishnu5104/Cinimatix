"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import TwoColumnHeader from "@/components/TwoColumnHeader";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import ProjectPost from "../components/ProjectPost";
import { trpc } from "@server/client";
const ConnectAsUser = () => {
  const { address } = useAccount();
  const { data: session, status } = useSession();
  const router = useRouter();
  const getPosts = trpc.user.getPosts.useQuery();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading session...</p>;
  }

  if (!session || !session.user) {
    return <p>You are not signed in. Please sign in to view this page.</p>;
  }

  return (
    <>
      <div className="w-full flex top-0 ">
        <div>CINIMATIX</div>
        <div className="flex-grow flex items-start justify-center mt-10">
          <TwoColumnHeader />
        </div>
        <div className="relative top-2">
          <w3m-button />
        </div>
      </div>
      <div className="text-white">Post</div>
      <div className="">
        {getPosts.data?.map((post, index) => (
          <ProjectPost
            key={index}
            link={post.thumbnail ?? ""} // Add null coalescing operator to handle null values
            userId={post.userId ?? ""}
            walletId={post.userId ?? ""}
          />
        ))}
      </div>
    </>
  );
};

export default ConnectAsUser;
