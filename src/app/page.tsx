import Header from "@/components/Header";

export default function Home() {
  return (
    <section className="padding-style self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full">
      <Header />
      <div className="bg-text-ddi text-center font-extrabold">
        <h1 className="text-[30px] sm:text-[50px] md:text-[60px] lg:text-[65px] leading-tight">
          A Space for Directors, Designers, and Investors to Unite
        </h1>
      </div>
      <div className="text-white text-center font-light text-[16px] sm:text-[18px] md:text-[20px] lg:text-[21px] leading-relaxed">
        Bridging Visionaries and Investors. A decentralized platform that
        connects filmmakers with backers through token-based proposals. This
        secure and transparent system empowers creators, democratizes film
        funding, and brings visionary ideas to life.
      </div>
    </section>
  );
}
