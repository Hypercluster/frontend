import DatePickerComponent from "../DatePicker";
import Input from "../Input";

export default function CampaignSetup({
  selectedFile,
  handleClick,
  preventDefault,
  handleDrop,
  handleFileChange,
  fileInputRef,
  setRange,
  handleName,
  handleNextPage,
  name,
}: {
  selectedFile: File | null;
  handleClick: () => void;
  preventDefault: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  setRange: React.Dispatch<React.SetStateAction<any[]>>;
  handleName: (e: any) => void;
  handleNextPage: () => void;
  name: string;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#1D203F] py-3 pl-5 rounded-t-xl text-2xl text-[#FF5906]">
        <p>Campaign Setup</p>
      </div>
      <div className="flex-1 py-8 pl-8 bg-[#1D1F27]">
        <p className="text-white text-lg ">1. Upload Logo</p>
        <div className="flex mt-5">
          <div
            className={`${
              !selectedFile && `border-dashed border-2 border-gray-400`
            } rounded-md h-full p-8 text-center cursor-pointer  `}
            onClick={handleClick}
            onDragOver={preventDefault}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden h-full"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileChange}
            />
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Image"
                className="max-w-52 max-h-52 mx-auto mb-4"
              />
            ) : (
              <div className="flex flex-col h-52 w-52 justify-center items-center ">
                <p className="text-gray-500  text-center">
                  Drag and drop or click here to select file
                </p>
              </div>
            )}
          </div>
        </div>
        <div> 
          <p className="text-white text-lg mt-16 my-10">
            2. Choose a great name
          </p>
          <Input onChange={handleName} value={name} type="text" />
        </div>
        <p className="text-white text-lg mt-16 my-10">
          3. Set your start and end dates
        </p>
        <div>
          <DatePickerComponent setRange={setRange} />
        </div>

        <button
          onClick={() => {
            handleNextPage();
          }}
          className="bg-[#FF5906] text-white rounded-lg py-2 px-20 my-20 text-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}
