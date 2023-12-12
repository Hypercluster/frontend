import { settings } from "@/config/config";
import { useState } from "react";
import { useAccount, useContractRead, useNetwork } from "wagmi";

export function MyCampaigns() {

  const { address } = useAccount(); 
  const { chain } = useNetwork();


  const { data: campaign_addresses }= useContractRead({
    address: settings.sepolia.HyperclusterFactory.address as any,
    abi: settings.sepolia.HyperclusterFactory.abi,
    functionName: 'getMyCampaigns',
  })


  const locs = (campaign_addresses ? campaign_addresses as [] : []).map(x => {
    return {
      address: x,
      abi: settings.fuji.HyperclusterImplementation.abi,
      function: 'name'
    }
  })


  // const { data: campaigns } = useContractReads({
  //   contracts: locs
  // })

  return (<div>
    {locs.map(h => {
      return <div> {h.address} </div>
    })}
    </div>
    // return <LongCard key={h.title} title={h.title} launchDate={h.launchDate} onClick={() => setSelectedCard(h)} />
  )
}

  // {realCampaigns.map(h => {
  //   return <LongCard key={h.title} title={h.title} launchDate={h.launchDate} onClick={() => setSelectedCard(h)} />
  // })}
