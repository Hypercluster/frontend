import Image from "next/image";

export default function Rules() {
  return (
    <div className="border-b border-[#FF5906]  h-[70%] p-20 flex flex-col items-center space-y-3">
      <Image
        src={"/campaigns/apecoin.png"}
        width={200}
        height={200}
        alt="apecoin"
      />
      <div className="w-[70%] pt-8">
        <p className="text-[#C9BFD8] text-start text-2xl">RULES</p>
        <div className="w-[80%] mx-auto pt-2">
          <p className="text-xl text-[#C9BFD8]">
            1. CONNECT YOUR WALLET TO PROVE YOUR &nbsp;&nbsp;&nbsp;HUMANITY
          </p>
          <p className="text-xl text-[#C9BFD8]">
            2. BOTS WILL BE ELIMINATED BY AI
          </p>
          <p className="text-xl text-[#C9BFD8]">
            3. REFER 2 WHALE FRIENDS TO CLAIM
          </p>
          <p className="text-xl text-[#C9BFD8]">
            4. YOU GET MORE REWARDS THAN THEM
          </p>
        </div>
      </div>
    </div>
  );
}
