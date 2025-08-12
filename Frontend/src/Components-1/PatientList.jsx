import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { patientAllData } from "../services/api";

const PatientList = ({ data, onPatientSelect, selectedPatient }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Update list when prop changes
  useEffect(() => {
    if (Array.isArray(data)) {
      setList(data);
    } else {
      console.warn("Expected array for 'data', received:", data);
      setList([]); 
      
    }
  }, [data]);

  


  const handleClick = async (item) => {
    if (onPatientSelect) {
      onPatientSelect(item);
    } else {
      // Fallback to original behavior if not used in ChatPage
      const response = await patientAllData(item.id);
      const data = response.data;
      navigate("/patient", { state: data });
    }
  };

  const handleSort = (key) => {
    const sorted = [...list].sort((a, b) => {
      if (key === "reportGenerated") return b[key] - a[key];
      if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
      return a[key] - b[key];
    });
    setList(sorted);
  };


  return (
    <div className="w-[80%] h-[70vh] mx-auto bg-white rounded-2xl shadow-lg flex flex-col mt-5">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 flex-shrink-0 rounded-t-2xl">
        <h1 className="text-2xl font-bold mb-4" onClick={()=>console.log("List ",list)}>{t("patient_records")}</h1>
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
            className="btn btn-light h-[4rem] w-[13rem]"
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
        {list.map((item, index) => {
          const heightInMeters = item.height || 1.6; // Avoid division by zero
          const bmi =
            item.weight && item.height
              ? (item.weight / (heightInMeters * heightInMeters)).toFixed(2)
              : "-";

          return (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className={`flex items-center p-4 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer ${
                selectedPatient?.id === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="w-[20%] px-4 font-medium">{item.first_name} {item.last_name}</div>
              <div className="w-[15%] px-4 text-center">{item.gender}</div>
              <div className="w-[15%] px-4 text-center">{item.age}</div>
              <div className="w-[15%] px-4 text-center">{bmi}</div>
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
          );
        })}
      </div>
    </div>
  );
};

export default PatientList;
