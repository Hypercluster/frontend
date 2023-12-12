import { useState } from "react";
import Dropdown from "../Dropdown";
import Image from "next/image";
import { erc20ABI, useAccount, useContractEvent, useContractWrite } from "wagmi";
import Input from "../Input";
import { settings } from "@/config/config";
import DeployedModal from "../modals/DeployedModal";

export default function RewardingReferrals({
  handleNextPage,
  name,
}: {
  handleNextPage: () => void;
  name: string;
}) {
  const [option1, setOption1] = useState("Price");
  const [option2, setOption2] = useState("Increases");
  const [option3, setOption3] = useState("10");
  const [option4, setOption4] = useState("0");
  const [maxTokens, setMaxTokens] = useState("0");

  const { address } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [genCode, setGenCode] = useState("")


  const change3 = (e: any) => {
    if (e.target.value.length > 3) return;
    if (typeof e.target.value === "string" && !isNaN(Number(e.target.value))) {
      if (Number(e.target.value) > 100) return;
      setOption3(e.target.value);
    }
  };

  const change4 = (e: any) => {
    if (typeof e.target.value === "string" && !isNaN(Number(e.target.value))) {
      setOption4(e.target.value);
    }
  };

  const { data: dataApprove, isSuccess: dataSuccess, write } = useContractWrite({
    address: settings.fuji.CCIPBNM as any, // tokenAddress as any,
    abi: erc20ABI,
    functionName: "approve",
  });

  const handleApprove = () => {
    write({
      args: [
        settings.fuji.HyperclusterFactory.address as any,
        BigInt("1000000000000000000"),
      ],
    });
  };

  const unwatch = useContractEvent({
    address: settings.fuji.HyperclusterFactory.address as any,
    abi: settings.fuji.HyperclusterFactory.abi,
    eventName: 'CampaignCreated',
    listener(log) {
      console.log(log);
      handleSuccess((log[0] as any).campaign_address);
     

      setGenCode((log[0] as any).args?.campaign_address)
      unwatch?.()  
    },
  })

  const handleSuccess = async (campaign_id: string) => {
    console.log(campaign_id);
    // const res = await fetch(settings.endpoint + "/api/generate", {
    //   method: "POST",
    //   headers: {
    //     api_key: "8Tbinn8rPEMu1xKpyuukaAGLqOfmRWaL",
    //   },
    //   body: JSON.stringify({
    //     referrer_address: address,
    //     campaign_id: campaign_id,
    //   }),
    // });

    // setGenCode(await res.text());
    setIsOpen(true)  

;  }

  const { data: dataCreate, isLoading: createIsLoading, isSuccess: createSuccess, write: writeCreate } = useContractWrite({
    address: settings.fuji.HyperclusterFactory.address as any,
    abi: settings.fuji.HyperclusterFactory.abi,
    functionName: "createCampaign",
  });


  const handleWrite = () => {

    writeCreate({
      args: [
        [name,
        "This is a campaign to reward users for referring each other",
        "0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4",
        address,
        "10",
        "1000000000000000000",
        "10",
        "0",
        "100000000",
        "0x5498BB86BC934c8D34FDA08E81D444153d0D06aD"]
      ],
    });
  };

  const Chow = () => {
    handleSuccess("0x5498BB86BC934c8D34FDA08E81D444153d0D06aD")

  }

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // })

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1D203F] py-3 pl-5 rounded-t-xl text-2xl text-[#FF5906]">
        <p>Rewarding Referrals</p>
      </div>
      <div className="flex-1 pt-8 pb-2 pl-8 bg-[#1D1F27]">
        <p className="text-white text-lg mt-3">
          All tokens are securely stored in a safe
        </p>
        <div className="my-16 flex justify-around gap-2 text-lg text-white mr-8 items-center">
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
            <Input value={option3} onChange={change3} type="number" />

            <p className="my-auto">%</p>
          </div>
          <p>,Reward </p>

          <div className="text-white text-sm max-w-40 border border-[#9E9E9E] rounded-md focus:outline-none flex justify-between px-2">
            <Input value={option4} onChange={change4} type="number" />
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
              <p>
                {Number(maxTokens) *
                  Math.floor(
                    Math.random() *
                      0.3 *
                      (Number(option4) - Number(option3) + 1) +
                      Number(option3)
                  )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between ml-4 mt-12 mr-16 ">
          <div>
            <p className="text-white my-4">Referral Rewards Distribution</p>
            <Image
              src={"/earnings.png"}
              width={800}
              height={800}
              alt="earnings"
            />
          </div>
          <div className="ml-8">
            <p className="text-2xl text-white ">Rules</p>
            <ul className="list-disc text-[#C3C3C3] ml-8 mt-5 text-lg">
              <li>X is 0.1% of total rewarded tokens per release.</li>
              <li>
                When there isn't enough tokens to reward users, the campaign
                will end.
              </li>
              <li> Token claiming is first come first serve</li>
              <li>Unclaimed tokens stay locked until next trigger.</li>
              <li>
                Hypercluster’s anti-bot allow each ‘entity’ to register only
                once.
              </li>
              <li>
                If tokens are unused, the customer can send a request for tokens
                to be returned.
              </li>
              <li>Protocol Fee: 2.5% of all claimed rewards</li>
            </ul>
            
          </div>
          <div className="relative ml-auto">
          {dataSuccess ? 
          <button
            onClick={handleWrite}
            disabled={!address}
            className="absolute bg-[#FF5906] text-white rounded-lg py-2 px-16  text-xl right-14 bottom-[1px]"
          >
            {createIsLoading ? "Deploying" : "Deploy" }
          </button>
          :
          <button
            onClick={handleApprove}
            disabled={!address}
            className="absolute bg-[#FF5906] text-white rounded-lg py-2 px-16  text-xl right-64 bottom-[1px]"
          >
            Approve
          </button>
          }
          <button onClick={Chow}>{"->"}</button>
          </div>
            {isOpen && (
                <>
                  <div onClick={()=> setIsOpen(false)} className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
                  <div className="fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-[#FF5906] p-4 z-50 opacity-100 w-[25%] rounded-lg">
                    <DeployedModal close={() => setIsOpen(false)} refCode={"401c35625d67701f9b572fe8c8313d71b3618170a7f1b6c76de0b13d3e671979e7e687e142d057e258a5cc8a71293d21c6b9b2ca5ea52fff0b221c6933693805c5f1cd9bc457b9b3db59f8773c9a6ef1202193fc372b31aa32666eda3ea50aec"} />
                  </div>
                </>
              )}
        </div>
      </div>
     
    </div>
  );
}
