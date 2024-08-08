"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const ConnectAsUser = () => {
  const { address } = useAccount();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (status !== "loading" && !session) {
      // Redirect to the home page if the user is not signed in
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading session...</p>; // Display a loading message while session is being checked
  }

  if (!session || !session.user) {
    return <p>You are not signed in. Please sign in to view this page.</p>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>

        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-[20px] p-4 align-middle justify-center">
            <button
              className="w-[200px] absolute bottom-4  text-[20px] h-[53px] rounded-[30px] bg-blue-500 text-white font-[500] ml-auto"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Show Account Info
            </button>
          </div>

          {isDropdownOpen && (
            <div className="w-[235px] absolute bottom-20 mt-4 p-4 border rounded shadow-md ">
              <div className="mb-4">Wallet Address: {address}</div>
              <div className="mb-4">
                Signed in as:{" "}
                <strong>{session.user?.email ?? session.user?.name}</strong>
              </div>
              <button
                className="w-[140px] text-[20px] h-[53px] rounded-[30px] bg-red-500 text-white font-[500]"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
        {/* Add sidebar content here */}
      </aside>
      <div className="absolute right-4 top-2">
        <w3m-button />
      </div>
    </div>
  );
};

export default ConnectAsUser;
