import {
  faChartLine,
  faCircleInfo,
  faHome,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Leftbar() {
  const router = useRouter();

  const pathname = router.pathname;

  return (
    <div className="flex flex-col justify-between  w-[15%] bg-[#0F1122] h-full">
      <div className="w-full">
        <div className=" flex justify-center w-full   py-1 bg-black">
          <Image
            src={"/logo.png"}
            width={200}
            height={200}
            alt="logo"
            className="mb-2"
          />
        </div>
        <Link
          href={"/home"}
          className={`text-white flex justify-between py-3 pl-6  mt-4 ${
            pathname == "/home" && " border-r-4 bg-[#1E2344] border-white"
          }  `}
        >
          <div className="flex">
            <FontAwesomeIcon icon={faHome} className="my-auto" />
            <p className="ml-4 text-lg">Home</p>
          </div>
        </Link>
        <Link
          href={"/dashboard"}
          className={`text-white flex justify-between py-3 pl-6 mt-2  ${
            pathname == "/dashboard" && "bg-[#1E2344]  border-r-4 border-white"
          }  `}
        >
          <div className="flex">
            <FontAwesomeIcon icon={faChartLine} className="my-auto" />
            <p className="ml-4 text-lg">Dashboard</p>
          </div>
        </Link>
        <Link
          href={"/create"}
          className={`text-white flex justify-between py-3 pl-6 mt-2  ${
            pathname == "/create" && "bg-[#1E2344]  border-r-4 border-white"
          }  `}
        >
          <div className="flex">
            <FontAwesomeIcon icon={faRectangleList} className="my-auto" />
            <p className="ml-4 text-lg">Create Campaign</p>
          </div>
        </Link>
      </div>

      <Link href={"/"} className="flex mb-6">
        <FontAwesomeIcon
          icon={faCircleInfo}
          className=" text-gray-500 text-lg my-auto mx-6 bg-white rounded-full"
        />
        <p className="text-md text-[#F1F1F1]">Help Center</p>
      </Link>
    </div>
  );
}
