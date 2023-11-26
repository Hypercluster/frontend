export default function ReferredModal({
  params,
  close,
}: {
  params: string[];
  close: () => void;
}) {
  return (
    <>
      <p className="text-black font-bold text-xl text-center mt-8">
        YOU’VE BEEN REFERRED BY
      </p>
      <p className="text-black font-bold text-xl text-center tracking-tighter my-4">
        {params[0]}
      </p>
      <p className="text-black font-bold text-xl text-center tracking-tighter my-4">
        <span className="text-white">TO: </span>
        {params[1]}
      </p>
      <div className="flex justify-center">
        <button
          className="bg-white py-1 px-12  rounded-xl text-[#FF5906] font-bold text-xl text-center tracking-tighter my-4"
          onClick={() => close()}
        >
          Accept
        </button>
      </div>
    </>
  );
}
