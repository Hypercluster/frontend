import Image from "next/image";

export const Card = ({title, text} : {title: string, text: string}) => {
  return <div className="text-white border-[#2C2C2C] rounded-md p-7 w-[30%] bg-[#0F1122]">
    <span className="text-l text-[#FF5906]"> {title} </span>
    <div className="mt-4">
      <p className="text-2xl text-right"> {text} </p>
    </div>
  
    </div>
}


export const LongCard = ({title, launchDate, onClick, photoPath, handleDelete, handlePause, triggerMilestone} : 
  {
    title: string,
    launchDate: string,
    photoPath?: string,
    onClick?: () => void,
    handleDelete?: () => void,
    handlePause?: () => void,
    triggerMilestone?: () => void,
  }) => {
    return (
      <div className="flex flex-row border rounded-md border-[#2C2C2C] bg-[#0F1122] w-full h-24 my-8 items-center gap-4 p-4 hover:border-[#FF5906]" onClick={onClick}>
        <Image
          src={"/campaigns/apecoin.png"}
          width={60}
          height={60}
          alt="logo"
        />

        <div className="flex flex-col w-[40%] text-white">
          <span> {title.toUpperCase()} </span>
          <p className="text-xs"> <span className="text-[#FF5906]">Launched: </span> {launchDate}  </p>
        </div>

        <button className="ml-auto text-white text-sm px-2 py-1 bg-[#242424] rounded-md">
          Delete campaign
        </button>

        <button className="text-white text-sm px-2 py-1 bg-[#FF5906] rounded-md"> 
          Pause campaign
        </button>
    </div>
    );

}