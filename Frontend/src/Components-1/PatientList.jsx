import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const PatientList = () => {
  const navigate = useNavigate();

  const data = [
    {
      name: "Ayush Kumar",
      sex: "Male",
      age: 25,
      bmi: 20.5,
      reportGenerated: true,
    },
    {
      name: "Priya Sharma",
      sex: "Female",
      age: 32,
      bmi: 22.1,
      reportGenerated: false,
    },
    {
      name: "Rahul Verma",
      sex: "Male",
      age: 45,
      bmi: 26.8,
      reportGenerated: true,
    },
    {
      name: "Anjali Patel",
      sex: "Female",
      age: 28,
      bmi: 19.2,
      reportGenerated: false,
    },
    {
      name: "Vikram Singh",
      sex: "Male",
      age: 39,
      bmi: 24.5,
      reportGenerated: true,
    },
    {
      name: "Neha Gupta",
      sex: "Female",
      age: 31,
      bmi: 21.7,
      reportGenerated: true,
    },
    {
      name: "Ravi Mishra",
      sex: "Male",
      age: 27,
      bmi: 23.0,
      reportGenerated: false,
    },
    {
      name: "Sneha Joshi",
      sex: "Female",
      age: 24,
      bmi: 20.8,
      reportGenerated: true,
    },
    {
      name: "Arun Desai",
      sex: "Male",
      age: 41,
      bmi: 25.3,
      reportGenerated: false,
    },
  ];

  const [list, setList] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (patient) => {
    navigate("/patient", { state: { patient } });
  };

  const handleSort = (key) => {
    const sorted = [...list].sort((a, b) => {
      if (key === "reportGenerated") return b[key] - a[key];
      if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
      return a[key] - b[key];
    });
    setList(sorted);
  };

  const filteredList = list.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[95%] h-[95vh] mx-auto my-[2.5vh] bg-white rounded-2xl shadow-lg flex flex-col ">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6 flex-shrink-0 rounded-t-2xl">
        <h1 className="text-2xl font-bold mb-4">Patient Records</h1>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-gray-800 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <FiSearch className="ml-2 text-xl" />
          </div>
          <button
            type="button"
            className="btn btn-light h-[4rem] w-[13rem] "
            onClick={() => navigate("/add-patient")}
          >
            <span className="text-lg font-semibold text-blue-600">
              Add Patient +
            </span>
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-gray-200 flex px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div
          onClick={() => handleSort("name")}
          className="w-[20%] px-4 font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          Patient Name
        </div>
        <div
          onClick={() => handleSort("sex")}
          className="w-[15%] px-4 text-center font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          Gender
        </div>
        <div
          onClick={() => handleSort("age")}
          className="w-[15%] px-4 text-center font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          Age
        </div>
        <div
          onClick={() => handleSort("bmi")}
          className="w-[15%] px-4 text-center font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          BMI
        </div>
        <div
          onClick={() => handleSort("reportGenerated")}
          className="w-[20%] px-4 text-center font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          Status
        </div>
      </div>

      {/* Patient Rows */}
      <div className="flex-grow overflow-y-auto px-6">
        {filteredList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className="flex py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <div className="w-[20%] px-4 font-medium">{item.name}</div>
            <div className="w-[15%] px-4 text-center">{item.sex}</div>
            <div className="w-[15%] px-4 text-center">{item.age}</div>
            <div className="w-[15%] px-4 text-center">{item.bmi}</div>
            <div className="w-[20%] px-4 text-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  item.reportGenerated
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.reportGenerated ? "Complete" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
