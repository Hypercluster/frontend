import Campaigns from "./Campaigns";
import Hero from "./Hero";
import Options from "./Options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function Home() {
  return (
    <div className="py-10 min-h-screen max-w-[1400px] mx-auto flex flex-col justify-between">
      <div>
        <p className="text-[#C9BFD8] text-xl text-end">
          THE WEB3 NATIVE INFINITE REFERRAL NETWORK
        </p>
        <Hero />
        <Campaigns />
      </div>
      <Link href={"/home"} className="flex mt-10">
        <FontAwesomeIcon
          icon={faCircleInfo}
          className=" text-gray-500 text-sm my-auto mr-2 bg-white rounded-full"
        />
        <p className="text-l text-[#F1F1F1]">
          Host your own referral campaign
        </p>
      </Link>
    </div>
  );
}
