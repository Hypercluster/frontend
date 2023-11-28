export default function ClaimModal({
  params,
  close,
}: {
  params: string[];
  close: () => void;
}) {
  return (
    <>
      <p className="text-black font-bold text-xl text-center mt-6">
        CLAIM: <span className="underline underline-offset-4">{params[0]}</span>
      </p>
      <p className="text-black font-bold text-md text-center mt-6">
        Select Chain of Choice
      </p>
      <div className="flex  flex-col items-center justify-center">
        <button
          className="bg-white py-1 px-12  rounded-xl text-[#FF5906] font-bold text-xl text-center tracking-tighter mt-4 mb-1"
          onClick={() => close()}
        >
          ETH
        </button>
        <button
          className="bg-white py-1 px-12  rounded-xl text-[#FF5906] font-bold text-xl text-center tracking-tighter mb-4 mt-1"
          onClick={() => close()}
        >
          ARB
        </button>
      </div>
      <p className="text-black font-bold text-md text-center mt-3">
        POWERED BY CHAINLINK CCIP
      </p>
    </>
  );
}
