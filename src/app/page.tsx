import Image from "next/image";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
<div className="w-full relative bg-black overflow-hidden flex flex-col items-start justify-start pt-[60px] px-[220px] pb-[585px] box-border leading-[normal] tracking-[normal] mq750:pl-[55px] mq750:pr-[55px] mq750:box-border mq1050:pl-[110px] mq1050:pr-[110px] mq1050:box-border">
      <div className="w-[901px] h-[720px] absolute !m-[0] top-[-482px] left-[21px] [filter:blur(600px)] rounded-[50%] [background:linear-gradient(180deg,_#7631ba,_rgba(137,_78,_196,_0))]" />
      <img
        className="w-4 h-4 absolute !m-[0] right-[341px] bottom-[-470px] overflow-hidden shrink-0"
        alt=""
        src="/compassfill-1.svg"
      />
      <section className="self-stretch flex flex-col items-start justify-start gap-[193px] max-w-full gap-24 gap-6 gap-12">
        <Header />
      </section>
    </div>
    </>
  );
}
