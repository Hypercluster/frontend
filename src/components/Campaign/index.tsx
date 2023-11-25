import Footer from "./Footer";
import Info from "./Info";
import Rules from "./Rules";
import Status from "./Status";

export default function Campaign() {
  return (
    <div className="h-full flex justify-between ">
      <div className=" flex-1 ">
        <Info />
        <Status />
      </div>
      <div className="w-[1px] h-[100%] bg-[#FF5906]"></div>
      <div className="flex-1">
        <Rules />
        <Footer />
      </div>
    </div>
  );
}
