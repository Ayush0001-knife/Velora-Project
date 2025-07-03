import React from "react";

const MoreDetails = ({ setMoreDetails }) => {
  return (
    <div className="w-[100%] mt-3 flex flex-col gap-4 bg-white border border-gray-600 shadow-md shadow-gray-400 rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium">Allergy</span>
        <textarea
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter allergy information..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium">Note</span>
        <textarea
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter notes..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium">Additional Details</span>
        <textarea
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter additional details..."
        />
      </div>
      <div className="flex justify-center">
        <i
          className="ri-arrow-down-wide-line text-2xl text-gray-600 hover:text-gray-800 cursor-pointer transition-transform hover:translate-y-[-2px]"
          onClick={() => setMoreDetails(false)}
        ></i>
      </div>
    </div>
  );
};

export default MoreDetails;
