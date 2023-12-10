import { useState } from "react";

export default function Info() {
  const [data, setData] = useState({
    name: "APECOIN REFERRAL NETWORK",
    timeUntilLaunch: "00:00:00:00",
    timeLapsedSinceLaunch: "00:00:00:00",
    tokenReward: "299,999 APECOIN ON ETH",
    currentTier: "HIDDEN",
  });
  return (
    <div className="border-b border-[#FF5906] p-20 flex-col space-y-3">
      <p className="text-white text-2xl">
        <span className="text-[#FF5906]">NAME:</span> {data.name}
      </p>
      <p className="text-[#C9BFD8] text-2xl">
        <span className="text-[#FF5906]">TIME UNTIL LANCH:</span>{" "}
        {data.timeUntilLaunch}
      </p>
      <p className="text-[#C9BFD8] text-2xl">
        <span className="text-[#FF5906]">TIME LAPSED SINCE LAUNCH:</span>
        {data.timeLapsedSinceLaunch}
      </p>
      <p className="text-[#C9BFD8] text-2xl">
        <span className="text-[#FF5906]">TOKEN REWARD:</span> {data.tokenReward}
      </p>
      <p className="text-[#C9BFD8] text-2xl">
        <span className="text-[#FF5906]">CURRENT TIER:</span> {data.currentTier}
      </p>
    </div>
  );
}
