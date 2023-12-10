import { cardProps } from "@/pages/dashboard"
import { LongCard, Card } from "../Card"
import ReferralActivity from "./ReferralActivity"


export function Details({selectedCard} : {
  selectedCard: cardProps,
}) {

  return <div className="flex flex-col gap-4">
   
    <LongCard title={selectedCard.title} launchDate={selectedCard.launchDate} />
    <div className="flex flex-row justify-around gap-6">
      <Card title={"Milestones Reached"} text={"0"} />
      <Card title={"Rewards Distributed"} text={"6,000 / 10,000"} />
      <Card title={"Total Users Referred"} text={"9825"} />
      <Card title={"Total Bots Blocked"} text={"888"} />
    </div>
    <p className="text-[#FF5906]">Referral Activity</p>
    <ReferralActivity />
   
  </div>
}