import { useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

const DoctorNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const pillarKeys = ["patients", "reports", "prevention", "chat"];
  const location = useLocation();
  const [activePillar, setActivePillar] = useState(() => {
    // Set initial active tab based on current route
    if (location.pathname === '/chat') return 'chat';
    if (location.pathname === '/home') return 'patients';
    return 'patients';
  });

  const handlePillarChange = (key) => {
    setActivePillar(key);
    if (key === 'chat') {
      navigate('/chat');
    } else if (key === 'patients') {
      navigate('/home');
    }
    // Add other navigation paths as needed
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
  };

  return (
    <nav className="w-[90%] mx-auto mt-4 h-20 px-5 rounded-3xl flex items-center justify-between bg-slate-900 shadow-2xl border border-slate-700">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/velora-final-03.png"
          alt="Velora Logo"
          className="h-10 object-contain"
        />
      </div>

      {/* Navigation Pillars */}
      <div className="flex justify-between items-center h-[70%] w-[45%] rounded-lg bg-slate-800/50 backdrop-blur-lg p-1 border border-slate-700">
        {pillarKeys.map((key) => (
          <div
            key={key}
            className={`h-full flex-1 flex items-center justify-center rounded-md cursor-pointer transition-all duration-300
            ${
              activePillar === key
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-300 hover:bg-slate-700/50"
            }`}
            onClick={() => handlePillarChange(key)}
          >
            <span className="capitalize font-medium">{t(key)}</span>
          </div>
        ))}
      </div>

      {/* Profile Button */}
      <div className="flex items-center">
        <button className="group flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer rounded-lg px-4 py-2 transition-all hover:bg-slate-800 hover:border-slate-700">
          <span className="font-medium">{t("profile")}</span>
          <i className="ri-account-circle-line text-2xl group-hover:text-cyan-400 transition-colors"></i>
        </button>
      </div>

      {/* Language Selector */}
      <div className="relative group">
        <select
          className="appearance-none bg-slate-800 text-slate-300 px-4 py-2 pr-8 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={handleLanguageChange}
          defaultValue={localStorage.getItem("lang") || "en"}
        >
          <option value="en" className="bg-slate-800">
            English
          </option>
          <option value="it" className="bg-slate-800">
            Italian
          </option>
          {/* Add more languages if needed */}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-300">
          <svg
            className="fill-current h-4 w-4 group-hover:text-cyan-400 transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
