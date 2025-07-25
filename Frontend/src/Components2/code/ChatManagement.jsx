import { Search, MessageCircle, Eye, MoreHorizontal } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const ChatManagement = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t("chats")}</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder={t("search_chats")}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="all">{t("all_types")}</option>
            <option value="nutritional">{t("nutritional_type")}</option>
            <option value="mental">{t("mental_health")}</option>
            <option value="exercise">{t("exercise_type")}</option>
            <option value="sleep">{t("sleep_type")}</option>
            <option value="general">{t("general_type")}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("chat_type")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("knowledge_base")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("ai_model")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("language_select")}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("status_label")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("actions_label")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 1,
                  type: t("nutritional_type"),
                  status: t("active_status"),
                },
                { id: 2, type: t("mental_health"), status: t("active_status") },
                { id: 3, type: t("exercise_type"), status: t("active_status") },
                { id: 4, type: t("sleep_type"), status: t("active_status") },
                { id: 5, type: t("general_type"), status: t("active_status") },
              ].map((chat) => (
                <tr
                  key={chat.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <MessageCircle size={16} className="text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {chat.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500">
                      <option value="kb1">{t("knowledge_base_1")}</option>
                      <option value="kb2">{t("knowledge_base_2")}</option>
                      <option value="kb3">{t("knowledge_base_3")}</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500">
                      <option value="gpt4">{t("gpt_4")}</option>
                      <option value="gpt35">{t("gpt_35")}</option>
                      <option value="claude">{t("claude_model")}</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500">
                      <option value="en">{t("english_lang")}</option>
                      <option value="es">{t("spanish_lang")}</option>
                      <option value="fr">{t("french_lang")}</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        chat.status === t("active_status")
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {chat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-full transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChatManagement;
