import {
  faBell,
  faChevronLeft,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [isNotification, setIsNotification] = useState(true);
  return (
    <div className="h-screen ">
      <div className="bg-black border-b border-[#FF5906] h-[8%] ">
        <div className="flex justify-between items-center px-10 py-1">
          <div className="flex justify-between mt-1">
            <Link href={"/"} className="my-auto mr-2">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-xl  text-[#FF5906]"
              />
            </Link>
            <Image
              src={"/logo.png"}
              width={200}
              height={200}
              alt="logo"
              className="mb-2"
            />
          </div>
          <div className="flex space-x-16 mr-20 items-center">
            <ConnectButton />
            <Link href={"/"} className="relative">
              {isNotification && (
                <div className="absolute bg-purple-600 rounded-full h-[8px] w-[7px] left-[20px] top-[-4px]"></div>
              )}
              <FontAwesomeIcon
                icon={faBell}
                className="text-lg text-gray-500"
              />
            </Link>
            <Link href={"/"}>
              <FontAwesomeIcon
                icon={faUser}
                className="text-lg text-gray-500"
              />
            </Link>
           
            <Link href={"/"}>
              <FontAwesomeIcon
                icon={faWallet}
                className="text-lg text-gray-500"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[92%]">{children}</div>
    </div>
  );
}
