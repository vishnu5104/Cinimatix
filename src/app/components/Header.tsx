import type { NextPage } from "next";

export type HeaderType = {
  className?: string;
};

const Header: NextPage<HeaderType> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch [backdrop-filter:blur(20px)] rounded-31xl bg-dk flex flex-row items-end justify-between pt-[23px] pb-6 pl-[60px] pr-[30px] box-border top-[0] z-[99] sticky max-w-full gap-5 lg:pl-[30px] lg:box-border ${className}`}
    >
      <div className="h-[100px] w-[1480px] relative [backdrop-filter:blur(20px)] rounded-31xl bg-gray-100 hidden max-w-full" />
      <div className="h-[51px] w-[158px] flex flex-col items-start justify-end pt-0 px-0 pb-px box-border">
        <img
          className="w-9 flex-1 relative max-h-full object-cover z-[1]"
          loading="lazy"
          alt=""
          src="/logo@2x.png"
        />
      </div>
      <nav className="m-0 w-[363px] flex flex-col items-start justify-end pt-0 px-0 pb-[11px] box-border max-w-full mq750:hidden">
        <nav className="m-0 self-stretch h-[29px] relative text-5xl text-white font-inter">
          <a className="[text-decoration:none] absolute top-[0px] left-[0px] text-[inherit] inline-block min-w-[68px] z-[1] ">
            Home
          </a>
          <a className="[text-decoration:none] absolute top-[0px] left-[286px] text-[inherit] inline-block min-w-[77px] z-[1]">
            About 
          </a>
          <a className="[text-decoration:none] absolute top-[0px] left-[127px] text-[inherit] inline-block min-w-[99px] z-[1]">
            Features
          </a>
        </nav>
      </nav>
      <button className="cursor-pointer [border:none] pt-[15px] px-9 pb-3.5 bg-gainsboro-100 rounded-11xl flex flex-row items-start justify-start whitespace-nowrap z-[1] hover:bg-silver">
        <div className="h-[53px] w-[189px] relative rounded-11xl bg-gainsboro-100 hidden" />
        <a className="[text-decoration:none] relative text-xl font-bold font-inter text-black text-center inline-block min-w-[117px] z-[1]">
          Connect Wallet
        </a>
      </button>
    </header>
  );
};

export default Header;
