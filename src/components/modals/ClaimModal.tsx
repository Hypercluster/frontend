import { useContractWrite, useNetwork, useAccount } from "wagmi";
import Dropdown from "../Dropdown";
import { useState } from "react";
import { settings } from "@/config/config";


export default function ClaimModal({
  params,
  close,
}: {
  params: string[];
  close: () => void;
}) {
  const options = ['ETH', 'OPTIMISM', 'ARBITRUM', 'POLYGON', 'BNB', 'BASE']
  const [curOption, setCurOption] = useState(options[0]);

  const { address } = useAccount()


  // TODO: cant get into a campaign page without a referral code
  const { data, write } = useContractWrite({
    address: settings.fuji.HyperclusterImplementation as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
  })



  
  // TODO: also fix this
  const handleClaim = () =>{
    write({
      args: [address, "destinationSelector"]
    })
  }


  return (
    <>
      <p className="text-black font-bold text-xl text-center mt-6">
        CLAIM: <span className="underline underline-offset-4">{params[2]}</span>
      </p>
      <p className="text-black font-bold text-md text-center mt-6">
        Select Chain of Choice
      </p>
      <div className="flex flex-col items-center justify-center pt-8">
        <Dropdown options={options} selectedOption={curOption} setOption={(e) => setCurOption(e)} />
        <button
          className="py-1 px-12 rounded-xl text-white font-bold text-xl text-center tracking-tighter mb-2 mt-4"
          onClick={handleClaim}
        >
          CLAIM
        </button>
      </div>
      <p className="text-black font-bold text-md text-center mt-3">
        POWERED BY CHAINLINK CCIP
      </p>
    </>
  );
}
