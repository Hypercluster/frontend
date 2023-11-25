import { useState } from "react";

export default function Status() {
  const [passedBotCheck, setPassedBotCheck] = useState(false);
  return (
    <div className="  h-[60%] p-20 flex flex-col space-y-3">
      <p className="text-[#C9BFD8] text-2xl pb-6">
        <span className="text-[#FF5906]">TRIGGER:</span> EVERY 1% POSITIVE PRICE
        ACTION, RELEASES X TOKENS TO THE REFERRAL NETWORK
      </p>
      <p className="text-white text-2xl">
        <span className="text-[#FF5906]">PASSED BOT CHECK: </span>
        {!passedBotCheck ? (
          <>
            <span className="text-red-600">NO/</span>
            YES
          </>
        ) : (
          <>
            NO
            <span className="text-green-500">/YES</span>
          </>
        )}
      </p>
      <p className="text-white text-2xl tracking-tighter">
        <span className="text-[#FF5906] tracking-normal">
          ELIGIBLE TO CLAIM:
        </span>{" "}
        _ _ _ _
      </p>
      <p className="text-white text-2xl tracking-tighter">
        <span className="text-[#FF5906] tracking-normal">
          REFERRED 2 FRENS:
        </span>{" "}
        _ _ _ _ & _ _ _ _
      </p>
      <div className=" pt-24 flex space-x-10 tracking-tight  pb-10">
        <p className=" text-2xl text-[#FF5906]">CONNECT</p>
        <p className=" text-2xl text-[#C9BFD8]">REFER</p>
        <p className=" text-2xl text-[#C9BFD8]">CLAIM</p>
      </div>
    </div>
  );
}
