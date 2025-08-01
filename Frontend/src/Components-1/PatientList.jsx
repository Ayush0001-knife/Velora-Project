import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { patientAllData } from "../services/api";

const PatientList = ({data}) => {
  const navigate = useNavigate();

  const { t } = useTranslation();





  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleClick = async (item) => {
    const response = await patientAllData(item.id);
    const data = response.data;
    console.log("data",data)
    navigate("/patient", { state: data});
  };

  const handleSort = (key) => {
    const sorted = [...list].sort((a, b) => {
      if (key === "reportGenerated") return b[key] - a[key];
      if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
      return a[key] - b[key];
    });
    setList(sorted);
  };


  const filteredList = list.filter((patient) => {
    const fullName = `${patient.first_name ?? ""} ${patient.last_name ?? ""}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  


  return (
    <div className="w-[80%] h-[70vh] mx-auto bg-white rounded-2xl shadow-lg flex flex-col mt-5">
      {/* Header */}
      <div className="bg-blue-500 text-white p-6 flex-shrink-0 rounded-t-2xl">
        <h1 className="text-2xl font-bold mb-4">{t("patient_records")}</h1>
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
              {t("add_patient")} +
            </span>
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-gray-200 flex px-6 py-4 sticky top-0 z-10 border-b border-gray-200">
        <div
          onClick={() => handleSort("first_name")}
          className="w-[20%] px-4 font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          {t("patient_name")}
        </div>
        <div
          onClick={() => handleSort("gender")}
          className="w-[15%] px-4 text-center font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          {t("gender")}
        </div>
        <div
          onClick={() => handleSort("age")}
          className="w-[15%] px-4 text-center font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          {t("age")}
        </div>
        <div
          onClick={() => handleSort("bmi")}
          className="w-[15%] px-4 text-center font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          {t("bmi")}
        </div>
        <div
          onClick={() => handleSort("reportGenerated")}
          className="w-[20%] px-4 text-center font-semibold text-gray-700 cursor-pointer hover:text-blue-500"
        >
          {t("status")}
        </div>
      </div>

      {/* Patient Rows */}
      <div className="flex-grow overflow-y-auto px-6">
        {list.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className="flex py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <div className="w-[20%] px-4 font-medium">{item.first_name}{" "}{item.last_name}</div>
            <div className="w-[15%] px-4 text-center">{item.gender}</div>
            <div className="w-[15%] px-4 text-center">{item.age}</div>
            <div className="w-[15%] px-4 text-center">{(item.weight / (item.height * item.height)).toFixed(2)}</div>
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