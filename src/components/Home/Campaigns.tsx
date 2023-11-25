import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Campaigns() {
  const [hoverState, setHoverState] = useState(0);
  return (
    <div>
      <p className=" text-2xl tracking-tight text-center mt-5 mb-12 text-[#C9BFD8]">
        SELECT FROM ACTIVE CAMPAIGNS
      </p>
      <div className="flex justify-evenly mx-auto">
        <Link href={"/campaign/apecoin"}>
          <Image
            src={"/campaigns/apecoin.png"}
            width={150}
            height={150}
            alt="logo"
            className={`rounded-full transition ease-in-out delay-50 hover:border-[5px] border-[#FF5906] hover:-translate-y-0.5 hover:scale-105 ${
              hoverState != 1 && hoverState != 0 && `opacity-50`
            }`}
            onMouseOver={() => setHoverState(1)}
            onMouseOut={() => setHoverState(0)}
          />
        </Link>
        <Link href={"/campaign/magic"}>
          <Image
            src={"/campaigns/magic.png"}
            width={150}
            height={150}
            alt="logo"
            className={`rounded-full transition ease-in-out delay-50 hover:border-[5px] border-[#FF5906] hover:-translate-y-0.5 hover:scale-105 ${
              hoverState != 2 && hoverState != 0 && `opacity-50`
            }`}
            onMouseOver={() => setHoverState(2)}
            onMouseOut={() => setHoverState(0)}
          />
        </Link>
        <Link href={"/campaign/arbitrum"}>
          <Image
            src={"/campaigns/arbitrum.png"}
            width={150}
            height={150}
            alt="logo"
            className={`rounded-full transition ease-in-out delay-50 hover:border-[5px] border-[#FF5906] hover:-translate-y-0.5 hover:scale-105 ${
              hoverState != 3 && hoverState != 0 && `opacity-50`
            }`}
            onMouseOver={() => setHoverState(3)}
            onMouseOut={() => setHoverState(0)}
          />
        </Link>
        <Link href={"/campaign/avax"}>
          <Image
            src={"/campaigns/avax.png"}
            width={150}
            height={150}
            alt="logo"
            className={`rounded-full transition ease-in-out delay-50 hover:border-[5px] border-[#FF5906] hover:-translate-y-0.5 hover:scale-105 ${
              hoverState != 4 && hoverState != 0 && `opacity-50`
            }`}
            onMouseOver={() => setHoverState(4)}
            onMouseOut={() => setHoverState(0)}
          />
        </Link>
      </div>
    </div>
  );
}
