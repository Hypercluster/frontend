import Leftbar from "@/components/Leftbar";
import React, { useState } from "react";
import { addDays } from "date-fns";
import CampaignSetup from "@/components/Create/CampaignSetup";
import Topbar from "@/components/Topbar";
import RewardingReferrals from "@/components/Create/RewardingReferrals";
import DepositRewards from "@/components/Create/DepositRewards";

export default function CreatePage() {
  const [page, setPage] = useState(0);

  const [range, setRange] = useState([
    { startDate: new Date(), endDate: addDays(new Date(), 7) },
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
              handleNextPage={() => {
                setPage(1);
              }}
            />
          ) : page == 1 ? (
            <RewardingReferrals
              handleNextPage={() => {
                setPage(2);
              }}
            />
          ) : (
            <DepositRewards safeAddress="0x71B43a66324C7b80468F1eE676E7FCDaF63eB6Ac" />
          )}
        </div>
      </div>
    </div>
  );
}
