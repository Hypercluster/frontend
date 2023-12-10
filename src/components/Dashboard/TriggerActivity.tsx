import { settings } from "@/config/config";
import { useState } from "react";
import { Tag } from "../Tag";

export default function TriggerActivity() {

  interface ITrigger {
    cah: string;
    condition: string;
    reward: number;
    activity: string;
    hash: string;
  }

  const [realTriggers, setRealTriggers] = useState<ITrigger[]>([]);

  // read from contract 
  return <div className="bg-black flex-1 py-4">
    <p className="text-[#FF5906] mb-3">Trigger Activity</p>
    <div className="bg-[#0F1122] pt-6 rounded-md border border-gray-600">
   
      <table className="table table-fixed w-full text-center "> 
        <thead>
          <tr className="pl-2 text-white text-l text-align-left">
            <th> Chainlink Automation Hash </th>
            <th> Condition </th>
            <th> Reward </th>
            <th> Activity </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody className="text-white text-sm">
            {realTriggers.map(r => {
              return <tr className="border border-b-1 border-gray-600 h-4">
                <td className="truncate pl-8"> {r.cah} </td>
                <td> <code className="text-green"> {r.condition} </code> </td>
                <td className="pl-10"> <Tag>{r.reward} $TOKENS </Tag> </td>
                <td> {r.activity} </td>
                <td> <button className="border-[#FF5906] bg-inherit text-[#FF5906]"> View </button> </td>
              </tr>
            })}

            {settings.mockTriggers.map(g => {
              return <tr className="border border-b-1 border-gray-600 px-2 h-16">
               <td className="truncate pl-8"> {g.cah} </td>
                <td> <p className="text-[#AAFA9D]">{g.condition} </p></td>
                <td className="pl-10"> <Tag> {g.reward} $TOKENS </Tag></td>
                <td> {g.activity} </td>
               <td> <button className="border-[#FF5906] bg-inherit text-[#FF5906]"> View </button> </td>
             </tr>
            })}
        </tbody>
      </table>
    </div>
  </div>;
}