export default function DeployedModal({ close }: { close: () => void }) {
  return (
    <>
      <p className="text-black font-bold text-xl text-center tracking-tighter mt-4">
        CAMPAIGN IS ACTIVE!
      </p>
      <p className="text-black font-bold text-xl text-center tracking-tighter mt-8 mb-1">
        LIGHT THE FUSE
      </p>
      <div className="flex justify-center">
        <button
          className=" py-1 px-12  rounded-xl text-[#DEDEDE]  text-xl text-center tracking-tighter mb-4"
          onClick={() => close()}
        >
          https://hypercluster.io/4xd8
        </button>
      </div>
    </>
  );
}
