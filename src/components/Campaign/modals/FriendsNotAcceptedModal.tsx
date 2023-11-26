export default function FriendsNotAcceptedModal({
  close,
}: {
  close: () => void;
}) {
  return (
    <>
      <p className="text-black font-bold text-xl text-center my-8 ">UH OH!</p>
      <p className="text-black font-bold text-xl text-center tracking-tighter my-4">
        YOUR FRIEND(S) HAVEN’T ACCEPTED THEIR REFERRAL
      </p>
      <div className="flex justify-center">
        <button
          className=" py-1 px-12  rounded-xl text-white  text-xl text-center tracking-tighter mb-5"
          onClick={() => close()}
        >
          PING THEM
        </button>
      </div>
    </>
  );
}
