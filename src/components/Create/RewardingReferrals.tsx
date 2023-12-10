import { useState } from "react";
import Dropdown from "../Dropdown";
import Image from "next/image";
import { useAccount } from "wagmi";
import Input from "../Input";

export default function RewardingReferrals({
  handleNextPage,
  handleCreateCampaign,
  isLoading,
  isSuccess
}: {
  handleNextPage: () => void;
  handleCreateCampaign: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}) {
  const [option1, setOption1] = useState("Price");
  const [option2, setOption2] = useState("Increases");
  const [option3, setOption3] = useState("10");
  const [option4, setOption4] = useState("0");
  const [maxTokens, setMaxTokens] = useState("0");
  const { address } = useAccount();

  const change3 = (e: any) => {
    if (e.target.value.length > 3) return;
    if (
      typeof e.target.value === "string" &&
      !isNaN(Number(e.target.value))
    ) {
      if (Number(e.target.value) > 100) return;
      setOption3(e.target.value);
    }

  }

  const change4 = (e: any) => {

    if (
      typeof e.target.value === "string" &&
      !isNaN(Number(e.target.value))
    ) {
      setOption4(e.target.value);
    }
  }

 
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1D203F] py-3 pl-5 rounded-t-xl text-2xl text-[#FF5906]">
        <p>Rewarding Referrals</p>
      </div>
      <div className="flex-1 pt-8 pb-2 pl-8 bg-[#1D1F27]">
        <p className="text-white text-lg mt-3">
          All tokens are securely stored in a safe
        </p>
        <div className="my-16 flex justify-around text-lg text-white mr-8 items-center">
          <p>As</p>
          <Dropdown
            options={["Price", "Volume", "TVL"]}
            setOption={setOption1}
            selectedOption={option1}
          />
          <Dropdown
            options={["Increases", "Decreases"]}
            setOption={setOption2}
            selectedOption={option2}
          />
          <p>By</p>
          <div className="text-white text-sm max-w-40 border border-[#9E9E9E] rounded-md focus:outline-none flex justify-between px-2">
            <Input value={option3} onChange={change3} type='number'/>

            <p className="my-auto">%</p>
          </div>
          <p>,Reward </p>
    
          <div className="text-white text-sm max-w-40 border border-[#9E9E9E] rounded-md focus:outline-none flex justify-between px-2">
          <Input value={option4} onChange={change4} type='number'/>
          </div>
          <p>Tokens.</p>
        </div>
        <div className="flex justify-around max-w-full ml-4 ">
          <div className="flex flex-col flex-1 mr-8">
            <p className="text-[#C3C3C3]">Up to a Max Token Amount of:</p>
            <input
              type="text"
              className=" text-white text-sm bg-transparent focus:outline-none  h-full border border-[#3C3C3C] rounded-md  w-full px-4 mt-2 py-2"
              value={maxTokens}
              onChange={(e: any) => {
                if (
                  typeof e.target.value === "string" &&
                  !isNaN(Number(e.target.value))
                ) {
                  setMaxTokens(e.target.value);
                }
              }}
            />
          </div>
          <div className="flex flex-col flex-1 mr-8">
            <p className="text-[#C3C3C3]">Estimated Reach (referrals):</p>
            <div className=" text-white flex items-center text-sm bg-transparent focus:outline-none  h-full border border-[#3C3C3C] rounded-md  w-full px-4 mt-2 py-2">
              <p>{Number(maxTokens) * Math.floor(Math.random() * 0.3 * (Number(option4) - Number(option3) + 1) + Number(option3))}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between ml-4 mt-12 mr-16 ">
          <div>
            <Image
              src={"/earnings.png"}
              width={800}
              height={800}
              alt="earnings"
            />
            <p className="text-white text-center mt-2">
              Example of 10,000 tokens
            </p>
          </div>
          <div className="ml-8">
            <p className="text-2xl text-white ">Rules</p>
            <ul className="list-disc text-[#C3C3C3] ml-8 mt-5 text-lg">
              <li>
                Tier A only has 1 User and is awarded with 1X upon trigger
              </li>
              <li>X is 1% of total rewarded tokens by default</li>
              <li>
                When there isn’t enough tokens to reward users, the campaign
                will end.
              </li>
              <li>
                Hypercluster’s anti-bot allow only each ‘entity’ to register
                once.
              </li>
              <li>
                If tokens are unused, the customer can send a request for tokens
                to be returned.
              </li>
              <li>Protocol Fee: 5% of all claimed rewards</li>
            </ul>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={handleCreateCampaign}
            disabled={!address}
            className="absolute bg-[#FF5906] text-white rounded-lg py-2 px-16  text-xl right-14 bottom-[1px]"
          >
            { isLoading ? "Deploying..." : "Deploy" }
          </button>
        </div>
      </div>
    </div>
  );
}
