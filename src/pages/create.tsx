import Leftbar from "@/components/Leftbar";
import React, { useState } from "react";
import { addDays } from "date-fns";
import CampaignSetup from "@/components/Create/CampaignSetup";
import Topbar from "@/components/Topbar";
import RewardingReferrals from "@/components/Create/RewardingReferrals";
import DepositRewards from "@/components/Create/DepositRewards";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractEvent } from "wagmi";


export default function CreatePage() {
  const [page, setPage] = useState(2);

  const [name, setName] = useState("");

  const [range, setRange] = useState([
    { startDate: new Date(), endDate: addDays(new Date(), 7) },
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.includes("/")) { 
      alert("Invalid character '/' in name")
    } else {
      setName(e.target.value);
    }
    console.log(name);
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

  
  const { config } = usePrepareContractWrite({
    address: "0x395E95fF2AB6c714Ab52A95274816e6648ed91C7", 
    abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "reward_token",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_datafeed",
            "type": "address"
          }
        ],
        "name": "createCampaign",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
    ],
    functionName: 'createCampaign',
    args: [name, "0x779877A7B0D9E8603169DdbD7836e478b4624789", "0x42585eD362B3f1BCa95c640FdFf35Ef899212734"] // link token and datafeed on sepolia
  })

  const { data, write } = useContractWrite(config)
   
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const handleCreateCampaign = () => {
    write?.();
    // make a call to our backends     
  }

  const unwatch = useContractEvent({
    address: '0x395E95fF2AB6c714Ab52A95274816e6648ed91C7',
    abi: [{
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "campaign_address",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        }
      ],
      "name": "CampaignCreated",
      "type": "event"
    },],
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
