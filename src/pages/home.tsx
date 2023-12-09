import Leftbar from "@/components/Leftbar";
import { faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex justify-start  h-screen">
      <Leftbar />
      <div className="mx-16 mt-3 flex-1">
        <div className=" flex justify-end ">
          <Link href={"/"} className="bg-[#171A33] rounded-full px-3  py-2">
            <FontAwesomeIcon
              icon={faWallet}
              className="text-lg text-gray-500"
            />
          </Link>
        </div>
        <div className="pl-12 items-center bg-[#FF5906] rounded-xl relative flex justify-between mt-6 mr-8">
          <div>
            <p className="font-semibold text-white text-4xl">
              HYPERCHARGE SUSTAINABLE GROWTH
            </p>
            <p className="font-semibold text-white text-lg mr-12 tracking-wider mt-6">
              Hypercluster is a Web3-native referral system that enables
              protocols to airdrop rewards under specific conditions,
              incentivizing user behavior and eliminating bots.
            </p>
          </div>
          <Image
            src={"/blackLogo.png"}
            width={590}
            height={590}
            alt="blackLogo"
          />
        </div>
        <div className="ml-4">
          <p className="text-2xl text-white mt-16 ">How it works</p>
          <div className="flex justify-between text-lg">
            <ul className="list-disc text-[#C3C3C3] ml-8 mt-5 w-[45%]">
              <li>Create your campaign, select V1 or V2</li>
              <li>
                Setup triggers for when tokens are rewarded to the network
              </li>
              <li>
                Deposit your reward tokens (ERC20) in a smart account and deploy
              </li>
              <li>Share the first reward link with your first user</li>
            </ul>
            <ul className="list-disc text-[#C3C3C3] mr-8 mt-5 w-[40%]">
              <li>
                Every trigger will trickle a set amount of tokens into the the
                cluster and users can claim anytime.
              </li>
              <li>
                If there aren’t enough reward tokens, the campaign will end
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 ml-4 mr-8"></div>
        <div className="flex justify-between ">
          <div className="flex flex-[2_2_0%] flex-col justify-center items-center text-white text-lg">
            <FontAwesomeIcon
              icon={faUser}
              className="mx-auto text-[#FF5906] text-3xl"
            />
          </div>
          <div className="flex flex-[2_2_0%] flex-col justify-center items-center text-white text-lg">
            <div className="grid grid-cols-2 gap-3">
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
            </div>
          </div>
          <div className="flex flex-[3_3_0%] flex-col justify-center items-center text-white text-lg">
            <div className="grid grid-cols-2 gap-3">
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
            </div>
          </div>
          <div className="flex flex-[4_4_0%] flex-col justify-center items-center">
            <div className="grid grid-cols-4 gap-3">
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />{" "}
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
              <FontAwesomeIcon
                icon={faUser}
                className="mx-auto text-[#FF5906] text-3xl"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between ">
          <div className="flex flex-[2_2_0%] flex-col justify-center items-center text-white text-lg">
            <p className="mt-4">Tier A</p>
            <p className="mt-2">10x</p>
          </div>
          <div className="flex flex-[2_2_0%] flex-col justify-center items-center text-white text-lg">
            <p className="mt-4">Tier B</p>
            <p className="mt-2">9x</p>
          </div>
          <div className="flex flex-[3_3_0%] flex-col justify-center items-center text-white text-lg">
            <p className="mt-4">Tier C</p>
            <p className="mt-2">8x</p>
          </div>
          <div className="flex flex-[4_4_0%] flex-col justify-center items-center text-white text-lg">
            <p className="mt-4">Tier D</p>
            <p className="mt-2">7x</p>
          </div>
        </div>
     
        <p className="mt-8 ml-4 text-white text-2xl">Get Started</p>
        <div className="flex justify-between mx-4 space-x-8 mt-5">
          <Link
            href={"/create"}
            className="flex-1 bg-[#FF5906] rounded-xl  p-5"
          >
            <p className="text-black text-3xl ml-8 font-bold">V1</p>
            <p className="text-black text-2xl font-semibold text-center">
              Smart Airdrop
            </p>
          </Link>
          <div className="flex-1 bg-[#FF5906] opacity-70 rounded-xl p-5">
            <p className="text-black text-3xl ml-8 font-bold">V2</p>
            <p className="text-black text-2xl font-semibold text-center">
              Transaction Based
            </p>
            <p className="text-black text-md font-semibold text-center">
              Coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
