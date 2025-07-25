import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Activity,
  Settings,
  Bell,
  User,
  ChevronDown,
  Eye,
  Save,
  X,
  Calendar,
  FolderGit,
} from "lucide-react";
import ReportGenerationTab from "../Components2/code/ReportGeneration";
import Dashboard from "../Components2/code/Dashboard";
import ChatManagement from "../Components2/code/ChatManagement";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Chicken Parmesan",
      created: "2024-01-15",
    },
    {
      id: 2,
      title: "Chocolate Cake",
      created: "2024-01-20",
    },
    {
      id: 3,
      title: "Caesar Salad",
      created: "2024-01-25",
    },
  ]);

  const { t } = useTranslation();

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || recipe.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleRecipeAction = (action, recipe = null) => {
    if (action === "add" || action === "edit") {
      setSelectedRecipe(recipe);
      setShowRecipeModal(true);
    } else if (action === "delete" && recipe) {
      setRecipes(recipes.filter((r) => r.id !== recipe.id));
    }
  };

  const saveRecipe = (recipeData) => {
    if (selectedRecipe) {
      setRecipes(
        recipes.map((r) =>
          r.id === selectedRecipe.id ? { ...r, ...recipeData } : r
        )
      );
    } else {
      setRecipes([
        ...recipes,
        {
          ...recipeData,
          id: Date.now(),
          created: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setShowRecipeModal(false);
    setSelectedRecipe(null);
  };

  const RecipeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {selectedRecipe ? "Edit Recipe" : "Add New Recipe"}
          </h2>
          <button
            onClick={() => setShowRecipeModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Title
              </label>
              <input
                type="text"
                defaultValue={selectedRecipe?.title || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter recipe title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                defaultValue={selectedRecipe?.category || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                defaultValue={selectedRecipe?.difficulty || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                defaultValue={selectedRecipe?.status || "draft"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              defaultValue={selectedRecipe?.description || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter recipe description"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowRecipeModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                saveRecipe({ title: "New Recipe", status: "draft" })
              }
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <Save size={16} className="inline mr-2" />
              Save Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {t("admin_dashboard")}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Settings size={20} />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-xl shadow-sm">
          {[
            { id: "dashboard", label: t("dashboard"), icon: Activity },
            { id: "chats", label: t("chats"), icon: MessageCircle },
            { id: "recipes", label: t("recipes"), icon: BookOpen },
            { id: "report", label: t("report"), icon: FolderGit },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={18} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Overview */}
        {activeTab === "dashboard" && <Dashboard />}

        {/* Chat Management */}
        {activeTab === "chats" && <ChatManagement />}

        {/* Recipe Management */}
        {activeTab === "recipes" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {t("recipe_management")}
              </h2>
              <button
                onClick={() => handleRecipeAction("add")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Plus size={16} className="inline mr-2" />
                {t("add_recipe")}
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder={t("search_recipes")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">{t("all_status")}</option>
                  <option value="published">{t("published_status")}</option>
                  <option value="draft">{t("draft_status")}</option>
                </select>
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                    <BookOpen size={48} className="text-white opacity-50" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {recipe.title}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        <Calendar size={14} className="inline mr-1" />
                        {recipe.created}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRecipeAction("edit", recipe)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleRecipeAction("delete", recipe)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">{t("no_recipes_found")}</p>
              </div>
            )}
          </div>
        )}

        {/* Report Generation */}
        {activeTab === "report" && <ReportGenerationTab />}
      </div>

      {/* Recipe Modal */}
      {showRecipeModal && <RecipeModal />}
    </div>
  );
}
