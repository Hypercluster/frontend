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
  
  // who referrd
  // your referral 

  const [params, setParams] = useState<string[]>([
    "https://hypercluster.io/4xd8",
    "APECOIN REFERRAL NETWORK",
    "45.2 APECOIN",
    "YOUR REFERRAL CODE"
  ]);

  const [referrer, setReferrer] = useState("");

  const { address: userAddress } = useAccount();

  const { data: isInCampaign } = useContractRead({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: 'isInCampaign',
    args: [userAddress],
  });

  // has the user referred anyone to claim rewards?
  const { data: getReferred } = useContractRead({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: 'getReferred',
    args: [userAddress],
  });



  // this triggers if you were sent via referral link 
  useEffect(() => {
    if (refCode) {
      decodeRefCode(refCode);
    }
  }, [refCode])

  const decodeRefCode = async (code: string) => {
    const res = await fetch(settings.endpoint + `/api/resolve?ref=${code}`, {
      headers: {
        api_key: "8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL"
      }
    });
    const { referrer, referring, campaign_id} = await res.json()

    let newParams = [...params];
    newParams[0] = referrer;
    setParams(newParams);
    setReferrer(referrer);
    setSelect("referred")

  }


  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: 'addReferral',
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
    if (userAddress && refCode) {
      try {
          write?.({
            args: [referrer],
          });
         // ({ args: [referrer]});
      } catch (error) {
        console.log(error)
      }
    }
  }

 
  const handleRefer = async () => {
    if (isInCampaign) {
      const campaign_id = settings.fuji.HyperclusterImplementation.address;

      const res = await fetch(settings.endpoint + "/api/generate", {
        method: 'POST',
        headers: {
          api_key: '8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL'
        },
        body: JSON.stringify({
          referrer_address: userAddress,
          campaign_id: campaign_id
        })
      })

      let newParams = [...params];
      newParams[3] = settings.endpoint + `/campaign/${campaign_id}?ref=` + await res.text();
      setParams(newParams);
      setSelect("refer");
    }
  }

  const handleClaim = () => {
    console.log(getReferred)
    if (getReferred) {
      setSelect("claim")
    } else {
      setSelect("friendsNo")
    }
  }

  return (
    <div className="h-[100%] flex justify-between ">
      <div className="flex-1">
        <Info />
        <Status isInCampaign={isInCampaign as boolean} getReferred={getReferred as []} handleConnect={handleConnect} handleRefer={handleRefer} handleClaim={handleClaim}/>
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
