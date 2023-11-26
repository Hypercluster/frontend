import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BusinessNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNotification, setIsNotification] = useState(true);
  return (
    <div className="h-screen">
      <div className="absolute right-0 h-[8%]">
        <div className="h-full flex justify-between items-center">
          <Link href={"/"} className="bg-[#171A33] rounded-full p-3 mr-8">
            <FontAwesomeIcon
              icon={faWallet}
              className="text-lg text-gray-500"
            />
          </Link>
        </div>
      </div>

      <div className="h-[100%]">{children}</div>
    </div>
  );
}
