import { useEffect, useState } from "react";
import DepositDropdown from "../DepositDropdown";
import QRCode from "qrcode";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import DeployedModal from "../modals/DeployedModal";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, erc20ABI, useContractRead, useAccount } from "wagmi";
import { settings } from "@/config/config";


export default function DepositRewards({
  safeAddress,
  name,
}: {
  safeAddress: string;
  name: string;
}) {
  const [option1, setOption1] = useState("Token");
  const [chain, setChain] = useState("Ethereum");
  const [tokenAddress, setTokenAddress] = useState("0x779877A7B0D9E8603169DdbD7836e478b4624789");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("Fixed Amount");
  const [qr, setQr] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    generate();
  }, [safeAddress]);

  const generate = () => {
    QRCode.toDataURL(`https://sepolia.etherscan.io/address/${safeAddress}`).then(setQr);
  };


  const copyTextToClipboard = () => {
    const textToCopy = document.getElementById("copyText")?.innerText;

    navigator.clipboard
      .writeText(textToCopy || "")
      .then(() => {})
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };

  const { config: depositConfig } = usePrepareContractWrite({
    address: safeAddress as any,
    abi: [ 
      {"inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }],
    functionName: 'deposit',
    args: [10] // link token and datafeed on sepolia
  })

  const { data: depositData, write: depositWrite } = useContractWrite(depositConfig);

  const { isLoading: depositIsLoading, isSuccess: depositIsSuccess } = useWaitForTransaction({
    hash: depositData?.hash,
  })

  const handleFundCampaign = () => {
    depositWrite?.();
    setIsOpen(true);
    // make a call to our backends     
  }



  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1D203F] py-3 pl-5 rounded-t-xl text-2xl text-[#FF5906]">
        <p>Deposit Rewards</p>
      </div>
      <div className="flex-1 pt-8 pb-2 pl-8 bg-[#1D1F27]">
        <div className="flex justify-between space-x-24">
          <div className="flex flex-col flex-1">
            <p className="text-white text-lg mt-3">
              {name} has been succesfully deployed! Fund your campaign now to activate.
            </p>
            <div className="mt-12 ">
              <p className="text-sm mb-1 text-[#C3C3C3]">Reward</p>
              <DepositDropdown
                options={["Token", "Native", "Points"]}
                setOption={setOption1}
                selectedOption={option1}
              />
            </div>
            <div className="mt-12">
              <p className="text-sm mb-1 text-[#C3C3C3]">Chain</p>
              <DepositDropdown
                options={["Ethereum Mainnet", "Arbitrum", "Polygon", "Ethereum Sepolia"]}
                setOption={setChain}
                selectedOption={chain}
              />
            </div>
            <div className="mt-12">
              <p className="text-sm mb-1 text-[#C3C3C3]">Reward Token Address</p>
              <input
                type="text"
                className=" text-white text-sm bg-transparent focus:outline-none   border border-[#3C3C3C] rounded-md  w-full px-4 mt-2 py-2"
                value={tokenAddress}
                onChange={(e: any) => {
                  setTokenAddress(e.target.value);
                }}
              />
            </div>
            <div className="mt-12">
              <p className="text-sm mb-1 text-[#C3C3C3]">Type</p>
              <DepositDropdown
                options={["Fixed Amount", "Variable Amount"]}
                setOption={setType}
                selectedOption={type}
              />
            </div>
            <div className="mt-12">
              <p className="text-sm mb-1 text-[#C3C3C3]">Quantity</p>
              <input
                type="text"
                className=" text-white text-sm bg-transparent focus:outline-none   border border-[#3C3C3C] rounded-md  w-full px-4 mt-2 py-2"
                value={quantity}
                onChange={(e: any) => {
                  if (
                    typeof e.target.value === "string" &&
                    !isNaN(Number(e.target.value))
                  )
                    setQuantity(e.target.value);
                }}
              />
            </div>
            <div className="flex mt-16">

              <button
               className="bg-[#FF5906] font-semibold text-lg py-2 px-4 rounded-xl text-white"
               onClick={handleFundCampaign}
              > FUND CAMPAIGN </button> 
              
            
            </div>
          </div>
          <div className="flex flex-col flex-1 ">
            <p className="text-white text-lg mt-3">Deposit via QR</p>
            <Image
              src={qr}
              width={300}
              height={300}
              alt="qr"
              className="mt-16 my-12"
            />
            <p className="text-[#C3C3C3] text-sm">Safe Wallet Address</p>
            <div className="flex justify-between text-white text-sm bg-transparent focus:outline-none   border border-[#3C3C3C] rounded-md  w-[90%] px-4 mt-2 py-2 ">
              <p id="copyText">{safeAddress}</p>
              <button
                onClick={() => {
                  copyTextToClipboard();
                }}
              >
                <FontAwesomeIcon icon={faCopy} className="my-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
