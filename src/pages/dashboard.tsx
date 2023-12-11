import { Card, LongCard } from "@/components/Card";
import { Details } from "@/components/Dashboard/Details";
import ReferralActivity from "@/components/Dashboard/ReferralActivity";
import Leftbar from "@/components/Leftbar";
import Topbar from "@/components/Topbar";
import { settings } from "@/config/config";
import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";


export interface cardProps {
  title: string, 
  launchDate: string,
}

export default function DashboardPage() {

  const { address } = useAccount(); 
  const [page, setPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState<null | cardProps>(null);

  const [realCampaigns, setRealCampaigns] = useState<any[]>([])

  const { data, isError, isLoading } = useContractRead({
    address: settings.fuji.HyperclusterFactory.address as any,
    abi: settings.fuji.HyperclusterFactory.abi,
    functionName: 'getMyCampaigns',
  })
  
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
                  {realCampaigns.map(h => {
                    return <LongCard key={h.title} title={h.title} launchDate={h.launchDate} onClick={() => setSelectedCard(h)} />
                  })}
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
