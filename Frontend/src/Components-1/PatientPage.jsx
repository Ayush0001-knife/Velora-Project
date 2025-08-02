import React, { useEffect, useRef, useState } from "react";
import MoreDetails from "./MoreDetails";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PatientPage = () => {
  const location = useLocation();

  const patientData = location.state;

  const [patient, setPatient] = useState(patientData.patient);
  const [analysis, setAnalysis] = useState(patientData.analysis);
  const [anthropometrics, setAnthropometrics] = useState(patientData.anthropometrics);
  const [blood_tests, setBloodTests] = useState(patientData.blood_tests);
  const [cardiorespiratory, setCardiorespiratory] = useState(patientData.cardiorespiratory);
  const [digital_inputs, setDigitalInputs] = useState(patientData.digital_inputs);
  const [exercise, setExercise] = useState(patientData.exercise);
  const [goals, setGoals] = useState(patientData.goals);
  const [medical_history, setMedicalHistory] = useState(patientData.medical_history);
  const [mental_health, setMentalHealth] = useState(patientData.mental_health);
  const [nutrition, setNutrition] = useState(patientData.nutrition);
  const [kbs, setKbs] = useState(null);

  const moreDetailsRef = useRef(null);
  const [moreDetails, setMoreDetails] = useState(false);
  const { t } = useTranslation();

  // Sample processed documents data
  const [documents] = useState([
    {
      name: "Blood Test Analysis",
      date: "2024-03-15",
      score: 95,
      type: "Generated",
    },
    {
      name: "ECG Report",
      date: "2024-03-10",
      score: 88,
      type: "Uploaded",
    },
    {
      name: "ECG Report",
      date: "2024-03-10",
      score: 88,
      type: "Uploaded",
    },
    {
      name: "ECG Report",
      date: "2024-03-10",
      score: 88,
      type: "Uploaded",
    },
    {
      name: "Cardiography",
      date: "2024-03-10",
      score: 88,
      type: "Uploaded",
    },
  ]);

  const handledtaaprint = () => {
    console.log("patient", patient)
    console.log("analysis", analysis)
    console.log("anthropometrics", anthropometrics)
    console.log("blood_tests", blood_tests)
    console.log("cardiorespiratory", cardiorespiratory)
    console.log("digital_inputs", digital_inputs)
    console.log("exercise", exercise)
    console.log("goals", goals)
    console.log("medical_history", medical_history)
    console.log("mental_health", mental_health)
    console.log("nutrition", nutrition)
  }

  useGSAP(() => {
    if (moreDetails) {
      gsap.to(moreDetailsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(moreDetailsRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [moreDetails]);

  const KnowledgeBaseIDApi = async () => {
    const authorization = localStorage.getItem("authorization");
    const body = { owner_ids: [] };
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:9380/v1/kb/list?page=1&page_size=30&keywords=",
        body,
        { headers: { Authorization: `${authorization}` } }
      );
  
      const kbId = response.data.data.kbs[0]?.id;
      console.log("Fetched kbId:", kbId);
      setKbs(kbId); // still optional, if you want to show it elsewhere
      return kbId;  // return directly
    } catch (error) {
      console.error("Failed to fetch Knowledge Base ID:", error);
      return null;
    }
  };
  
  const finalReportApi = async (kbId) => {
    const authorization = localStorage.getItem("authorization");
    const formData = new FormData();
    formData.append("kb_id", kbId);
  
    console.log("Sending final report request with: ");
    console.log("patientId:", patient.id);
    console.log("kb_id:", kbId);
    console.log("Authorization:", authorization);
  
    const response = await axios.post(
      `http://localhost:9380/v1/patient_analysis/patients/${patient.id}/generate-final-report`,
      formData,
      { headers: { Authorization: `${authorization}` } }
    );
    console.log(response);
  };
  
  const handlereportGenClick = async () => {
    const kbId = await KnowledgeBaseIDApi();
    if (kbId) {
      await finalReportApi(kbId);
    } else {
      console.error("Cannot generate report: kbId is null.");
    }
  };
  

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-0 w-full h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="col-start-1 col-end-2 row-start-1 row-end-6 p-2 flex items-center flex-col gap-5 relative">


        {/* Basic Info */}
        <div className="w-[90%] flex flex-col items-center gap-5 my-6">
          <span className="text-lg font-semibold" onClick={handledtaaprint}>{patient.first_name} {patient.last_name}</span>
          <span className="text-sm text-gray-500 font-medium italic">
            {new Date(patient.create_date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </span>
          <span className="text-sm text-blue-600 underline cursor-pointer hover:text-blue-800">
            {patient.email}
          </span>
        </div>

        {/* Details Card + Overlay */}
        <div className="w-[90%] h-[55%] relative flex justify-center items-start">
          {/* Main Info Card */}
          <div className="flex flex-col w-full h-full gap-4 bg-white border border-gray-600 shadow-md shadow-gray-400 rounded-[0.75rem] p-3 z-0">
            <div className="grid grid-cols-2 gap-4">
              {[
                [t("patient_age"), patient.age ? patient.age : '-'],
                [t("patient_sex"), patient.gender ? patient.gender : '-'],
                [t("patient_height"), patient.height ? patient.height : '-'],
                [t("patient_weight"), patient.weight ? patient.weight : '-'],
                [t("vo2_max"), cardiorespiratory?.[0]?.vo2_max ? cardiorespiratory?.[0]?.vo2_max : '-'],
                [t("exercise_week"), exercise?.[0]?.weekly_exercise_frequency ? exercise?.[0]?.weekly_exercise_frequency : '-'],
                [t("steps_day"), exercise?.[0]?.steps_per_day_average ? exercise?.[0]?.steps_per_day_average : '-'],
                [t("dob"), patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }) : '-'],
                [t("status"), patient.status ? patient.status : '-'],
                [t("bodyfat"), anthropometrics?.[0]?.body_fat_percent || '-'],
                [t("vitaminb12"), blood_tests?.[0]?.vitamin_b12 || '-'],
              ].map(([label, value]) => (
                <div className="flex flex-col" key={label}>
                  <span className="text-sm font-medium capitalize">
                    {label}
                  </span>
                  <span className="text-xs text-gray-500">{value}</span>
                </div>
              ))}
            </div>

            {/* Pathology report link */}
            <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-xs font-medium">
                {t("see_pathology_report")}
              </span>
            </div>

            {/* Toggle more details */}
            <div className="flex justify-center mt-auto">
              <i
                className="ri-arrow-up-wide-line text-xl text-gray-600 hover:text-gray-800 cursor-pointer transition-transform hover:translate-y-[-2px]"
                onClick={() => setMoreDetails(!moreDetails)}
              />
            </div>
          </div>

          {/* Sliding Overlay Panel */}
          <div
            ref={moreDetailsRef}
            className="absolute inset-0 z-10 bg-white rounded-[0.75rem] overflow-y-auto shadow-md shadow-gray-400"
            style={{ opacity: 0, transform: "translateY(100%)" }}
          >
            <MoreDetails setMoreDetails={setMoreDetails} />
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="col-start-2 col-end-6 row-start-4 row-end-6 bg-white border border-gray-200 rounded-[0.75rem] shadow-lg m-2 overflow-hidden">
        <h2 className="text-base font-semibold p-3 border-b border-gray-200 bg-gray-50">
          {t("processed_documents")}
        </h2>
        <div className="h-[calc(100%-56px)] overflow-y-auto p-3">
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-800">
                      {doc.name}{" "}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(doc.date).toLocaleDateString()} • {doc.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center bg-gray-50 px-3 py-1 rounded-full">
                    <span className="block font-semibold text-sm text-gray-800">
                      {doc.score}
                    </span>
                    <span className="text-xs text-gray-500">
                      Document Score
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-start-2 col-end-4 row-start-1 row-end-4 bg-white p-3 border border-gray-200 rounded-[0.75rem] shadow-lg m-2 mt-4">
        <h2 className="text-base font-semibold mb-3">
          {t("health_pillars_score")}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Nutrition Score */}
          <div className="bg-green-50 p-3 rounded-[0.75rem]">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-green-700">
                {t("nutrition_score")}
              </span>
              <span className="text-lg font-bold text-green-600">85</span>
            </div>
            <div className="w-full bg-green-200 rounded-[0.75rem] h-1.5">
              <div
                className="bg-green-600 h-1.5 rounded-[0.75rem]"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>

          {/* Exercise Score */}
          <div className="bg-blue-50 p-3 rounded-[0.75rem]">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-blue-700">
                {t("exercise_score")}
              </span>
              <span className="text-lg font-bold text-blue-600">78</span>
            </div>
            <div className="w-full bg-blue-200 rounded-[0.75rem] h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-[0.75rem]"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>

          {/* Mental Health Score */}
          <div className="bg-purple-50 p-3 rounded-[0.75rem]">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-purple-700">
                {t("mental_health")}
              </span>
              <span className="text-lg font-bold text-purple-600">92</span>
            </div>
            <div className="w-full bg-purple-200 rounded-[0.75rem] h-1.5">
              <div
                className="bg-purple-600 h-1.5 rounded-[0.75rem]"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          {/* Sleep Quality Score */}
          <div className="bg-indigo-50 p-3 rounded-[0.75rem]">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium text-indigo-700">
                {t("sleep_quality")}
              </span>
              <span className="text-lg font-bold text-indigo-600">88</span>
            </div>
            <div className="w-full bg-indigo-200 rounded-[0.75rem] h-1.5">
              <div
                className="bg-indigo-600 h-1.5 rounded-[0.75rem]"
                style={{ width: "88%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Prevention Alerts */}
        <div className="mt-4 h-[200px] flex flex-col">
          <h3 className="text-sm font-semibold mb-2 text-gray-700">
            {t("prevention_alerts")}
          </h3>
          <div className="space-y-1.5 overflow-y-auto flex-1">
            <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-[0.75rem] border border-yellow-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs text-yellow-800">
                Annual Checkup Due
              </span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-[0.75rem] border border-yellow-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs text-yellow-800">
                Annual Checkup Due
              </span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 p-2 rounded-[0.75rem] border border-red-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs text-red-800">Blood Pressure High</span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-start-4 col-end-6 row-start-1 row-end-4 bg-white p-3 border border-gray-200 rounded-[0.75rem] shadow-lg m-2 mt-4">
        <h2 className="text-base font-semibold mb-3">{t("patient_actions")}</h2>
        <div className="grid grid-cols-2 gap-4 h-[calc(100%-3rem)]">
          {/* Update Patient Values Button */}
          <button className="flex items-center justify-center gap-2 py-4 px-3 bg-blue-100 rounded-[0.75rem] hover:bg-blue-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="text-sm font-medium text-blue-600">
              {t("update_values")}
            </span>
          </button>

          {/* Upload New Document Button */}
          <button className="flex items-center justify-center gap-2 py-4 px-3 bg-green-100 rounded-[0.75rem] hover:bg-green-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span className="text-sm font-medium text-green-600">
              {t("upload_document")}
            </span>
          </button>

          {/* Generate New Report Button */}
          <button className="flex items-center justify-center gap-2 py-4 px-3 bg-purple-100 rounded-[0.75rem] hover:bg-purple-200 transition-colors" onClick={handlereportGenClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-medium text-purple-600">
              {t("generate_report")}
            </span>
          </button>

          {/* View History Button */}
          <button className="flex items-center justify-center gap-2 py-4 px-3 bg-orange-100 rounded-[0.75rem] hover:bg-orange-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="text-sm font-medium text-orange-600">
              {t("view_history")}
            </span>
          </button>

          {/* Send Email Button */}
          <button className="flex items-center justify-center gap-2 py-4 px-3 bg-red-100 rounded-[0.75rem] hover:bg-red-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium text-red-600">
              {t("send_report")}
            </span>
          </button>

          {/* Export Data Button */}
          <button className="flex items-center justify-center gap-2 py-4 px-3 bg-teal-100 rounded-[0.75rem] hover:bg-teal-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm font-medium text-teal-600">
              {t("export_data")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
