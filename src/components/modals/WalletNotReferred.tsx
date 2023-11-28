export default function WalletNotReferredModal({
  close,
}: {
  close: () => void;
}) {
  return (
    <>
      <p className="text-black font-bold text-xl text-center my-6">OOPS!</p>
      <p className="text-black font-bold text-xl text-center tracking-tighter ">
        THIS WALLET HAS NOT BEEN
      </p>
      <p className="text-black font-bold text-xl text-center tracking-tighter mb-4">
        REFERRED
      </p>
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
