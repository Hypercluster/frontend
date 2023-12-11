import Leftbar from "@/components/Leftbar";
import React, { useState } from "react";
import { addDays } from "date-fns";
import CampaignSetup from "@/components/Create/CampaignSetup";
import Topbar from "@/components/Topbar";
import RewardingReferrals from "@/components/Create/RewardingReferrals";
import DepositRewards from "@/components/Create/DepositRewards";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractEvent, useAccount, useContractRead } from "wagmi";
import { settings } from "@/config/config";
import { IcreateCampaignParams } from "@/helpers/interface";
import { encodeAbiParameters } from 'viem'


export default function CreatePage() {
  const [page, setPage] = useState(0);

  const [name, setName] = useState("");

  const [range, setRange] = useState([
    { startDate: new Date(), endDate: addDays(new Date(), 7) },
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleName = (e: any) => {
    if (e.target.value.includes("/")) { 
      alert("Invalid character '/' in name")
    } else {
      setName(e.target.value);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PNG or JPG file.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedFile(file);
    } else {
      alert("Please drop a valid PNG or JPG file.");
    }
  };

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { address: userAddress } = useAccount(); 

  
  const { data, write } = useContractWrite({
    address: settings.fuji.HyperclusterFactory.address as any,
    abi: settings.fuji.HyperclusterFactory.abi,
    functionName: 'createCampaign',
    // onError(error) {
    //   write2({
    //     args: [
    //       [name, "metadata", "0xbE9044946343fDBf311C96Fb77b2933E2AdA8B5D", "0xbE9044946343fDBf311C96Fb77b2933E2AdA8B5D",
    //       0, 0, 0, 0, 0, "0x3CA13391E9fb38a75330fb28f8cc2eB3D9ceceED"], 0
    //     ]
    //   })
    // }
  })

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  // string name;
  //       string metadata;
  //       address rewardTokenAddress;
  //       address rootReferral;
  //       uint256 rewardPercentPerMilestone;
  //       uint256 totalSupply;
  //       uint256 increaseRate;
  //       uint256 startIn;
  //       uint256 endIn;
  //       address dataFeedAddress;

  // rewardTokenAddress: "0xbE9044946343fDBf311C96Fb77b2933E2AdA8B5D",
  // rootReferral: "0xbE9044946343fDBf311C96Fb77b2933E2AdA8B5D",
  // rewardPercentPerMilestone: 10,
  // totalSupply: 1000000,
  // startIn: 10,
  // endIn: 100,
  // metadata: "YourMetadataString",

  const handleCreateCampaign = () => {
    write?.({
      args: [
        [name, "metadata", "0xbE9044946343fDBf311C96Fb77b2933E2AdA8B5D", "0xbE9044946343fDBf311C96Fb77b2933E2AdA8B5D",
        0, 0, 0, 0, 0, "0x3CA13391E9fb38a75330fb28f8cc2eB3D9ceceED"], 0
      ]
    })  
  }

  const unwatch = useContractEvent({
    address: settings.fuji.HyperclusterFactory.address as any,
    abi: settings.fuji.HyperclusterFactory.abi,
    eventName: 'CampaignCreated',
    listener(log) {
      console.log(log);
      setSafeAddress((log[0] as any).args?.campaign_address)
      setTxHash((log[0] as any).transactionHash)
      setPage(2);
      unwatch?.()  
    },
  })

  const [safeAddress, setSafeAddress] = useState("0xA0CC630Fe3d91e77769f69406c042CCe53f1acD0")
  const [txHash, setTxHash] = useState("");

  return (
    <div className="flex justify-start  h-screen">
      <Leftbar />
      <div className="flex-1">
        <Topbar />
        <div className="h-[93%]  pt-8 pl-16 pr-24 ">
          {page == 0 ? (
            <CampaignSetup
              selectedFile={selectedFile}
              handleClick={handleClick}
              preventDefault={preventDefault}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              setRange={setRange}
              handleName={handleName}
              name={name}
              handleNextPage={() => {
                setPage(1);
              }}
            />
          ) : page == 1 ? (
            <RewardingReferrals
              handleNextPage={() => {
                setPage(2);
              }}
              handleCreateCampaign={handleCreateCampaign}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          ) : (
            <DepositRewards
            safeAddress={safeAddress}
            name={name} />
          )}
        </div>
      </div>
    </div>
  );
}
