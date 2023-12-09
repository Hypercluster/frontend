import { useState, useEffect } from "react";
import Footer from "./Footer";
import Info from "./Info";
import Rules from "./Rules";
import Status from "./Status";
import Modal from "../modals/Modal";

import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, erc20ABI, useContractRead, useAccount } from "wagmi";
import { resolveReferralLink } from "@/helpers/referrals";
import { HyperclusterABI } from "@/helpers/abi";
import { settings } from "@/config/config";


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
    "45.2 APECOIN"
  ]);


  const { address: userAddress } = useAccount();
  const { data: isUserIn } = useContractRead({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: 'isInCampaign',
    args: [userAddress],
  });


  // this triggers if you were sent via referral link 
  useEffect(() => {
    if (refCode) {
      setSelect("referred")
    }
  }, [refCode])


  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: 'addReferral',
    args: ["0xf2DAf90Dd0Cf2EB5e095775630F0F6F3f8A2b463"],
    onError(error) {
      if (error.message.includes("Already in")) {
        setSelect("notReferred");
      }
    },
    onSuccess(success) {
      // should change button to connected. 
    }
  })


  // http://localhost:3000/api/resolve?ref=76d0730c788a4b2bdd335bd8c8ae1ab8e625a9ed2075fe23289088504100d31da4f2eb1e91c9987a8aba337722e7e8dd9445cb2567e35c561891a7e3af71a33c6c0a4b90511f2fd5c57c4f693207e12b9ff20be261a345958cb3e2662f3d340a
  const handleConnect = async () => {

    write?.();
    // if (userAddress && refCode) {


    //   try {
    //     const res = await fetch(`http://localhost:3000/api/resolve?ref=${refCode}`);
    //     const { referrer, campaign_id, referring } = await res.json();
    
    //     if (referring == "0" || referring == userAddress) {
    //       console.log(referrer)
    //       setSelect("referred")
    //       setRef(referrer)
       
          
    //      // ({ args: [referrer]});
    //     }
    //   } catch (error) {
    //     console.log(error)
    //     setSelect("walletNot");
    //   }
   
    // } 
  }

 

  const handleRefer = async () => {
    if (isUserIn) {
      const res = await fetch(settings.endpoint + "/api/generate", {
        method: 'POST',
        body: JSON.stringify({
          referrer_address: userAddress,
          campaign_id: settings.fuji.HyperclusterImplementation.address
        })
      })

      setParams([settings.endpoint + "/?ref=" + await res.text(),
        ...params
      ]);

      setSelect("refer");
    } else {
      setSelect("notReferred")
    }
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
        <Status isUserIn={isUserIn as boolean} handleConnect={handleConnect} handleRefer={handleRefer} handleClaim={handleClaim}/>
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
