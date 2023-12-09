
export default function Input({
  value, 
  onChange,
  type
}: {
  value: string,
  onChange: (something: string) => void;
  type: "number" | "text"
}) {

  return (
    (type == 'number') ?
    <input
      type={type}
      className="w-50 text-white text-l rounded-md bg-transparent outline-none flex-1 h-full px-4 py-2 "
      value={value}
      onChange={(e: any) => onChange(e)}
    /> :
    <input
    type={type}
    className="w-50 text-white text-l rounded-md border border-[#9E9E9E] bg-transparent focus:outline-none flex-1 h-full px-4 py-2 "
    value={value}
    onChange={(e: any) => onChange(e)}
  />
  )

}
