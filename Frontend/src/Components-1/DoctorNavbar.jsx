import { useState } from "react";

const DoctorNavbar = () => {
  const [activePillar, setActivePillar] = useState("patient");

  const handlePillarChange = (e) => {
    setActivePillar(e);
  };

  return (
    <nav className="w-[90%] mx-auto mt-4 h-20 px-5 rounded-3xl flex items-center justify-between  bg-slate-900 shadow-2xl border border-slate-700 ">
      {/* Logo and Title */}
      <div className="flex items-center gap-4 cursor-pointer group">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
          <img
            src="/Logo.png"
            alt="Velora AI Logo"
            className="relative h-14 w-14 object-contain rounded-full border-2 border-slate-700"
          />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Velora AI
        </span>
      </div>

      {/* Navigation Menu */}
      <div className="flex justify-between items-center h-[70%] w-[45%] rounded-lg bg-slate-800/50 backdrop-blur-lg p-1 border border-slate-700">
        {["patients", "reports", "prevention", "chat"].map((pillar) => (
          <div
            key={pillar}
            className={`h-full flex-1 flex items-center justify-center rounded-md cursor-pointer transition-all duration-300
              ${
                activePillar === pillar
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-300 hover:bg-slate-700/50"
              }`}
            onClick={() => handlePillarChange(pillar)}
          >
            <span className="capitalize font-medium">{pillar}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6 items-center">
        <button className="group flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer rounded-lg px-4 py-2 transition-all hover:bg-slate-800  hover:border-slate-700">
          <span className="font-medium">History</span>
          <i className="ri-chat-history-line text-2xl group-hover:text-cyan-400 transition-colors"></i>
        </button>
        <button className="group flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer rounded-lg px-4 py-2 transition-all hover:bg-slate-800  hover:border-slate-700">
          <span className="font-medium">Profile</span>
          <i className="ri-account-circle-line text-2xl group-hover:text-cyan-400 transition-colors"></i>
        </button>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
