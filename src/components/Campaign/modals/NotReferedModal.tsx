export default function NotReferredModal({ close }: { close: () => void }) {
  return (
    <>
      <p className="text-black font-bold text-xl text-center my-6">UH OH!</p>
      <p className="text-black font-bold text-xl text-center tracking-tighter my-4">
        YOU HAVEN’T REFERRED ANYONE YET TO BE ELIGIBLE TO CLAIM
      </p>

      <div className="flex justify-center">
        <button
          className=" py-1 px-12  rounded-xl text-[#DEDEDE]  text-xl text-center tracking-tighter mt-1 mb-4"
          onClick={() => close()}
        >
          REFER
        </button>
      </div>
    </>
  );
}
