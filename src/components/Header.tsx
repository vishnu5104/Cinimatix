'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ConnectButton from './ConnectButton';

const Header = () => {
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
    <header
      className={`w-[1480px] h-[80px] rounded-31xl bg-gray flex flex-row items-center justify-between pl-[60px] pr-[30px] box-border top-[0] z-[99] sticky max-w-full gap-5 lg:pl-[30px] lg:box-border`}
    >
      <div className='text-[20px] font-[700] text-orange-500'>Cinimatix</div>
      <div className="flex-grow"></div> {/* Spacer to push content to the right */}
      <div className="flex text-white justify-center items-center gap-[30px] mx-auto">
        <a>Home</a>
        <a>Features</a>
        <a>About</a>
      </div>
      <div className="flex-grow"></div>
      {/* <div className="relative">
        <button
          className='w-[189px] text-[20px] h-[53px] rounded-[30px] bg-white font-[700]'
          onClick={handleDropdownToggle}
        >
          Connect As
        </button>
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-[189px] bg-white rounded-md shadow-lg">
            <div
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => handleOptionClick('/connect-as-user')}
            >
              User
            </div>
            <div
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              onClick={() => handleOptionClick('/connect-as-investor')}
            >
              Investor
            </div>
          </div>
        )}
      </div> */}
<ConnectButton/>
    </header>
  );
};

export default Header;
