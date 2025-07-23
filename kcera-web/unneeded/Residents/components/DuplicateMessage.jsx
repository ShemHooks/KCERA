const DuplicateMessage = ({ message, onCancel }) => {
  console.log(message);
  return (
    <div className="z-30000 transform -translate-y-140 bg-white w-[90%] h-[300px] self-center p-4 rounded-lg mr-4 flex flex-col gap-10 lg:gap-20 shadow-2xl shadow-black">
      <h1 className="mt-2 font-bold text-center text-[24px]">
        {message} Response is on its way
      </h1>
      <div className="flex justify-center gap-2 lg:gap-8">
        <button
          className="bg-red-500 text-white w-[100px] rounded shadow-2xl shadow-blue-700 cursor-pointer"
          onClick={onCancel}
        >
          Cancel Request
        </button>
        <button className="bg-blue-700 w-[100px] text-white shadow-2xl shadow-red-500 rounded cursor-pointer">
          Continue Sending Request
        </button>
      </div>
    </div>
  );
};

export default DuplicateMessage;
