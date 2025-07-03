import React, { useRef, useState } from "react";
import MoreDetails from "./MoreDetails";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const PatientPage = () => {
  const moreDetailsRef = useRef(null);
  const [moreDetails, setMoreDetails] = useState(false);

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
      name: "ECG Report",
      date: "2024-03-10",
      score: 88,
      type: "Uploaded",
    },
    // Add more documents as needed
  ]);

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

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-0 w-full h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div className="col-start-1 col-end-2 row-start-1 row-end-6 p-3 flex items-center flex-col relative">
        {/* Profile Photo */}
        <div className="h-[25%] w-[80%] rounded-full shadow-lg shadow-gray-500">
          <img
            src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczc3LW1ja2luc2V5LTc2MTEtcG9tXzMuanBn.jpg"
            className="h-full w-full rounded-full object-cover"
            alt="Profile"
          />
        </div>

        {/* Basic Info */}
        <div className="h-[5%] w-[90%] flex flex-col items-center mt-3 space-y-2">
          <span className="text-2xl font-semibold">Diego Carbonell</span>
          <span className="text-lg text-gray-500 font-medium italic">
            30/06/2025
          </span>
          <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
            test@gmail.com
          </span>
        </div>

        {/* Details Card + Overlay */}
        <div className="w-[90%] mt-5 relative flex justify-center items-start">
          {/* Main Info Card */}
          <div className="flex flex-col w-full gap-3 bg-white border border-gray-600 shadow-md shadow-gray-400 rounded-lg p-4 z-0">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Age", "32"],
                ["Sex", "Male"],
                ["Blood Group", "O+"],
                ["Height", "175 cm"],
                ["Weight", "70 kg"],
                ["BMI", "22.9"],
                ["Sports/week", "10"],
                ["Vo2 max", "22"],
                ["Exercise/week", "7 hr"],
                ["Sleep/Night", "8 hr"],
                ["Steps/day", "10000"],
              ].map(([label, value]) => (
                <div className="flex flex-col" key={label}>
                  <span className="text-lg font-medium">{label}</span>
                  <span className="text-gray-500">{value}</span>
                </div>
              ))}
            </div>

            {/* Pathology report link */}
            <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              <span className="font-medium">See pathology report</span>
            </div>

            {/* Toggle more details */}
            <div className="flex justify-center">
              <i
                className="ri-arrow-up-wide-line text-2xl text-gray-600 hover:text-gray-800 cursor-pointer transition-transform hover:translate-y-[-2px]"
                onClick={() => setMoreDetails(!moreDetails)}
              />
            </div>
          </div>

          {/* Sliding Overlay Panel */}
          <div
            ref={moreDetailsRef}
            className="absolute inset-0 z-10 bg-white rounded-lg overflow-y-auto shadow-md shadow-gray-400"
            style={{ opacity: 0, transform: "translateY(100%)" }}
          >
            <MoreDetails setMoreDetails={setMoreDetails} />
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="col-start-2 col-end-6 row-start-4 row-end-6 bg-white border-2 border-gray-200 rounded-lg shadow-xl m-2 overflow-hidden">
        <h2 className="text-xl font-semibold p-3 border-b border-gray-200">
          Processed Documents
        </h2>
        <div className="h-[calc(100%-80px)] overflow-y-auto p-3 pt-2">
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-full">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{doc.name}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(doc.date).toLocaleDateString()} • {doc.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="block font-semibold text-base">
                      {doc.score}
                    </span>
                    <span className="text-xs text-gray-500">Score</span>
                  </div>
                  <button className="p-1.5 hover:bg-gray-100 rounded-full">
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

      <div className="col-start-2 col-end-4 row-start-1 row-end-4 bg-white p-4 border-2 border-gray-200 rounded-lg shadow-xl m-2 mt-5">
        <h2 className="text-xl font-semibold mb-4">Health Pillars Score</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Nutrition Score */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-green-700">
                Nutrition Score
              </span>
              <span className="text-2xl font-bold text-green-600">85</span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>

          {/* Exercise Score */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-blue-700">Exercise Score</span>
              <span className="text-2xl font-bold text-blue-600">78</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>

          {/* Mental Health Score */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-purple-700">Mental Health</span>
              <span className="text-2xl font-bold text-purple-600">92</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>

          {/* Sleep Quality Score */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-indigo-700">Sleep Quality</span>
              <span className="text-2xl font-bold text-indigo-600">88</span>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: "88%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Prevention Alerts */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Prevention Alerts
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-yellow-800">
                Due for annual health checkup
              </span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-red-800">
                Blood pressure trending higher
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col-start-4 col-end-6 row-start-1 row-end-3 bg-white p-4 border-2 border-gray-200 rounded-lg shadow-xl m-2 mt-5">
        <h2 className="text-xl font-semibold mb-4">Patient Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Update Patient Values Button */}
          <button className="flex items-center justify-center gap-2 p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
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
            <span className="font-medium text-blue-600">Update Values</span>
          </button>

          {/* Upload New Document Button */}
          <button className="flex items-center justify-center gap-2 p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600"
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
            <span className="font-medium text-green-600">Upload Document</span>
          </button>

          {/* Generate New Report Button */}
          <button className="flex items-center justify-center gap-2 p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-600"
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
            <span className="font-medium text-purple-600">Generate Report</span>
          </button>

          {/* View History Button */}
          <button className="flex items-center justify-center gap-2 p-4 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-600"
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
            <span className="font-medium text-orange-600">View History</span>
          </button>

          {/* Send Email Button */}
          <button className="flex items-center justify-center gap-2 p-4 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
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
            <span className="font-medium text-red-600">Send Report</span>
          </button>

          {/* Export Data Button */}
          <button className="flex items-center justify-center gap-2 p-4 bg-teal-100 rounded-lg hover:bg-teal-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-teal-600"
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
            <span className="font-medium text-teal-600">Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
