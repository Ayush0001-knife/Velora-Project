import React, { useState } from "react";

const PatientInterface = () => {
  const [showUpload, setShowUpload] = useState(false);
  const buttons = [
    { label: "View Your Reports 📄", href: "/reports" },
    { label: "View Personal Data 👤", href: "/personal-data" },
    { label: "Contact Support 📞", href: "/support" },
  ];

  const uploadButton = { 
    label: `${showUpload ? 'Hide' : 'Upload New Analysis'} 📤`, 
    onClick: () => setShowUpload(!showUpload) 
  };

  const pillars = [
    { label: "Nutrition", value: 75, color: "from-green-500 to-green-600" },
    { label: "Sleep", value: 85, color: "from-blue-500 to-blue-600" },
    { label: "Mental", value: 65, color: "from-purple-500 to-purple-600" },
    { label: "Exercise", value: 80, color: "from-orange-500 to-orange-600" },
  ];

  const weeklyTip = "Avoiding screen time 1 hour before bed can significantly improve your sleep quality by reducing blue light exposure.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 font-sans gap-4 sm:gap-5">
      {/* Profile Picture & Name */}
      <div className="flex flex-col items-center mb-2 sm:mb-8">
        <div className="relative">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-blue-200 shadow-lg hover:scale-105 transition-transform duration-300">
            JD
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-400 rounded-full border-2 border-blue-200"></div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 tracking-tight">
          Mr. John Doe
        </h2>
      </div>

      {/* Pillar Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-5 sm:mb-16 w-full max-w-md">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-200"
          >
            <div className="text-sm sm:text-base text-gray-700 font-medium mb-2">
              {pillar.label}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className={`h-2.5 rounded-full bg-gradient-to-r ${pillar.color}`}
                style={{ width: `${pillar.value}%` }}
              ></div>
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800">
              {pillar.value}%
            </div>
          </div>
        ))}
      </div>

      {showUpload && (
        <div className="w-full max-w-md mb-4">
          <label className="group flex flex-col items-center justify-center w-full p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-dashed border-blue-400 hover:border-blue-500">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => console.log(e.target.files[0])}
            />
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                <svg
                  className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                  Upload New Analysis (PDF)
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Click or drag and drop your files here
                </p>
              </div>
            </div>
          </label>
        </div>
      )}

      {/* Weekly Tip */}
      <div className="w-full max-w-md bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
        <h3 className="text-blue-700 font-semibold mb-2">💡 Weekly Tip</h3>
        <p className="text-gray-700 text-sm">{weeklyTip}</p>
      </div>

      {/* Linktree Buttons */}
      <div className="w-full max-w-md flex flex-col gap-4 sm:gap-6">
        {buttons.map((btn, idx) => (
          <a
            key={idx}
            href={btn.href}
            className="bg-white text-center rounded-full py-3 sm:py-4 px-6 sm:px-8 shadow-lg hover:shadow-xl hover:bg-blue-50 text-blue-600 border border-blue-200 font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-102 hover:translate-y-[-2px]"
          >
            {btn.label}
          </a>
        ))}
        
        {/* Upload New Analysis Button */}
        <div className="w-full">
          <button
            onClick={uploadButton.onClick}
            className="w-full bg-white text-center rounded-full py-3 sm:py-4 px-6 sm:px-8 shadow-lg hover:shadow-xl hover:bg-blue-50 text-blue-600 border border-blue-200 font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-102 hover:translate-y-[-2px]"
          >
            {uploadButton.label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientInterface;
