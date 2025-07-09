import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Activity,
  Heart,
  FileText,
  Upload,
  Plus,
  ArrowLeft,
} from "lucide-react";

const ModernAddPatient = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [customFields, setCustomFields] = useState([]);

  const navigate = useNavigate();

  const steps = [
    { title: "Personal Info", icon: User },
    { title: "Health Metrics", icon: Heart },
    { title: "Activity & Lifestyle", icon: Activity },
    { title: "Medical Info", icon: FileText },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setCustomFields(updatedFields);

    // Update formData with custom fields
    const customFieldData = {};
    updatedFields.forEach((field) => {
      customFieldData[`customField_${field.label}`] = field.value;
    });
    setFormData((prev) => ({ ...prev, ...customFieldData }));
  };

  const addCustomField = () => {
    const fieldLabel = prompt("Enter field label:");
    if (fieldLabel) {
      setCustomFields([...customFields, { label: fieldLabel, value: "" }]);
    }
  };

  const PersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label="First Name"
          value={formData.firstName}
          onChange={(v) => handleInputChange("firstName", v)}
        />
        <FloatingInput
          label="Last Name"
          value={formData.lastName}
          onChange={(v) => handleInputChange("lastName", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectInput
          label="Sex"
          options={["Male", "Female", "Other"]}
          value={formData.sex}
          onChange={(v) => handleInputChange("sex", v)}
        />
        <FloatingInput
          label="Age"
          type="number"
          value={formData.age}
          onChange={(v) => handleInputChange("age", v)}
        />
        <FloatingInput
          label="Date of Birth"
          type="date"
          value={formData.dob}
          onChange={(v) => handleInputChange("dob", v)}
        />
      </div>
      <FloatingInput
        label="Contact Number"
        type="tel"
        value={formData.contact}
        onChange={(v) => handleInputChange("contact", v)}
      />
    </div>
  );

  const HealthMetricsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FloatingInput
          label="Height (cm)"
          type="number"
          value={formData.height}
          onChange={(v) => handleInputChange("height", v)}
        />
        <FloatingInput
          label="Weight (kg)"
          type="number"
          value={formData.weight}
          onChange={(v) => handleInputChange("weight", v)}
        />
        <FloatingInput
          label="Blood Type"
          value={formData.bloodType}
          onChange={(v) => handleInputChange("bloodType", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FloatingInput
          label="VO2 Max"
          type="number"
          value={formData.vo2Max}
          onChange={(v) => handleInputChange("vo2Max", v)}
        />
      </div>
    </div>
  );

  const ActivityStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label="Daily Steps"
          type="number"
          value={formData.steps}
          onChange={(v) => handleInputChange("steps", v)}
        />
        <FloatingInput
          label="Sleep Hours"
          type="number"
          value={formData.sleep}
          onChange={(v) => handleInputChange("sleep", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label="Exercise Hours/Week"
          type="number"
          value={formData.exercise}
          onChange={(v) => handleInputChange("exercise", v)}
        />
        <FloatingInput
          label="Sports Hours/Week"
          type="number"
          value={formData.sports}
          onChange={(v) => handleInputChange("sports", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label="Activity Level"
          options={["Sedentary", "Light", "Moderate", "Active", "Very Active"]}
          value={formData.activityLevel}
          onChange={(v) => handleInputChange("activityLevel", v)}
        />
        <SelectInput
          label="Diet Type"
          options={["Regular", "Vegetarian", "Vegan", "Keto", "Paleo", "Other"]}
          value={formData.dietType}
          onChange={(v) => handleInputChange("dietType", v)}
        />
      </div>
    </div>
  );

  const MedicalInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label="Allergies"
          value={formData.allergies}
          onChange={(v) => handleInputChange("allergies", v)}
        />
        <FloatingInput
          label="Current Medications"
          value={formData.medications}
          onChange={(v) => handleInputChange("medications", v)}
        />
      </div>
      <div className="space-y-4">
        <FloatingTextarea
          label="Medical History"
          value={formData.medicalHistory}
          onChange={(v) => handleInputChange("medicalHistory", v)}
        />
        <FloatingTextarea
          label="Additional Notes"
          value={formData.notes}
          onChange={(v) => handleInputChange("notes", v)}
        />
      </div>

      {/* Custom Fields Section */}
      <div className="space-y-4">
        {customFields.map((field, index) => (
          <FloatingInput
            key={index}
            label={field.label}
            value={field.value}
            onChange={(v) => handleCustomFieldChange(index, v)}
          />
        ))}
        <button
          onClick={addCustomField}
          className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Field
        </button>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pathology Reports
        </label>
        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer group">
          <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <p className="mt-2 text-sm text-gray-600">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-gray-500 mt-1">PDF files up to 10MB</p>
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept=".pdf"
          />
        </div>
      </div>
    </div>
  );

  const stepComponents = [
    PersonalInfoStep,
    HealthMetricsStep,
    ActivityStep,
    MedicalInfoStep,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Patient
          </h1>
          <p className="text-gray-600">Complete patient registration form</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      index <= activeStep
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        index < activeStep ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-16">
              {steps.map((step, index) => (
                <span
                  key={index}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    index <= activeStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {steps[activeStep].title}
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
          </div>

          {stepComponents[activeStep]()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeStep === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <div className="flex space-x-3">
              {activeStep < steps.length - 1 ? (
                <button
                  onClick={() =>
                    setActiveStep(Math.min(steps.length - 1, activeStep + 1))
                  }
                  className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Next
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </button>
              ) : (
                <button
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200"
                  onClick={() => {
                    console.log(formData);
                    navigate("/patient");
                  }}
                >
                  Add Patient
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingInput = ({ label, type = "text", value, onChange }) => (
  <div className="relative">
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      className="w-full h-14 px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200 peer"
    />
    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({ label, value, onChange }) => (
  <div className="relative">
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      rows={4}
      className="w-full px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200 peer resize-none"
    />
    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
      {label}
    </label>
  </div>
);

const SelectInput = ({ label, options, value, onChange }) => (
  <div className="relative">
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-14 px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200 appearance-none bg-white"
    >
      <option value="" disabled></option>
      {options.map((option, idx) => (
        <option key={idx} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500">
      {label}
    </label>
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <svg
        className="h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

export default ModernAddPatient;
