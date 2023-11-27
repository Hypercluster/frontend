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
      <div className="h-[100%] flex ">{children}</div>
    </div>
  );
}
