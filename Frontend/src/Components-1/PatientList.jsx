import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate("/patient");
  };

  let data = [
    {
      name: "Ayush",
      sex: "Male",
      age: 20,
      bmi: 20,
      reportGenerated: false,
    },
    {
      name: "Rahul",
      sex: "Male",
      age: 25,
      bmi: 22,
      reportGenerated: true,
    },
    {
      name: "Sneha",
      sex: "Female",
      age: 22,
      bmi: 19,
      reportGenerated: false,
    },
    {
      name: "Anjali",
      sex: "Female",
      age: 23,
      bmi: 21,
      reportGenerated: true,
    },
    {
      name: "Vikas",
      sex: "Male",
      age: 28,
      bmi: 24,
      reportGenerated: false,
    },
    {
      name: "Ravi",
      sex: "Male",
      age: 31,
      bmi: 26,
      reportGenerated: true,
    },
    {
      name: "Priya",
      sex: "Female",
      age: 29,
      bmi: 23,
      reportGenerated: false,
    },
    {
      name: "Riya",
      sex: "Female",
      age: 26,
      bmi: 20,
      reportGenerated: true,
    },
  ];

  const [list, setList] = useState(data);

  const handleNameSort = () => {
    const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    setList(sortedData);
  };

  const handleSexSort = () => {
    const sortedData = data.sort((a, b) => a.sex.localeCompare(b.sex));
    setList(sortedData);
  };

  const handleAgeSort = () => {
    const sortedData = data.sort((a, b) => a.age - b.age);
    setList(sortedData);
  };

  const handleBMISort = () => {
    const sortedData = data.sort((a, b) => a.bmi - b.bmi);
    setList(sortedData);
  };

  const handleReportStatusSort = () => {
    const sortedData = data.sort((a, b) => {
      if (a.reportGenerated && !b.reportGenerated) {
        return -1;
      } else if (!a.reportGenerated && b.reportGenerated) {
        return 1;
      } else {
        return 0;
      }
    });
    setList(sortedData);
  };

  return (
    <div className="p-6 h-screen">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col mt-5 border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 px-6 sticky top-0 z-10 rounded-t-xl">
          <div className="grid grid-cols-6 gap-4 font-semibold items-center">
            <div
              className="text-center cursor-pointer hover:text-gray-300 transition-colors duration-200"
              onClick={() => handleNameSort()}
            >
              Name
            </div>
            <div
              className="text-center cursor-pointer hover:text-gray-300 transition-colors duration-200"
              onClick={() => handleSexSort()}
            >
              Sex
            </div>
            <div
              className="text-center cursor-pointer hover:text-gray-300 transition-colors duration-200"
              onClick={() => handleAgeSort()}
            >
              Age
            </div>
            <div
              className="text-center cursor-pointer hover:text-gray-300 transition-colors duration-200"
              onClick={() => handleBMISort()}
            >
              BMI
            </div>
            <div
              className="text-center cursor-pointer hover:text-gray-300 transition-colors duration-200"
              onClick={() => handleReportStatusSort()}
            >
              Report Status
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search"
                className="w-[50%] p-2 border border-gray-100 bg-white rounded-md text-sm text-gray-800 focus:outline-none"
              />
              <i className="ri-search-eye-line text-4xl text-orange-500"></i>
            </div>
          </div>
        </div>

        {/* Scrollable patient list */}
        <div
          className="divide-y divide-gray-200 overflow-y-auto max-h-[28rem] px-6"
          onClick={() => handleClick()}
        >
          {list.map((item, index) => (
            <div
              className="hover:bg-gray-50 transition duration-200 ease-in-out"
              key={`${item.name}-${index}`}
            >
              <div className="grid grid-cols-6 gap-4 py-4 text-sm items-center">
                <div className="text-center font-medium text-gray-900">
                  {item.name}
                </div>
                <div className="text-center text-gray-700">{item.sex}</div>
                <div className="text-center text-gray-700">{item.age}</div>
                <div className="text-center text-gray-700">{item.bmi}</div>
                <div className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.reportGenerated
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.reportGenerated ? "Generated" : "Pending"}
                  </span>
                </div>
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientList;
