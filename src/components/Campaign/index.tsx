import { useState } from "react";
import Footer from "./Footer";
import Info from "./Info";
import Rules from "./Rules";
import Status from "./Status";
import Modal from "../modals/Modal";

export default function Campaign() {
  const [select, setSelect] = useState<
    | "none"
    | "botFail"
    | "claim"
    | "friendsNo"
    | "notReferred"
    | "refer"
    | "referred"
    | "success"
    | "walletNot"
  >("none");
  const [params, setParams] = useState<string[]>([
    "https://hypercluster.io/4xd8",
    "APECOIN REFERRAL NETWORK",
  ]);

  return (
    <div className="h-full flex justify-between ">
      <div className=" flex-1 ">
        <Info />
        <Status />
      </div>
      <div className="w-[1px] h-[100%] bg-[#FF5906]"></div>
      <div className="flex-1">
        <Rules />
        <Footer />
      </div>
      <Modal select={select} params={params} close={() => setSelect("none")} />
    </div>
  );
}
