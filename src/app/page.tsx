

import Image from "next/image";
import Header from "@/components/Header";


export default function Home() {



  return (
    <section className="self-stretch flex flex-col items-start justify-start gap-[40px] max-w-full">
      <Header />
      <div className="bg-text-ddi text-[65px] text-center font-[800]">
        A Space for Directors, Designers, and Investors to Unite
      </div>
      <div className="text-white text-center font-[300] text-[21px]">
        Bridging Visionaries and Investors. A decentralized platform that connects filmmakers with backers through token-based proposals. This secure and transparent system empowers creators, democratizes film funding, and brings visionary ideas to life.
      </div>
    </section>

  
  );
}
