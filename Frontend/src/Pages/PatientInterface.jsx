import React from "react";

const PatientInterface = () => {
  const buttons = [
    { label: "View Reports 📄", href: "/reports" },
    { label: "View Personal Data 👤", href: "/personal-data" },
    { label: "Contact Support 📞", href: "/support" },
  ];

  const pillars = [
    { label: "Nutritional", value: 75, color: "from-green-500 to-green-600" },
    { label: "Health", value: 85, color: "from-blue-500 to-blue-600" },
    { label: "Mental", value: 65, color: "from-purple-500 to-purple-600" },
    { label: "Exercise", value: 80, color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 font-sans gap-4 sm:gap-5">
      {/* Profile Picture & Name */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <div className="relative">
          <img
            src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczc3LW1ja2luc2V5LTc2MTEtcG9tXzMuanBn.jpg"
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 tracking-tight">
          Mr. John Doe
        </h2>
      </div>

      {/* Pillar Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-10 sm:mb-16 w-full max-w-md">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl backdrop-blur-sm bg-opacity-90"
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
            <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {pillar.value}%
            </div>
          </div>
        ))}
      </div>

      {/* Linktree Buttons */}
      <div className="w-full max-w-md flex flex-col gap-4 sm:gap-6">
        {buttons.map((btn, idx) => (
          <a
            key={idx}
            href={btn.href}
            className="bg-white bg-opacity-90 backdrop-blur-sm text-center rounded-full py-3 sm:py-4 px-6 sm:px-8 shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-800 font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-102 hover:translate-y-[-2px]"
          >
            {btn.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PatientInterface;
