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
        <button
          className=" py-1 px-12  rounded-xl text-white text-xl text-center tracking-tighter mt-1"
          onClick={() => close()}
        >
          {params[0]}
        </button>
      </div>
      <p className="text-black font-bold text-md text-center my-8 ">
        BOTS WILL BE ELIMINATED BY AI
      </p>
    </>
  );
}
