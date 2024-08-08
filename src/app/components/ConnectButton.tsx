import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
            <w3m-connect-button label="User" />
          </div>
          <div
            className="cursor-pointer px-4 py-2 hover:bg-gray-200 flex justify-center"
            onClick={() => handleOptionClick("connect-as-investor")}
          >
            <w3m-connect-button label="Investor" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
