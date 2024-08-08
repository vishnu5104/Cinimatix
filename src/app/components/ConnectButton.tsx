import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/css/sigin.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
const ConnectButton = () => {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionClick = (path: string) => {
    router.push(path);
    setDropdownVisible(false);
  };

  return (
    <div className="relative">
      <button
        className="w-[140px] text-[20px] h-[53px] rounded-[30px] bg-white font-[500] text-black"
        onClick={handleDropdownToggle}
      >
        Connect As
      </button>
      {dropdownVisible && (
        <div className="absolute right-0 mt-2 w-[140px] bg-white rounded-md shadow-lg">
          <div
            className="cursor-pointer px-4 py-2 hover:bg-gray-200 flex justify-center"
            onClick={() => handleOptionClick("connect-as-user")}
          >
            <a
              href={`/api/auth/signin`}
              className={styles.buttonPrimary}
              onClick={(e) => {
                e.preventDefault();
                signIn("worldcoin");
              }}
            >
              Sign in As User
            </a>
          </div>
          <div
            className="cursor-pointer px-4 py-2 hover:bg-gray-200 flex justify-center"
            onClick={() => handleOptionClick("connect-as-investor")}
          >
            <a
              href={`/api/auth/signin`}
              className={styles.buttonPrimary}
              onClick={(e) => {
                e.preventDefault();
                signIn("worldcoin");
              }}
            >
              Sign in As Investor
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
