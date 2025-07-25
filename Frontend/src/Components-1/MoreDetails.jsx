import React from "react";
import { useTranslation } from "react-i18next";

const MoreDetails = ({ setMoreDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-3 bg-white border border-gray-600 shadow-md shadow-gray-400 rounded-[0.75rem] p-3 z-10">
      <div className="flex flex-col gap-1.5">
        <span className="text-base font-medium">{t("allergy_label")}</span>
        <textarea
          className="w-full min-h-[80px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder={t("enter_allergy_information")}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-base font-medium">{t("note_label")}</span>
        <textarea
          className="w-full min-h-[80px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder={t("enter_notes")}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-base font-medium">{t("additional_details")}</span>
        <textarea
          className="w-full min-h-[80px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder={t("enter_additional_details")}
        />
      </div>
      <div className="flex justify-center mt-auto">
        <i
          className="ri-arrow-down-wide-line text-xl text-gray-600 hover:text-gray-800 cursor-pointer transition-transform hover:translate-y-[-2px]"
          onClick={() => setMoreDetails(false)}
        ></i>
      </div>
    </div>
  );
};

export default MoreDetails;
