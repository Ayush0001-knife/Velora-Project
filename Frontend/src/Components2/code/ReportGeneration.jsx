import React, { useState } from "react";
import {
  Settings,
  Code,
  Zap,
  Variable,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Info,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ReportGenerationTab() {
  const { t } = useTranslation();
  const [selectedModel, setSelectedModel] = useState("gpt4");
  const [temperature, setTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are a health and wellness AI assistant specialized in generating comprehensive reports based on user data and health metrics."
  );
  const [userPrompt, setUserPrompt] = useState(
    "Generate a personalized health report for the user based on their recent activity, nutrition data, and health goals. Include actionable recommendations."
  );
  const [variables, setVariables] = useState([
    {
      name: "fixed_suggestions",
      description: "Pre-defined health suggestions",
      example: "Drink 8 glasses of water daily",
    },
    {
      name: "recipes_list",
      description: "Personalized recipe recommendations",
      example: "Mediterranean Salmon Bowl, Quinoa Salad",
    },
    {
      name: "exercise_list",
      description: "Recommended exercises based on user profile",
      example: "Morning yoga, 30-min cardio",
    },
    {
      name: "health_metrics",
      description: "Current health data and measurements",
      example: "BMI: 24.5, Steps: 8,500/day",
    },
  ]);

  const addVariable = () => {
    setVariables([...variables, { name: "", description: "", example: "" }]);
  };

  const updateVariable = (index, field, value) => {
    const updated = variables.map((variable, i) =>
      i === index ? { ...variable, [field]: value } : variable
    );
    setVariables(updated);
  };

  const removeVariable = (index) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const resetConfiguration = () => {
    setSelectedModel("gpt4");
    setTemperature(0.7);
    setMaxTokens(2000);
    setTopP(1.0);
    setFrequencyPenalty(0.0);
    setPresencePenalty(0.0);
    setSystemPrompt(
      "You are a health and wellness AI assistant specialized in generating comprehensive reports based on user data and health metrics."
    );
    setUserPrompt(
      "Generate a personalized health report for the user based on their recent activity, nutrition data, and health goals. Include actionable recommendations."
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t("report_generation")}
          </h2>
        </div>
      </div>

      {/* Model Selection & Parameters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t("model_configuration")}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("ai_model")}
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="gpt4">GPT-4</option>
              <option value="gpt4-turbo">GPT-4 Turbo</option>
              <option value="gpt35-turbo">GPT-3.5 Turbo</option>
              <option value="claude-3">Claude 3</option>
              <option value="claude-sonnet">Claude Sonnet</option>
              <option value="gemini-pro">Gemini Pro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("temperature")} ({temperature})
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* Prompt Configuration */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <Code className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t("prompt_configuration")}
          </h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("system_prompt")}
            </label>
            <textarea
              rows={4}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
              placeholder="Define the AI's role and behavior..."
            />
            <p className="text-xs text-gray-500 mt-2">
              {t("system_prompt_description")}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("user_prompt")}
            </label>
            <textarea
              rows={6}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
              placeholder="Enter the prompt template with variables..."
            />
          </div>
        </div>
      </div>

      {/* Variable Management */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Variable className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t("variables")}
            </h3>
          </div>
          <button
            onClick={addVariable}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>{t("add_variable")}</span>
          </button>
        </div>

        <div className="space-y-4">
          {variables.map((variable, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Variable #{index + 1}
                  </span>
                </div>
                {variables.length > 1 && (
                  <button
                    onClick={() => removeVariable(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Variable Name
                  </label>
                  <input
                    type="text"
                    value={variable.name}
                    onChange={(e) =>
                      updateVariable(index, "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                    placeholder="variable_name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={variable.description}
                    onChange={(e) =>
                      updateVariable(index, "description", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Brief description of the variable"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Example Value
                  </label>
                  <input
                    type="text"
                    value={variable.example}
                    onChange={(e) =>
                      updateVariable(index, "example", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Example content for this variable"
                  />
                </div>
              </div>

              {variable.name && (
                <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-600">
                    Use{" "}
                    <code className="px-1 py-0.5 bg-gray-200 rounded font-mono">
                      {"{" + variable.name + "}"}
                    </code>{" "}
                    in your prompts
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Configuration Preview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Model Settings</h4>
            <div className="text-sm space-y-1 text-gray-600">
              <div>
                Model: <span className="font-mono">{selectedModel}</span>
              </div>
              <div>
                Temperature: <span className="font-mono">{temperature}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Available Variables</h4>
            <div className="flex flex-wrap gap-2">
              {variables
                .filter((v) => v.name)
                .map((variable, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm font-mono"
                  >
                    {"{" + variable.name + "}"}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={resetConfiguration}
          className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset Configuration</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
          <Save className="h-4 w-4" />
          <span>Save Configuration</span>
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
