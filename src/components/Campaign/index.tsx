import { useState, useEffect } from "react";
import Footer from "./Footer";
import Info from "./Info";
import Rules from "./Rules";
import Status from "./Status";
import Modal from "../modals/Modal";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  erc20ABI,
  useContractRead,
  useAccount,
  useNetwork,
  useContractEvent,
} from "wagmi";
import { resolveReferralLink } from "@/helpers/referrals";
import { HyperclusterABI } from "@/helpers/abi";
import { settings } from "@/config/config";

export default function Campaign({
  refCode,
  campaign,
}: {
  refCode?: string;
  campaign?: string;
}) {
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
    "YOUR REFERRAL CODE",
  ]);

  const [referrer, setReferrer] = useState("");
  const { address: userAddress } = useAccount();
  const [campaign_address, setCampaignAddress] = useState(campaign);

  const { data: isInCampaign } = useContractRead({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: "isInCampaign",
    args: ["0xdbb7b4F9f76396662CEc08f76CadA37514458280"],
  });

  // has the user referred anyone to claim rewards?
  const { data: getReferred } = useContractRead({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: "getReferred",
    args: [userAddress],
  });

  // this triggers if you were sent via referral link
  useEffect(() => {
    if (refCode) {
      decodeRefCode(refCode);
    }
  }, [refCode]);

  const decodeRefCode = async (code: string) => {
    // const res = await fetch(settings.endpoint + `/api/resolve?ref=${code}`, {
    //   headers: {
    //     api_key: "8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL",
    //   },
    // });
   //  const { referrer, referring, campaign_id } = await res.json();

    // console.log(referrer)

    // if (campaign !== campaign_id) {
    //   console.log("Warning: campaign_address mismatch", campaign, campaign_id);
    // }

    let newParams = [...params];
    newParams[0] = referrer;
    setParams(newParams);
    setReferrer(referrer);
    // setCampaignAddress(campaign_id);
    setSelect("referred");
  };

  // TODO: change to add referrers
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: "addReferral",
    onError(error) {
      if (error.message.includes("Already in")) {
        setSelect("notReferred");
      }
    },
  });

  const { data: code } = useContractRead({
    address: settings.fuji.HyperclusterImplementation.address as any,
    abi: settings.fuji.HyperclusterImplementation.abi,
    functionName: "milestoneRewards",
    args: [0],
  });

  // http://localhost:3000/campaign/anything?ref=401c35625d67701f9b572fe8c8313d71b3618170a7f1b6c76de0b13d3e671979cd2d2dc6e7bce5fc4e4ea5697d8f9d3c5d7f58f2e21e838c5c6cdaa8e74787e73d19f61dc65d28fc831e09d75bae2036c288dd309f5cbadfa10b88384fa75b41
  const handleConnect = async () => {
    // console.log(userAddress, refCode);
    let refCode = 12;
    if (userAddress && refCode) {
      // const res = await fetch(settings.endpoint + "/api/upload", {
      //   method: "GET",
      //   headers: {
      //     api_key: "8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL",
      //   },
      // });
      

      // const { slotId, version } = await res.json();
      //console.log(slotId, version);

      const slotId = 0;

      const version = 1702351741;

      try {
        write?.({
          args: [["fCsode", ""], slotId, version, "", [""]],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRefer = async () => {
    if (isInCampaign) {
      const campaign_id = settings.fuji.HyperclusterImplementation.address;

      // const res = await fetch(settings.endpoint + "/api/generate", {
      //   method: "POST",
      //   headers: {
      //     api_key: "8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL",
      //   },
      //   body: JSON.stringify({
      //     referrer_address: userAddress,
      //     campaign_id: campaign_id,
      //   }),
      // });

      const res = "dwqnionodwqino29039012n12on312312"

      let newParams = [...params];
      newParams[3] =
        settings.endpoint +
        `/campaign/${campaign_id}?ref=` +
        (await res); // res.text()
      setParams(newParams);
      setSelect("refer");
    }
  };

  const handleClaim = () => {
    setSelect("claim");

    // console.log(getReferred)
    // if (getReferred) {
    //   setSelect("claim")
    // } else {
    //   setSelect("friendsNo")
    // }
  };

  const unwatch = useContractEvent({
    address: campaign_address as any,
    abi: settings.sepolia.HyperclusterImplementation.abi,
    eventName: "RewardsClaimed",
    listener(log) {
      console.log(log);
      unwatch?.();
    },
  });

  useEffect(() => {
    console.log("IMPLE" + code);
  }, []);

  return (
    <div className="h-[100%] flex justify-between ">
      <div className="flex-1">
        <Info />
        <Status
          isInCampaign={isInCampaign as boolean}
          getReferred={getReferred as []}
          handleConnect={handleConnect}
          handleRefer={handleRefer}
          handleClaim={handleClaim}
        />
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
