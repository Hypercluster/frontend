import { settings } from "@/config/config";
import Link from "next/link";

export default function DeployedModal({ close }: { close: () => void }) {

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
          className=" py-1 px-12  rounded-xl text-[#DEDEDE]  text-xl text-center tracking-tighter mb-4 hover:color-"
          onClick={async () => await navigator.clipboard.writeText(`${settings.endpoint}/campaign/magic/?ref=401c35625d67701f9b572fe8c8313d71b3618170a7f1b6c76de0b13d3e671979e7e687e142d057e258a5cc8a71293d21c6b9b2ca5ea52fff0b221c6933693805c5f1cd9bc457b9b3db59f8773c9a6ef1202193fc372b31aa32666eda3ea50aec`)}
        >
          YOUR REFERRAL LINK IS HERE
        </button>
      </div>
    </>
  );
}

