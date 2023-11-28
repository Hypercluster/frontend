import { useEffect, useState } from "react";
import DepositDropdown from "../DepositDropdown";
import QRCode from "qrcode";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import DeployedModal from "../modals/DeployedModal";
export default function DepositRewards({
  safeAddress,
}: {
  safeAddress: string;
}) {
  const [option1, setOption1] = useState("Token");
  const [chain, setChain] = useState("Ethereum");
  const [tokenAddress, setTokenAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("Fixed Amount");
  const [qr, setQr] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    generate();
  }, []);

  const generate = () => {
    QRCode.toDataURL(`https://etherscan.io/address/${safeAddress}`).then(setQr);
  };
  const copyTextToClipboard = () => {
    const textToCopy = document.getElementById("copyText").innerText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {})
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1D203F] py-3 pl-5 rounded-t-xl text-2xl text-[#FF5906]">
        <p>Depoist Rewards</p>
      </div>
      <div className="flex-1 pt-8 pb-2 pl-8 bg-[#1D1F27]">
        <div className="flex justify-between space-x-24">
          <div className="flex flex-col flex-1">
            <p className="text-white text-lg mt-3">
              All tokens are securely stored in a safe
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
                options={["Ethereum", "Arbitrum", "Polygon"]}
                setOption={setChain}
                selectedOption={chain}
              />
            </div>
            <div className="mt-12">
              <p className="text-sm mb-1 text-[#C3C3C3]">Token Address</p>
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
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                DEPOSIT FUNDS
              </button>
              {isOpen && (
                <>
                  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
                  <div className="fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-[#FF5906] p-4 z-50 opacity-100 w-[25%] rounded-lg">
                    <DeployedModal close={() => setIsOpen(false)} />
                  </div>
                </>
              )}
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
