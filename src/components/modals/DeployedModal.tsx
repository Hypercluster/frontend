import { settings } from "@/config/config";
import Link from "next/link";

export default function DeployedModal({ close, refCode }: { close: () => void, refCode: string }) {

  return (
    <>
      <p className="text-black font-bold text-xl text-center tracking-tighter mt-4">
        CAMPAIGN IS ACTIVE!
      </p>
      <p className="text-black font-bold text-xl text-center tracking-tighter mt-8 mb-1">
        LIGHT THE FUSE
      </p>
      <div className="flex justify-center">
        <button
          className=" py-1 px-12 rounded-xl text-[#DEDEDE] text-xl text-center tracking-tighter mb-4 hover:color-[#b8b8b8] truncate"
          onClick={async () => await navigator.clipboard.writeText(`http://localhost:3000/campaign/magic/?ref=${refCode}`)}
        >
          {refCode}
        </button>
      </div>
    </>
  );
}

