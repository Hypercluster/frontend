import { useState, useEffect } from "react";
import Footer from "./Footer";
import Info from "./Info";
import Rules from "./Rules";
import Status from "./Status";
import Modal from "../modals/Modal";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, erc20ABI, useContractRead, useAccount } from "wagmi";
import { resolveReferralLink } from "@/helpers/referrals";
import { HyperclusterABI } from "@/helpers/abi";
import { wagmiProvider } from "@/helpers/wagmiProvider";


export default function Campaign({ refCode }:{ refCode?: string}) {
  const [select, setSelect] = useState<
    | "none"
    | "botFail"
    | "claim"
    | "friendsNo"
    | "notReferred"
    | "refer"
    | "referred"
    | "success"
    | "walletNot"
  >("none");
  

  const [params, setParams] = useState<string[]>([
    "https://hypercluster.io/4xd8",
    "APECOIN REFERRAL NETWORK",
  ]);

  const { address: userAddress } = useAccount();

  // this triggers if you were sent via referral link 
  useEffect(() => {
    if (refCode) {
      setSelect("referred")
    }
  }, [refCode])

  const [ref, setRef] = useState("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x954F64310224f66Dc99847718B309e3EB72DA64A",
    abi: HyperclusterABI,
    functionName: 'addReferral',
  })


  // http://localhost:3000/api/resolve?ref=76d0730c788a4b2bdd335bd8c8ae1ab8e625a9ed2075fe23289088504100d31da4f2eb1e91c9987a8aba337722e7e8dd9445cb2567e35c561891a7e3af71a33c6c0a4b90511f2fd5c57c4f693207e12b9ff20be261a345958cb3e2662f3d340a
  const handleConnect = async () => {
    if (userAddress && refCode) {
      try {
        const res = await fetch(`http://localhost:3000/api/resolve?ref=${refCode}`);
        const { referrer, campaign_id, referring } = await res.json();
    
        if (referring == "0" || referring == userAddress) {
          console.log(referrer)
          setSelect("referred")
          setRef(referrer)
          write?.({
            args: [referrer]
          });
        }
      } catch (error) {
        console.log(error)
        setSelect("walletNot");
      }
   
    } 
  }

 

  const handleRefer = () => {
    setSelect("refer")
  }

  const handleClaim = () => {
    if (userAddress) {
      setSelect("claim")
    }
  }

  return (
    <div className="h-full flex justify-between ">
      <div className=" flex-1 ">
        <Info />
        <Status handleConnect={handleConnect} handleRefer={handleRefer} handleClaim={handleClaim}/>
      </div>
      <div className="w-[1px] h-[100%] bg-[#FF5906]"></div>
      <div className="flex-1">
        <Rules />
        <Footer />
      </div>
      <Modal select={select} params={params} close={() => setSelect("none")} />
    </div>
  );
}
