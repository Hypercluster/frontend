import { settings } from "@/config/config";
import { useState } from "react";

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

  return <div className="bg-black flex-1">
  
    <div className="bg-[#0F1122] pt-6 rounded-md border">
   
      <table className="table table-fixed w-full text-center "> 
        <thead>
          <tr className="pl-2 text-white text-l text-align-left">
            <th> Address </th>
            <th> Referrals </th>
            <th> Bot Verification </th>
            <th> Tier </th>
            <th> Activity </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody className="text-white text-sm">
            {realReferrals.map(r => {
              return <tr className="border-white h-4">
                <td className="truncate"> {r.address} </td>
                <td> {r.referrals}/2 </td>
                <td> {r.verified} </td>
                <td> {r.tier} </td>
                <td> {r.activity} </td>
                <td> <button className="border-[#FF5906] bg-inherit text-[#FF5906]"> View </button> </td>
              </tr>
            })}

            {settings.mockReferrals.map(g => {
              return <tr className="border px-2 h-16">
               <td className="truncate"> {g.address} </td>
                <td> {g.referrals}/2 </td>
                <td> {g.verified} </td>
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