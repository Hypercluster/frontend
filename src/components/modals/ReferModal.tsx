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
      <p className="text-white font-bold text-2xl text-center tracking-tighter my-4">
        {params[0]}
      </p>
      <p className="text-black font-bold text-md text-center my-8 ">
        BOTS WILL BE ELIMINATED BY AI
      </p>
    </>
  );
}
