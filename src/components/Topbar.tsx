import { faBell, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Topbar() {
  const [isNotification, setIsNotification] = useState(true);

  return (
    <div className="h-[7%] pl-16 pr-24 flex space-x-10 py-3 bg-[#0F1122] justify-end ">
      <ConnectButton />
      <Link
        href={"/"}
        className="relative bg-[#171A33] rounded-full px-3  py-2"
      >  
        {isNotification && (
          <div className="absolute bg-purple-600 rounded-full h-[8px] w-[7px] left-[32px] top-[4px]"></div>
        )}
        <FontAwesomeIcon icon={faBell} className="text-md text-gray-500" />
      </Link>
      <Link href={"/"} className="bg-[#171A33] rounded-full px-3  py-2">
        <FontAwesomeIcon icon={faUser} className="text-md text-gray-500" />
      </Link>
      <Link href={"/"} className="bg-[#171A33] rounded-full px-3  py-2">
        <FontAwesomeIcon icon={faWallet} className="text-md text-gray-500" />
      </Link>
    </div>
  );
}
