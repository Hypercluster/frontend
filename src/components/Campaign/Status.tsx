import { HyperclusterABI } from "@/helpers/abi";
import { useState } from "react";
import { useAccount, useContractReads } from "wagmi";


export default function Status({
  handleConnect,
  handleRefer, 
  handleClaim,
  isInCampaign,
} : {
  handleConnect: () => void;
  handleRefer: () => void;
  handleClaim: () => void;
  isInCampaign: boolean;
}) {

  const { address } = useAccount();

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: '0x954F64310224f66Dc99847718B309e3EB72DA64A',
        abi: HyperclusterABI as any,
        functionName: 'referrals',
        args: [address as any, 0],
      },
      {
        address: '0x954F64310224f66Dc99847718B309e3EB72DA64A',
        abi: HyperclusterABI as any,
        functionName: 'referrals',
        args: [address as any, 1],
      },
    ],
  })

  console.log(data);

  return (
    <div className="  h-[60%] p-20 flex flex-col space-y-3">
      <p className="text-[#C9BFD8] text-2xl pb-6">
        <span className="text-[#FF5906]">TRIGGER:</span> EVERY 1% POSITIVE PRICE
        ACTION, RELEASES X TOKENS TO THE REFERRAL NETWORK
      </p>
      <p className="text-white text-2xl">
        <span className="text-[#FF5906]">PASSED BOT CHECK: </span>
        {isInCampaign ? <span className="text-green-500">YES</span> : <span className="text-red-600">NO</span>}
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
        </span>
        <span>
          {isError && "_ _ _ _ & _ _ _ _"}
          {(data?.[0].result as unknown as string) != "0x0000000000000000000000000000000000000000" ? data?.[0].result : " _ _ _ _ "}
          & 
          {(data?.[1].result as unknown as string) != "0x0000000000000000000000000000000000000000" ? data?.[1].result : " _ _ _ _"}

        </span>

      
      
      </p>
      <div className=" pt-24 flex space-x-10 tracking-tight  pb-10">
        {isInCampaign ? 
        <p className=" text-2xl text-[#C9BFD8] bold"> JOINED </p>
        :
        <p className=" text-2xl text-[#C9BFD8] hover:text-[#FF5906] hover:cursor-pointer" onClick={handleConnect}> JOIN </p>
        }
        <p className=" text-2xl text-[#C9BFD8] hover:text-[#FF5906] hover:cursor-pointer" onClick={handleRefer}> REFER </p>
        <p className=" text-2xl text-[#C9BFD8] hover:text-[#FF5906] hover:cursor-pointer" onClick={handleClaim}> CLAIM </p>
      </div>
    </div>
  );
}
