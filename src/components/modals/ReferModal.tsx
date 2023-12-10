export default function ReferModal({
  close,
  params,
}: {
  close: () => void;
  params: string[];
}) {

  return (
    <>
      <p className="text-black font-bold text-xl text-center my-8 ">
        REFER YOUR 2 MOST TRUSTED
      </p>
    
      <div className="flex justify-center">
        <button onClick={async () => {await navigator.clipboard.writeText(params[3])}}
          className=" py-1 px-8  rounded-xl text-white text-xl text-center tracking-tighter mt-1 truncate"
        >
          {params[3]}
        </button>
      </div>
      <p className="text-black font-bold text-md text-center my-8 hover:text-white hover:cursor-pointer"
          onClick={async () => {
            await navigator.clipboard.writeText(params[3])
            close()
          }}
        >
        BOTS WILL BE ELIMINATED BY AI
      </p>
    </>
  );
}
