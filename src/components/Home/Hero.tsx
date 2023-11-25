import Image from "next/image";
import { useEffect, useState } from "react";
import Options from "./Options";

export default function Hero() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    console.log("window", window.innerWidth, window.innerHeight);
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);
  return (
    <div
      style={{
        position: "relative",
        top: "32%",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
      className="w-[100%] flex justify-center"
    >
      <div className="relative h-full">
        <Image
          src={"/logo.png"}
          width={(size.width * 70) / 100}
          height={(size.height * 15) / 100}
          alt="logo"
        />
        <p className="text-end text-[#C9BFD8] text-2xl absolute bottom-40 right-20">
          BY RPS LABS
        </p>
        <Options />
      </div>
    </div>
  );
}
