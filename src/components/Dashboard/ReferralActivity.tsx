import { settings } from "@/config/config";
import { useState } from "react";
import { Tag } from "../Tag";

export default function ReferralActivity() {

  interface IReferral {
    address: string;
    referrals: number;
    verified: boolean;
    tier: string;
    hash: string;
    activity: string;
 
  }

  const [realReferrals, setRealReferrals] = useState<IReferral[]>([]);

  // read from contract 

  return <div className="bg-black flex-1 py-4">

    <p className="text-[#FF5906] mb-3">Referral Activity</p>
  
    <div className="bg-[#0F1122] pt-6 rounded-md border border-gray-600">
   
      <table className="table table-fixed w-full text-center "> 
        <thead>
          <tr className="pl-2 text-white text-l text-align-left border-b-1 border-gray-600">
            <th> Address </th>
            <th> Referrals </th>
            <th> Bot Verification </th>
            <th> Tier </th>
            <th> Activity </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody className="text-white text-sm ">
            {realReferrals.map(r => {
              return <tr className="border-[#2C2C2C] h-4 border border-b-1 border-gray-600">
                <td className="truncate pl-8"> {r.address} </td>
                <td> {r.referrals}/2 </td>
                <td className="pl-10"> <Tag> {r.verified == true ? "Verified" : ""} </Tag> </td>
                <td> {r.tier} </td>
                <td> {r.activity} </td>
                <td> <button className="border-[#FF5906] bg-inherit text-[#FF5906]"> View </button> </td>
              </tr>
            })}

            {settings.mockReferrals.map(g => {
              return <tr className="px-2 h-16 border border-b-1 border-gray-600">
               <td className="truncate pl-8"> {g.address} </td>
                <td> {g.referrals}/2 </td>
                <td className="pl-10"> <Tag> {g.verified == true ? "Verified" : ""} </Tag> </td>
                <td> {g.tier} </td>
                <td> {g.activity} </td>
               <td> <button className="border-[#FF5906] bg-inherit text-[#FF5906]"> View </button> </td>
             </tr>
            })}
        </tbody>
      </table>
    </div>
  </div>;
}