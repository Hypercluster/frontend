export default function BotFailed({ close }: { close: () => void }) {
  return (
    <>
      <p className="text-black font-bold text-xl text-center mt-6">UH OH!</p>
      <p className="text-black font-bold text-xl text-center tracking-tighter mb-4">
        OUR AI THINKS YOU’RE A BOT
      </p>
      <div className="flex justify-center">
        <button
          className=" py-1 px-12  rounded-xl text-white  text-xl text-center tracking-tighter mt-1"
          onClick={() => close()}
        >
          SWITCH TO A DIFFERENT WALLET
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className=" py-1 px-12  rounded-xl text-[#DEDEDE]  text-xl text-center tracking-tighter mb-4"
          onClick={() => close()}
        >
          COMPLAIN ON TWITTER
        </button>
      </div>
    </>
  );
}
