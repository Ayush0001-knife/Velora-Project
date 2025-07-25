import { BookOpen, Clock, MessageCircle, Star, Users } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: t("total_recipes"),
            value: "1,234",
            change: "+12%",
            icon: BookOpen,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: t("active_chats"),
            value: "89",
            change: "+5%",
            icon: MessageCircle,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: t("users_online"),
            value: "45",
            change: "+8%",
            icon: Users,
            color: "from-purple-500 to-pink-500",
          },
          {
            label: t("avg_rating"),
            value: "4.8",
            change: "+0.2",
            icon: Star,
            color: "from-yellow-500 to-orange-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
              >
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {t("recent_activity")}
        </h3>
        <div className="space-y-4">
          {[
            {
              action: t("new_recipe_added"),
              detail: t("chicken_parmesan_by_john_doe"),
              time: t("two_hours_ago"),
              type: "recipe",
            },
            {
              action: t("chat_session_completed"),
              detail: t("four_pillars_chat_with_jane_smith"),
              time: t("three_hours_ago"),
              type: "chat",
            },
            {
              action: t("recipe_updated"),
              detail: t("chocolate_cake_rating_changed"),
              time: t("five_hours_ago"),
              type: "recipe",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "recipe"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {activity.type === "recipe" ? (
                  <BookOpen size={16} />
                ) : (
                  <MessageCircle size={16} />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.detail}</p>
              </div>
              <div className="text-sm text-gray-500">
                <Clock size={14} className="inline mr-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
