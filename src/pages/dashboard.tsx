import { Card, LongCard } from "@/components/Card";
import { Details } from "@/components/Dashboard/Details";
import ReferralActivity from "@/components/Dashboard/ReferralActivity";
import Leftbar from "@/components/Leftbar";
import Topbar from "@/components/Topbar";
import { settings } from "@/config/config";
import { useState } from "react";
import { useAccount, useContractRead, useContractReads, useNetwork } from "wagmi";
import { MyCampaigns } from "@/components/Dashboard/MyCampaigns";


export interface cardProps {
  title: string, 
  launchDate: string,
}


export default function DashboardPage() {


  const [page, setPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState<null | cardProps>(null);

  const [realCampaigns, setRealCampaigns] = useState<any[]>([])




  
  return (
    <div className="flex justify-start h-screen">
      <Leftbar />
        <div className="flex-1">
          <Topbar />
          <div className="h-[100%] bg-black p-12">
            {(selectedCard == null) ? 
              <div className="flex flex-col h-full">
                <div className="text-2xl text-[#FF5906]">
                  <p>My Campaigns</p>
                  <MyCampaigns />
                
                  {settings.mockCampaigns.map(x => {
                    return <LongCard key={x.title} title={x.title} launchDate={x.launchDate} onClick={() => setSelectedCard(x)}/>
                  })}
                </div>
              </div>
              :
              <div className="h-[100%]">
                <button className="text-white" onClick={() => setSelectedCard(null)}> {"< BACK"}</button> 
                <Details selectedCard={selectedCard} />
              </div>        
            }
          </div>
        </div>
      </div>
  );
}
