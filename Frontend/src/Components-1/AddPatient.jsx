import React, { useEffect, useState } from "react";
import {
  User,
  Heart,
  Activity,
  FileText,
  Upload,
  Plus,
  ArrowLeft,
  Dna,
  Brain,
  Apple,
  FlaskConical,
  Target,
  Smartphone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { OverlayLoader } from "./Loader";

import { anthropometrics, anthropometricsPut, bloodTests, bloodTestsPut, cardiorespiratory, cardiorespiratoryPut, demographics, demographicsPut, exercise, exercisePut, goals, medicalHistory, medicalHistoryPut, mentalHealth, mentalHealthPut, nutrition, nutritionPut, reportss } from "../services/api";

const AddPatient = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [patientId, setPatientId] = useState(null);
  const [anthropometricsId, setAnthropometricsId] = useState(null);
  const [vitalId, setVitalId] = useState(null);
  const [nutritionId, setNutritionId] = useState(null);
  const [bloodTestsId, setBloodTestsId] = useState(null);
  const [mentalHealthId, setMentalHealthId] = useState(null);
  const [exerciseId, setExerciseId] = useState(null);
  const [medicalHistoryId, setMedicalHistoryId] = useState(null);
  const [kbs, setKbs] = useState(null);

  const [loader, setLoader] = useState({
    isVisible: false,
    variant: "ripple",
    color: "green",
    size: "xl",
    text: "Loading...",
  });

  const navigate = useNavigate();

  const [demographicsFormData, setDemographicsFormData] = useState({});
  const [submittedDemographicsData, setSubmittedDemographicsData] = useState(null);

  const [emailError, setEmailError] = useState("");


  const [anthropometricsFormData, setAnthropometricsFormData] = useState({});
  const [submittedAnthropometricsData, setSubmittedAnthropometricsData] = useState(null);

  const [cardiorespiratoryFormData, setCardiorespiratoryFormData] = useState({});
  const [submittedCardiorespiratoryData, setSubmittedCardiorespiratoryData] = useState(null);

  const [nutritionFormData, setNutritionFormData] = useState({});
  const [submittedNutritionData, setSubmittedNutritionData] = useState(null);

  const [bloodTestsFormData, setBloodTestsFormData] = useState({});
  const [submittedBloodTestsData, setSubmittedBloodTestsData] = useState(null);

  const [mentalHealthFormData, setMentalHealthFormData] = useState({});
  const [submittedMentalHealthData, setSubmittedMentalHealthData] = useState(null);

  const [exerciseFormData, setExerciseFormData] = useState({});
  const [submittedExerciseData, setSubmittedExerciseData] = useState(null);

  const [medicalHistoryFormData, setMedicalHistoryFormData] = useState({});
  const [submittedMedicalHistoryData, setSubmittedMedicalHistoryData] = useState(null);

  const [reports, setReports] = useState([]); // Array of File objects
  const [filesMeta, setFilesMeta] = useState({
    analysis_status: "Active",
    source_of_data: "PDF",
    is_abnormal: false,
  });


  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return "Email is required";
    }

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return ""; // No error
  };




  const { t } = useTranslation();

  const steps = [
    { title: t("demographics"), icon: User },
    { title: t("anthropometrics"), icon: Activity },
    { title: t("cardiorespiratory"), icon: Heart },
    { title: t("nutrition"), icon: Apple },
    { title: t("blood_tests"), icon: FlaskConical },
    { title: t("mental_health"), icon: Brain },
    { title: t("exercise"), icon: Activity },
    { title: t("medical_history"), icon: FileText },
    { title: t("medical_files"), icon: Target },
  ];

  const handleDemographicsInputChange = (field, value) => {
    setDemographicsFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Real-time email validation
    if (field === 'email') {
      const error = validateEmail(value);
      setEmailError(error);
    }
  };


  const handleAnthropometricsInputChange = (field, value) => {
    setAnthropometricsFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const weight = parseFloat(anthropometricsFormData.weight_kg);
    const heightCm = parseFloat(anthropometricsFormData.height_cm);

    if (weight > 0 && heightCm > 0) {
      const heightInMeters = heightCm / 100;
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

      setAnthropometricsFormData((prev) => ({
        ...prev,
        bmi: calculatedBmi,
      }));
    } else {
      setAnthropometricsFormData((prev) => ({
        ...prev,
        bmi: "",
      }));
    }
  }, [anthropometricsFormData.weight_kg, anthropometricsFormData.height_cm]);


  const handleCardiorespiratoryInputChange = (field, value) => {
    setCardiorespiratoryFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNutritionInputChange = (field, value) => {
    setNutritionFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBloodTestsInputChange = (field, value) => {
    setBloodTestsFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMentalHealthInputChange = (field, value) => {
    setMentalHealthFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExerciseInputChange = (field, value) => {
    setExerciseFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMedicalHistoryInputChange = (field, value) => {
    setMedicalHistoryFormData((prev) => ({ ...prev, [field]: value }));
  };



  const handleDemographicsApi = async () => {
    console.log("Demographics API");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(demographicsFormData.email);

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
      return; // 🔁 Don't proceed with API
    } else {
      setEmailError(""); // Clear previous error
    }

    const normalizedData = {
      ...demographicsFormData,
      age: Number(demographicsFormData.age),
      assigned_doctor_id: Number(demographicsFormData.assigned_doctor_id),
      zip_code: String(demographicsFormData.zip_code),
    };

    try {
      if (submittedDemographicsData === null) {
        const response = await demographics(normalizedData);
        console.log("POST Response:", response.message);
        setPatientId(response.data.patient.id);
        setKbs(response.data.kb_id);
        setSubmittedDemographicsData(normalizedData);
      } else if (
        JSON.stringify(normalizedData) !==
        JSON.stringify(submittedDemographicsData)
      ) {
        const response = await demographicsPut(normalizedData, patientId);
        console.log("PUT Response:", response.data);
        setSubmittedDemographicsData(normalizedData);
      } else {
        console.log("No changes in demographics — skipping API call.");
      }
    } catch (error) {
      console.error(
        "Demographics API Error:",
        error.response?.data || error.message
      );
    }
  };



  const handleAnthropometricsApi = async () => {
    console.log("Anthropometrics API");

    const normalizedData = {
      ...anthropometricsFormData
      // Add more conversions if needed
    };

    try {
      // First-time submission: POST
      if (submittedAnthropometricsData === null) {
        const response = await anthropometrics(normalizedData, patientId); // POST
        console.log("POST Response:", response.message);
        console.log("Anthropometrics ID:", response.record.anthropometric_id)
        setAnthropometricsId(response.record.anthropometric_id);

        setSubmittedAnthropometricsData(normalizedData); // Save submitted state
      }

      // Data has changed: PUT
      else if (JSON.stringify(normalizedData) !== JSON.stringify(submittedAnthropometricsData)) {
        console.log("PUT Data:", normalizedData);
        console.log("PUT Patient ID:", anthropometricsId);
        const response = await anthropometricsPut(normalizedData, anthropometricsId);

        console.log("PUT Response:", response.message);

        setSubmittedAnthropometricsData(normalizedData); // Save updated state
      }

      // No change: Skip API
      else {
        console.log("No changes in anthropometrics — skipping API call.");
      }
    } catch (error) {
      console.error("Anthropometrics API Error:", error.response?.data || error.message);
    }
  };

  const handleCardiorespiratoryApi = async () => {
    console.log("Cardiorespiratory API");

    const normalizedData = {
      ...cardiorespiratoryFormData
      // Add more conversions if needed
    };

    try {
      // First-time submission: POST
      if (submittedCardiorespiratoryData === null) {
        const response = await cardiorespiratory(normalizedData, patientId); // POST
        console.log("POST Response:", response.message);
        console.log("Cardiorespiratory ID:", response.data.vital_id)
        setVitalId(response.data.vital_id);

        setSubmittedCardiorespiratoryData(normalizedData); // Save submitted state
      }

      // Data has changed: PUT
      else if (JSON.stringify(normalizedData) !== JSON.stringify(submittedCardiorespiratoryData)) {
        console.log("PUT Data:", normalizedData);
        console.log("PUT Patient ID:", vitalId);
        const response = await cardiorespiratoryPut(normalizedData, vitalId);

        console.log("PUT Response:", response.message);

        setSubmittedCardiorespiratoryData(normalizedData); // Save updated state
      }

      // No change: Skip API
      else {
        console.log("No changes in cardiorespiratory — skipping API call.");
      }
    } catch (error) {
      console.error("Cardiorespiratory API Error:", error.response?.data || error.message);
    }
  };


  const handleNutritionApi = async () => {
    console.log("Nutrition API");

    const normalizedData = {
      ...nutritionFormData
      // Add more conversions if needed
    };

    try {
      // First-time submission: POST
      if (submittedNutritionData === null) {
        const response = await nutrition(normalizedData, patientId); // POST
        console.log("POST Response:", response.message);
        console.log("Nutrition ID:", response.data.nutrition_id)
        setNutritionId(response.data.nutrition_id);

        setSubmittedNutritionData(normalizedData); // Save submitted state
      }

      // Data has changed: PUT
      else if (JSON.stringify(normalizedData) !== JSON.stringify(submittedNutritionData)) {
        console.log("PUT Data:", normalizedData);
        const response = await nutritionPut(normalizedData, nutritionId);

        console.log("PUT Response:", response.message);

        setSubmittedNutritionData(normalizedData); // Save updated state
      }

      // No change: Skip API
      else {
        console.log("No changes in nutrition — skipping API call.");
      }
    } catch (error) {
      console.error("Nutrition API Error:", error.response?.data || error.message);
    }
  };

  const handleBloodTestsApi = async () => {
    console.log("Blood Tests API");

    const normalizedData = {
      ...bloodTestsFormData
      // Add more conversions if needed
    };

    try {
      // First-time submission: POST
      if (submittedBloodTestsData === null) {
        const response = await bloodTests(normalizedData, patientId); // POST
        console.log("POST Response:", response.message);
        console.log("Blood Tests ID:", response.data.blood_tests_id)
        setBloodTestsId(response.data.blood_tests_id);

        setSubmittedBloodTestsData(normalizedData); // Save submitted state
      }

      // Data has changed: PUT
      else if (JSON.stringify(normalizedData) !== JSON.stringify(submittedBloodTestsData)) {
        console.log("PUT Data:", normalizedData);
        const response = await bloodTestsPut(normalizedData, bloodTestsId);

        console.log("PUT Response:", response.message);

        setSubmittedBloodTestsData(normalizedData); // Save updated state
      }

      // No change: Skip API
      else {
        console.log("No changes in blood tests — skipping API call.");
      }
    } catch (error) {
      console.error("Blood Tests API Error:", error.response?.data || error.message);
    }
  };

  const handleMentalHealthApi = async () => {
    console.log("Mental Health API");

    const normalizedData = {
      ...mentalHealthFormData
      // Add more conversions if needed
    };

    try {
      // First-time submission: POST
      if (submittedMentalHealthData === null) {
        const response = await mentalHealth(normalizedData, patientId); // POST
        console.log("POST Response:", response.message);
        console.log("Mental Health ID:", response.data.mental_health_id)
        setMentalHealthId(response.data.mental_health_id);

        setSubmittedMentalHealthData(normalizedData); // Save submitted state
      }

      // Data has changed: PUT
      else if (JSON.stringify(normalizedData) !== JSON.stringify(submittedMentalHealthData)) {
        console.log("PUT Data:", normalizedData);
        const response = await mentalHealthPut(normalizedData, mentalHealthId);

        console.log("PUT Response:", response.message);

        setSubmittedMentalHealthData(normalizedData); // Save updated state
      }

      // No change: Skip API
      else {
        console.log("No changes in mental health — skipping API call.");
      }
    } catch (error) {
      console.error("Mental Health API Error:", error.response?.data || error.message);
    }
  };

  const handleExerciseApi = async () => {
    console.log("Exercise API");

    const normalizedData = {
      ...exerciseFormData
      // Add more conversions if needed
    };

    try {
      // First-time submission: POST
      if (submittedExerciseData === null) {
        const response = await exercise(normalizedData, patientId); // POST
        console.log("POST Response:", response.message);
        console.log("Exercise ID:", response.data.exercise_id)
        setExerciseId(response.data.exercise_id);

        setSubmittedExerciseData(normalizedData); // Save submitted state
      }

      // Data has changed: PUT
      else if (JSON.stringify(normalizedData) !== JSON.stringify(submittedExerciseData)) {
        console.log("PUT Data:", normalizedData);
        const response = await exercisePut(normalizedData, exerciseId);

        console.log("PUT Response:", response.message);

        setSubmittedExerciseData(normalizedData); // Save updated state
      }

      // No change: Skip API
      else {
        console.log("No changes in exercise — skipping API call.");
      }
    } catch (error) {
      console.error("Exercise API Error:", error.response?.data || error.message);
    }
  };

  const handleMedicalHistoryApi = async () => {
    console.log("Medical History API");

    const normalizedData = {
      ...medicalHistoryFormData
      // Add more conversions if needed
    };

    try {
      // First-time submission: POST
      if (submittedMedicalHistoryData === null) {
        const response = await medicalHistory(normalizedData, patientId); // POST
        console.log("POST Response:", response.message);
        console.log("Medical History ID:", response.data.medical_history_id)
        setMedicalHistoryId(response.data.medical_history_id);

        setSubmittedMedicalHistoryData(normalizedData); // Save submitted state
      }

      // Data has changed: PUT
      else if (JSON.stringify(normalizedData) !== JSON.stringify(submittedMedicalHistoryData)) {
        console.log("PUT Data:", normalizedData);
        const response = await medicalHistoryPut(normalizedData, medicalHistoryId);

        console.log("PUT Response:", response.message);

        setSubmittedMedicalHistoryData(normalizedData); // Save updated state
      }

      // No change: Skip API
      else {
        console.log("No changes in medical history — skipping API call.");
      }
    } catch (error) {
      console.error("Exercise API Error:", error.response?.data || error.message);
    }
  };


  // To log updated kbs
  useEffect(() => {
    if (kbs) {
      console.log("Updated KbS id:", kbs);
    }
  }, [kbs]);


  const handleFilesAPi = async () => {
    console.log("Reports array:", reports);


    const formData = new FormData();
    formData.append("patient_id", patientId);
    formData.append("analysis_status", filesMeta.analysis_status);
    formData.append("source_of_data", filesMeta.source_of_data);
    formData.append("is_abnormal", filesMeta.is_abnormal === "true" || filesMeta.is_abnormal === true);
    formData.append("patient_age_at_record", parseInt(demographicsFormData.age));

    // Append multiple files
    reports.forEach((report) => {
      formData.append("patient_analysis_report", report);
    });
    console.log("Form data:", formData);

    try {
      const data = await reportss(formData);
      console.log("Response:", data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  const finalReportApi = async () => {
    const authorization = localStorage.getItem("authorization");
    const demographicsData = JSON.parse(localStorage.getItem("demographicsData"));
    console.log(demographicsData.data)
    const kb_id = demographicsData.data?.kb_id;
    const formData = new FormData();
    formData.append("kb_id",kb_id);

    const response = await axios.post(`http://localhost:9380/v1/patient_analysis/patients/${patientId}/generate-final-report`,
      formData,
      {
        headers: {
          Authorization: `${authorization}`
        }
      })
    console.log(response);
  }

  const handleAddPatientAPi = async () => {
    try {
      // Show loader
      setLoader({
        isVisible: true,
        variant: "dots",     // or 'spinner', 'dots', 'bars'
        color: "green",         // or any: green, red, purple etc.
        size: "md",
        text: "Uploading files and generating report...",
        showText: true
      });

      // Perform API tasks
      await handleFilesAPi();
      await finalReportApi();

    } catch (error) {
      console.error("API error occurred:", error);
      alert("An error occurred during submission. Please try again.");
    } finally {
      // Hide loader
      setLoader(prev => ({ ...prev, isVisible: false }));

      // Navigate home regardless of result
      navigate("/home");
    }
  };



  // Demographics & Identity
  const DemographicsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("first_name")}
          value={demographicsFormData.first_name}
          onChange={(v) => handleDemographicsInputChange("first_name", v)}
          required
        />
        <FloatingInput
          label={t("last_name")}
          value={demographicsFormData.last_name}
          onChange={(v) => handleDemographicsInputChange("last_name", v)}

        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`space-y-1 ${emailError ? 'email-error-container' : ''}`}>
          <FloatingInput
            label={t("email")}
            type="email"
            value={demographicsFormData.email || ""}
            onChange={(v) => handleDemographicsInputChange("email", v)}
            required
          />
          {emailError && (
            <p className="text-sm text-red-600">{emailError}</p>
          )}
        </div>

        <FloatingInput
          label={t("age")}
          type="number"
          value={demographicsFormData.age}
          onChange={(v) => handleDemographicsInputChange("age", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={t("gender")}
          options={[t("male"), t("female"), t("non_binary"), t("prefer_not_to_say")]}
          value={demographicsFormData.gender}
          onChange={(v) => handleDemographicsInputChange("gender", v)}
          required
        />
        <FloatingInput
          label={t("date_of_birth")}
          type="date"
          value={demographicsFormData.date_of_birth}
          onChange={(v) => handleDemographicsInputChange("date_of_birth", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("phone")}
          type="tel"
          value={demographicsFormData.phone}
          onChange={(v) => handleDemographicsInputChange("phone", v)}
          required
        />
        <FloatingInput
          label={t("alternative_phone")}
          type="tel"
          value={demographicsFormData.alternative_phone}
          onChange={(v) => handleDemographicsInputChange("alternative_phone", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("address")}
          value={demographicsFormData.address}
          onChange={(v) => handleDemographicsInputChange("address", v)}
          required
        />
        <FloatingInput
          label={t("state")}
          value={demographicsFormData.state}
          onChange={(v) => handleDemographicsInputChange("state", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("country")}
          value={demographicsFormData.country}
          onChange={(v) => handleDemographicsInputChange("country", v)}
          required
        />
        <FloatingInput
          label={t("zip_code")}
          type="number"
          value={demographicsFormData.zip_code}
          onChange={(v) => handleDemographicsInputChange("zip_code", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={t("status")}
          options={[t("active"), t("inactive")]}
          value={demographicsFormData.status}
          onChange={(v) => handleDemographicsInputChange("status", v)}
          required
        />

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={t("gender_identity")}
          options={[
            t("male"),
            t("female"),
            t("non_binary"),
            t("transgender"),
            t("prefer_not_to_say"),
            t("other"),
          ]}
          value={demographicsFormData.gender_identity}
          onChange={(v) => handleDemographicsInputChange("gender_identity", v)}
          required
        />
        <SelectInput
          label={t("ethnicity")}
          options={[
            t("white"),
            t("black_african"),
            t("asian"),
            t("hispanic_latino"),
            t("middle_eastern"),
            t("pacific_islander"),
            t("indigenous"),
            t("mixed"),
            t("other"),
          ]}
          value={demographicsFormData.ethnicity}
          onChange={(v) => handleDemographicsInputChange("ethnicity", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("country_of_residence")}
          value={demographicsFormData.country_of_residence}
          onChange={(v) =>
            handleDemographicsInputChange("country_of_residence", v)
          }
          required
        />
        <FloatingInput
          label={t("occupation")}
          value={demographicsFormData.occupation}
          onChange={(v) => handleDemographicsInputChange("occupation", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <SelectInput
          label={t("socioeconomic_indicator")}
          options={[
            t("high_school_or_less"),
            t("some_college"),
            t("bachelors_degree"),
            t("graduate_degree"),
            t("low_income"),
            t("middle_income"),
            t("high_income"),
            t("prefer_not_to_say"),
          ]}
          value={demographicsFormData.socioeconomic_indicator}
          onChange={(v) =>
            handleDemographicsInputChange("socioeconomic_indicator", v)
          }
          required
        />
      </div>
    </div>
  );

  const isFormValid = () => {
    // Check if email is valid (no error and not empty)
    const emailValid = !emailError && demographicsFormData.email;

    // Only check the required fields: first_name, last_name, age, and email
    const requiredFields = [
      'first_name', 'age', 'email'
    ];

    const allRequiredFieldsFilled = requiredFields.every(
      field => demographicsFormData[field]
    );

    return emailValid && allRequiredFieldsFilled;
  };

  // Anthropometrics & Body Composition
  const AnthropometricsStep = () => {

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FloatingInput
            label={t("weight_kg")}
            type="number"
            value={anthropometricsFormData.weight_kg}
            onChange={(v) => handleAnthropometricsInputChange("weight_kg", v)}
            required
          />
          <FloatingInput
            label={t("height_cm")}
            type="number"
            value={anthropometricsFormData.height_cm}
            onChange={(v) => handleAnthropometricsInputChange("height_cm", v)}
            required
          />
          <FloatingInput
            label={t("bmi")}
            type="number"
            value={anthropometricsFormData.bmi}
            disabled
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FloatingInput
            label={t("waist_circumference_cm")}
            type="number"
            value={anthropometricsFormData.waist_circumference_cm}
            onChange={(v) =>
              handleAnthropometricsInputChange("waist_circumference_cm", v)
            }
            required
          />
          <FloatingInput
            label={t("hip_circumference_cm")}
            type="number"
            value={anthropometricsFormData.hip_circumference_cm}
            onChange={(v) =>
              handleAnthropometricsInputChange("hip_circumference_cm", v)
            }
            required
          />
          <FloatingInput
            label={t("waist_to_hip_ratio")}
            type="number"
            value={anthropometricsFormData.waist_to_hip_ratio}
            onChange={(v) =>
              handleAnthropometricsInputChange("waist_to_hip_ratio", v)
            }
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FloatingInput
            label={t("body_fat_percent")}
            type="number"
            value={anthropometricsFormData.body_fat_percent}
            onChange={(v) =>
              handleAnthropometricsInputChange("body_fat_percent", v)
            }
            required
          />
          <FloatingInput
            label={t("muscle_mass_percent")}
            type="number"
            value={anthropometricsFormData.muscle_mass_percent}
            onChange={(v) =>
              handleAnthropometricsInputChange("muscle_mass_percent", v)
            }
            required
          />
          <FloatingInput
            label={t("visceral_fat_level")}
            type="number"
            value={anthropometricsFormData.visceral_fat_level}
            onChange={(v) =>
              handleAnthropometricsInputChange("visceral_fat_level", v)
            }
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingInput
            label={t("bone_mass")}
            type="number"
            value={anthropometricsFormData.bone_mass}
            onChange={(v) =>
              handleAnthropometricsInputChange("bone_mass", v)
            }
            required
          />
          <FloatingInput
            label={t("hydration_status")}
            type="number"
            value={anthropometricsFormData.hydration_status}
            onChange={(v) =>
              handleAnthropometricsInputChange("hydration_status", v)
            }
            required
          />
        </div>
      </div>
    );
  };

  // Cardiorespiratory Fitness & Vitals
  const CardioRespiratoryStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("resting_heart_rate")}
          type="number"
          min={1}
          value={cardiorespiratoryFormData.resting_heart_rate_bpm || 0}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("resting_heart_rate_bpm", parseInt(v))
          }
        />
        <FloatingInput
          label={t("blood_pressure_systolic")}
          type="number"
          min={1}
          value={cardiorespiratoryFormData.blood_pressure_systolic || 0}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("blood_pressure_systolic", parseInt(v))
          }
        />
        <FloatingInput
          label={t("blood_pressure_diastolic")}
          type="number"
          min={1}
          value={cardiorespiratoryFormData.blood_pressure_diastolic || 0}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("blood_pressure_diastolic", parseInt(v))
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("vo2_max")}
          type="number"
          min={1}
          value={cardiorespiratoryFormData.vo2_max || 0}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("vo2_max", parseInt(v))
          }
        />
        <FloatingInput
          label={t("oxygen_saturation")}
          type="number"
          min={1}
          value={cardiorespiratoryFormData.oxygen_saturation_spo2 || 0}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("oxygen_saturation_spo2", parseInt(v))
          }
        />
        <FloatingInput
          label={t("heart_rate_variability")}
          type="number"
          min={1}
          value={cardiorespiratoryFormData.heart_rate_variability_hrv || 0}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("heart_rate_variability_hrv", parseInt(v))
          }
        />
      </div>
    </div>
  );


  // Nutrition & Metabolic Health
  const NutritionStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("meals_per_week_home")}
          type="number"
          min={1}
          value={nutritionFormData.meals_prepared_at_home_per_week}
          onChange={(v) =>
            handleNutritionInputChange("meals_prepared_at_home_per_week", parseFloat(v))
          }
          required
        />
        <FloatingInput
          label={t("daily_fruits_vegetables")}
          type="number"
          min={1}
          value={nutritionFormData.daily_servings_fruits_vegetables}
          onChange={(v) =>
            handleNutritionInputChange("daily_servings_fruits_vegetables", parseFloat(v))
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("weekly_processed_foods")}
          type="number"
          min={1}
          value={nutritionFormData.weekly_servings_ultra_processed_foods}
          onChange={(v) =>
            handleNutritionInputChange("weekly_servings_ultra_processed_foods", parseFloat(v))
          }
          required
        />
        <FloatingInput
          label={t("water_intake_daily")}
          type="number"
          min={1}
          value={nutritionFormData.water_intake_liters_per_day}
          onChange={(v) =>
            handleNutritionInputChange("water_intake_liters_per_day", parseFloat(v))
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("alcohol_intake_weekly")}
          type="number"
          min={1}
          value={nutritionFormData.alcohol_intake_drinks_per_week}
          onChange={(v) =>
            handleNutritionInputChange("alcohol_intake_drinks_per_week", parseFloat(v))
          }
          required
        />
        <FloatingInput
          label={t("vitamin_d_level")}
          type="number"
          min={1}
          value={nutritionFormData.vitamin_d_blood_level}
          onChange={(v) =>
            handleNutritionInputChange("vitamin_d_blood_level", parseFloat(v))
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("food_allergies")}
          value={nutritionFormData.food_allergies_intolerances}
          onChange={(v) =>
            handleNutritionInputChange("food_allergies_intolerances", v)
          }
          required
        />
        <FloatingInput
          label={t("food_dislikes")}
          value={nutritionFormData.dislikes}
          onChange={(v) => handleNutritionInputChange("dislikes", v)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <SelectInput
          label={t("special_diet")}
          options={[
            t("none"),
            t("vegan"),
            t("vegetarian"),
            t("pescatarian"),
            t("keto"),
            t("paleo"),
            t("gluten_free"),
            t("dairy_free"),
            t("mediterranean"),
            t("other"),
          ]}
          value={nutritionFormData.special_diet}
          onChange={(v) => handleNutritionInputChange("special_diet", v)}
          required
        />
      </div>
    </div>
  );


  // Blood Tests & Biomarkers
  const BloodTestsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("test_date")}
          type="date"
          value={bloodTestsFormData.test_date}
          onChange={(v) => handleBloodTestsInputChange("test_date", v)}
          required
        />
        <FloatingInput
          label={t("fasting_glucose")}
          type="number"
          min={1}
          value={bloodTestsFormData.fasting_glucose}
          onChange={(v) => handleBloodTestsInputChange("fasting_glucose", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("hba1c")}
          type="number"
          min={1}
          step="0.1"
          value={bloodTestsFormData.hba1c}
          onChange={(v) => handleBloodTestsInputChange("hba1c", v)}
          required
        />
        <FloatingInput
          label={t("total_cholesterol")}
          type="number"
          min={1}
          value={bloodTestsFormData.total_cholesterol}
          onChange={(v) => handleBloodTestsInputChange("total_cholesterol", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("ldl")}
          type="number"
          min={1}
          value={bloodTestsFormData.ldl}
          onChange={(v) => handleBloodTestsInputChange("ldl", v)}
          required
        />
        <FloatingInput
          label={t("hdl")}
          type="number"
          min={1}
          value={bloodTestsFormData.hdl}
          onChange={(v) => handleBloodTestsInputChange("hdl", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("triglycerides")}
          type="number"
          min={1}
          value={bloodTestsFormData.triglycerides}
          onChange={(v) => handleBloodTestsInputChange("triglycerides", v)}
          required
        />
        <FloatingInput
          label={t("creatinine")}
          type="number"
          min={1}
          value={bloodTestsFormData.creatinine}
          onChange={(v) => handleBloodTestsInputChange("creatinine", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("alt")}
          type="number"
          min={1}
          value={bloodTestsFormData.alt}
          onChange={(v) => handleBloodTestsInputChange("alt", v)}
          required
        />
        <FloatingInput
          label={t("ast")}
          type="number"
          min={1}
          value={bloodTestsFormData.ast}
          onChange={(v) => handleBloodTestsInputChange("ast", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("ggt")}
          type="number"
          min={1}
          value={bloodTestsFormData.ggt}
          onChange={(v) => handleBloodTestsInputChange("ggt", v)}
          required
        />
        <FloatingInput
          label={t("uric_acid")}
          type="number"
          min={1}
          value={bloodTestsFormData.uric_acid}
          onChange={(v) => handleBloodTestsInputChange("uric_acid", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("ferritin")}
          type="number"
          min={1}
          value={bloodTestsFormData.ferritin}
          onChange={(v) => handleBloodTestsInputChange("ferritin", v)}
          required
        />
        <FloatingInput
          label={t("vitamin_b12")}
          type="number"
          min={1}
          value={bloodTestsFormData.vitamin_b12}
          onChange={(v) => handleBloodTestsInputChange("vitamin_b12", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("apoa1")}
          type="number"
          min={1}
          value={bloodTestsFormData.apoa1}
          onChange={(v) => handleBloodTestsInputChange("apoa1", v)}
          required
        />
        <FloatingInput
          label={t("apob")}
          type="number"
          min={1}
          value={bloodTestsFormData.apob}
          onChange={(v) => handleBloodTestsInputChange("apob", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("lipoprotein_a")}
          type="number"
          min={1}
          value={bloodTestsFormData.lipoprotein_a}
          onChange={(v) => handleBloodTestsInputChange("lipoprotein_a", v)}
          required
        />
        <FloatingInput
          label={t("small_dense_ldl")}
          type="number"
          min={1}
          value={bloodTestsFormData.small_dense_ldl}
          onChange={(v) => handleBloodTestsInputChange("small_dense_ldl", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("hs_crp")}
          type="number"
          min={1}
          value={bloodTestsFormData.hs_crp}
          onChange={(v) => handleBloodTestsInputChange("hs_crp", v)}
          required
        />
        <FloatingInput
          label={t("homocysteine")}
          type="number"
          min={1}
          value={bloodTestsFormData.homocysteine}
          onChange={(v) => handleBloodTestsInputChange("homocysteine", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("fasting_insulin")}
          type="number"
          min={1}
          value={bloodTestsFormData.fasting_insulin}
          onChange={(v) => handleBloodTestsInputChange("fasting_insulin", v)}
          required
        />
        <FloatingInput
          label={t("homa_ir")}
          type="number"
          min={1}
          value={bloodTestsFormData.homa_ir}
          onChange={(v) => handleBloodTestsInputChange("homa_ir", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("c_peptide")}
          type="number"
          min={1}
          value={bloodTestsFormData.c_peptide}
          onChange={(v) => handleBloodTestsInputChange("c_peptide", v)}
          required
        />
        <FloatingInput
          label={t("adiponectin")}
          type="number"
          min={1}
          value={bloodTestsFormData.adiponectin}
          onChange={(v) => handleBloodTestsInputChange("adiponectin", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("omega_3_index")}
          type="number"
          min={1}
          value={bloodTestsFormData.omega_3_index}
          onChange={(v) => handleBloodTestsInputChange("omega_3_index", v)}
          required
        />
      </div>
      {/* Blood Tests & Biomarkers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("galectin_3")}
          type="number"
          min={1}
          value={bloodTestsFormData.galectin_3}
          onChange={(v) => handleBloodTestsInputChange("galectin_3", v)}
          required
        />
        <FloatingInput
          label={t("testosterone_total")}
          type="number"
          min={1}
          value={bloodTestsFormData.testosterone_total}
          onChange={(v) => handleBloodTestsInputChange("testosterone_total", v)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("testosterone_free")}
          type="number"
          min={1}
          value={bloodTestsFormData.testosterone_free}
          onChange={(v) => handleBloodTestsInputChange("testosterone_free", v)}
          required
        />
        <FloatingInput
          label={t("estradiol")}
          type="number"
          min={1}
          value={bloodTestsFormData.estradiol}
          onChange={(v) => handleBloodTestsInputChange("estradiol", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("dhea_s")}
          type="number"
          min={1}
          value={bloodTestsFormData.dhea_s}
          onChange={(v) => handleBloodTestsInputChange("dhea_s", v)}
          required
        />
        <FloatingInput
          label={t("cortisol")}
          type="number"
          min={1}
          value={bloodTestsFormData.cortisol}
          onChange={(v) => handleBloodTestsInputChange("cortisol", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("igf_1")}
          type="number"
          min={1}
          value={bloodTestsFormData.igf_1}
          onChange={(v) => handleBloodTestsInputChange("igf_1", v)}
          required
        />
        <FloatingInput
          label={t("tsh")}
          type="number"
          min={1}
          value={bloodTestsFormData.tsh}
          onChange={(v) => handleBloodTestsInputChange("tsh", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("free_t3")}
          type="number"
          min={1}
          value={bloodTestsFormData.free_t3}
          onChange={(v) => handleBloodTestsInputChange("free_t3", v)}
          required
        />
        <FloatingInput
          label={t("free_t4")}
          type="number"
          min={1}
          value={bloodTestsFormData.free_t4}
          onChange={(v) => handleBloodTestsInputChange("free_t4", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("parathyroid_hormone_pth")}
          type="number"
          min={1}
          value={bloodTestsFormData.parathyroid_hormone_pth}
          onChange={(v) =>
            handleBloodTestsInputChange("parathyroid_hormone_pth", v)
          }
          required
        />
        <FloatingInput
          label={t("vitamin_k2")}
          type="number"
          min={1}
          value={bloodTestsFormData.vitamin_k2}
          onChange={(v) => handleBloodTestsInputChange("vitamin_k2", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("fecal_calprotectin")}
          type="number"
          min={1}
          value={bloodTestsFormData.fecal_calprotectin}
          onChange={(v) => handleBloodTestsInputChange("fecal_calprotectin", v)}
          required
        />
        <FloatingInput
          label={t("zonulin")}
          type="number"
          min={1}
          value={bloodTestsFormData.zonulin}
          onChange={(v) => handleBloodTestsInputChange("zonulin", v)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("stool_microbiome_profile")}
          type="text"
          value={bloodTestsFormData.stool_microbiome_profile}
          onChange={(v) =>
            handleBloodTestsInputChange("stool_microbiome_profile", v)
          }
          required
        />
      </div>
    </div>
  );

  // Mental Health & Cognitive Factors
  const MentalHealthStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectInput
          label={t("smoker_status")}
          options={[t("yes"), t("no")]}
          value={mentalHealthFormData.smoker_status}
          onChange={(v) => handleMentalHealthInputChange("smoker_status", v === t("yes"))}
          required
        />
        <SelectInput
          label={t("recreational_drug_use")}
          options={[t("yes"), t("no")]}
          value={mentalHealthFormData.recreational_drug_use}
          onChange={(v) =>
            handleMentalHealthInputChange("recreational_drug_use", v === t("yes"))
          }
          required
        />
        <FloatingInput
          label={t("sleep_quality")}
          type="number"
          min={1}
          max={10}
          value={mentalHealthFormData.sleep_quality_scale}
          onChange={(v) =>
            handleMentalHealthInputChange("sleep_quality_scale", parseInt(v, 10))
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("sleep_hours_weekday")}
          type="number"
          min={1}
          max={24}
          step="any"
          value={mentalHealthFormData.sleep_hours_weekday_average}
          onChange={(v) =>
            handleMentalHealthInputChange("sleep_hours_weekday_average", parseFloat(v))
          }
          required
        />
        <FloatingInput
          label={t("sleep_hours_weekend")}
          type="number"
          min={1}
          max={24}
          step="any"
          value={mentalHealthFormData.sleep_hours_weekend_average}
          onChange={(v) =>
            handleMentalHealthInputChange("sleep_hours_weekend_average", parseFloat(v))
          }
          required
        />
        <FloatingInput
          label={t("screen_time_before_bed")}
          type="number"
          min={1}
          max={24}
          step="any"
          value={mentalHealthFormData.screen_time_before_bed}
          onChange={(v) =>
            handleMentalHealthInputChange("screen_time_before_bed", parseInt(v, 10))
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("stress_level")}
          type="number"
          min={1}
          max={10}
          value={mentalHealthFormData.stress_level_scale}
          onChange={(v) =>
            handleMentalHealthInputChange("stress_level_scale", parseInt(v, 10))
          }
          required
        />
        <FloatingInput
          label={t("mood_level")}
          type="number"
          min={1}
          max={10}
          value={mentalHealthFormData.mood_scale}
          onChange={(v) => handleMentalHealthInputChange("mood_scale", parseInt(v, 10))}
          required
        />
        <FloatingInput
          label={t("energy_level")}
          type="number"
          min={1}
          max={10}
          value={mentalHealthFormData.energy_level_scale}
          onChange={(v) =>
            handleMentalHealthInputChange("energy_level_scale", parseInt(v, 10))
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <SelectInput
          label={t("mental_health_history")}
          options={[t("yes"), t("no")]}
          value={mentalHealthFormData.history_anxiety_depression}
          onChange={(v) =>
            handleMentalHealthInputChange("history_anxiety_depression", v === t("yes"))
          }
          required
        />
      </div>
    </div>
  );


  // Exercise & Movement
  const ExerciseStep = () => (
    <div className="space-y-6">
      {/* Weekly Exercise Frequency (integer) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("weekly_exercise_frequency")}
          type="number"
          step="1"
          min="0"
          max="14"
          value={exerciseFormData.weekly_exercise_frequency}
          onChange={(v) =>
            handleExerciseInputChange("weekly_exercise_frequency", v)
          }
          required
        />

        {/* Weekly Exercise Type (string from options) */}
        <SelectInput
          label={t("exercise_type")}
          options={[
            t("cardio"),
            t("strength_training"),
            t("flexibility_yoga"),
            t("sports"),
            t("mixed"),
            t("none"),
          ]}
          value={exerciseFormData.weekly_exercise_type}
          onChange={(v) =>
            handleExerciseInputChange("weekly_exercise_type", v)
          }
          required
        />
      </div>

      {/* Weekly Exercise Intensity + Steps Per Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={t("exercise_intensity")}
          options={[t("low"), t("moderate"), t("high"), t("variable")]}
          value={exerciseFormData.weekly_exercise_intensity}
          onChange={(v) =>
            handleExerciseInputChange("weekly_exercise_intensity", v)
          }
          required
        />

        {/* Steps per Day (integer) */}
        <FloatingInput
          label={t("steps_per_day")}
          type="number"
          step="1"
          min="0"
          max="50000"
          value={exerciseFormData.steps_per_day_average}
          onChange={(v) =>
            handleExerciseInputChange("steps_per_day_average", v)
          }
          required
        />
      </div>

      {/* Sedentary Hours + Mobility Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("sedentary_hours")}
          type="number"
          step="0.1"
          min="0"
          max="24"
          value={exerciseFormData.sedentary_hours_per_day}
          onChange={(v) =>
            handleExerciseInputChange("sedentary_hours_per_day", v)
          }
          required
        />
        <FloatingInput
          label={t("mobility_limitations")}
          type="text"
          value={exerciseFormData.mobility_limitations}
          onChange={(v) =>
            handleExerciseInputChange("mobility_limitations", v)
          }
          required
        />
      </div>

      {/* Activity Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <FloatingInput
          label={t("activity_tracker")}
          type="text"
          value={exerciseFormData.type_of_activity_tracker}
          onChange={(v) =>
            handleExerciseInputChange("type_of_activity_tracker", v)
          }
          required
        />
      </div>
    </div>
  );


  // Medical History & Risk
  const MedicalHistoryStep = () => (
    <div className="space-y-6">
      {/* Text Areas for Medical History */}
      <div className="space-y-4">
        <FloatingTextarea
          label={t("known_medical_conditions")}
          value={medicalHistoryFormData.known_medical_conditions}
          onChange={(v) =>
            handleMedicalHistoryInputChange("known_medical_conditions", v)
          }
          placeholder={t("diabetes_hypertension_cvd")}
          required
        />
        <FloatingTextarea
          label={t("medications")}
          value={medicalHistoryFormData.medications}
          onChange={(v) =>
            handleMedicalHistoryInputChange("medications", v)
          }
          required
        />
      </div>

      <div className="space-y-4">
        <FloatingTextarea
          label={t("supplement_usage")}
          value={medicalHistoryFormData.supplement_usage}
          onChange={(v) =>
            handleMedicalHistoryInputChange("supplement_usage", v)
          }
          required
        />
        <FloatingTextarea
          label={t("allergies")}
          value={medicalHistoryFormData.allergies}
          onChange={(v) =>
            handleMedicalHistoryInputChange("allergies", v)
          }
          required
        />
      </div>

      {/* Family History Section */}
      <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">
        {t("family_history")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={t("type_2_diabetes")}
          options={[
            { label: t("yes"), value: true },
            { label: t("no"), value: false },
          ]}
          value={medicalHistoryFormData.family_history_type2_diabetes}
          onChange={(v) =>
            handleMedicalHistoryInputChange("family_history_type2_diabetes", v)
          }
          required
        />
        <SelectInput
          label={t("cardiovascular_disease")}
          options={[
            { label: t("yes"), value: true },
            { label: t("no"), value: false },
          ]}
          value={medicalHistoryFormData.family_history_cardiovascular_disease}
          onChange={(v) =>
            handleMedicalHistoryInputChange(
              "family_history_cardiovascular_disease",
              v
            )
          }
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("cancer_type")}
          type="text"
          value={medicalHistoryFormData.family_history_cancer_type}
          onChange={(v) =>
            handleMedicalHistoryInputChange("family_history_cancer_type", v)
          }
          required
        />
        <SelectInput
          label={t("alzheimers_or_parkinsons")}
          options={[
            { label: t("yes"), value: true },
            { label: t("no"), value: false },
          ]}
          value={medicalHistoryFormData.family_history_alzheimers_parkinsons}
          onChange={(v) =>
            handleMedicalHistoryInputChange(
              "family_history_alzheimers_parkinsons",
              v
            )
          }
          required
        />
      </div>
    </div>
  );


  const handleReportUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setReports((prev) => [...prev, ...uploadedFiles]);
  };

  // Goals & Motivation


  const MedicalFilesStep = () => {
    return (
      <div className="space-y-6">
        {/* Primary Goal */}

        {/* File Upload Section */}
        <div className="mt-6">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">{t("click_to_upload")}</span>{" "}
                  {t("or_drag_and_drop")}
                </p>
                <p className="text-xs text-gray-500">
                  {t("file_types_allowed")}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleReportUpload}
              />
            </label>
          </div>

          {/* File List */}
          {reports.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {t("uploaded_files")}:
              </h4>
              <div className="space-y-2">
                {reports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {report.name}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setReports((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      {t("remove")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Goals Inputs */}

      </div>
    );
  };


  // === SUBMIT BUTTON ===
  <div className="flex space-x-3">
    <button
      className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200"
      onClick={handleAddPatientAPi}
    >
      {t("add")}
    </button>
  </div>



  const stepComponents = [
    DemographicsStep,
    AnthropometricsStep,
    CardioRespiratoryStep,
    NutritionStep,
    BloodTestsStep,
    MentalHealthStep,
    ExerciseStep,
    MedicalHistoryStep,
    MedicalFilesStep,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <OverlayLoader {...loader} isVisible={loader.isVisible} />
      <div className="max-w-10xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("add_new_patient")}
          </h1>
          <p className="text-gray-600">
            {t("complete_patient_registration_form")}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center overflow-x-auto py-2">
            <div className="flex items-center space-x-4 md:space-x-4">
              {steps.map((step, index) => (

                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${index <= activeStep
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-400"
                      }`}
                  >
                    <step.icon className="h-5 w-5" onClick={() => setActiveStep(index)} />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 transition-all duration-300 ${index < activeStep ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* <div className="flex justify-center mt-4 overflow-x-auto py-2">
            <div className="flex space-x-4 md:space-x-16">
               {steps.map((step, index) => (
                <span
                  key={index}
                  className={`text-xs md:text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                    index <= activeStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              ))} 
            </div>
          </div> */}
        </div>

        {/* Form Card */}
        <div className="bg-white w-[60%] mx-auto rounded-2xl shadow-xl p-8 mb-8">
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
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${activeStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("back")}
            </button>

            <div className="flex space-x-3">
              {activeStep < steps.length - 1 ? (
                <button
                  disabled={!isFormValid()}
                  onClick={async () => {
                    if (activeStep === 0) {
                      await handleDemographicsApi();
                    } else if (activeStep === 1) {
                      await handleAnthropometricsApi();
                    } else if (activeStep === 2) {
                      await handleCardiorespiratoryApi();
                    } else if (activeStep === 3) {
                      await handleNutritionApi();
                    } else if (activeStep === 4) {
                      await handleBloodTestsApi();
                    } else if (activeStep === 5) {
                      await handleMentalHealthApi();
                    } else if (activeStep === 6) {
                      await handleExerciseApi();
                    } else if (activeStep === 7) {
                      await handleMedicalHistoryApi();
                    }
                    setActiveStep(Math.min(steps.length - 1, activeStep + 1));
                  }}
                  className={`flex items-center px-8 py-3 rounded-xl font-medium transition-colors duration-200 ${!isFormValid()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  {t("next")}
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </button>

              ) : (
                <div className="flex space-x-3">
                  <button
                    className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200"
                    onClick={handleAddPatientAPi}
                  >
                    {t("add")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  ...props
}) => (
  <div className="relative">
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      className="w-full h-14 px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200 peer"
      {...props}
    />
    <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({ label, value, onChange, placeholder }) => (
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
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-14 px-4 pt-6 pb-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none transition-all duration-200 appearance-none bg-white"
    >
      <option value="" disabled></option>
      {options.map((option, idx) => {
        // Handle both string and { label, value } format
        const labelText = typeof option === "string" ? option : option.label;
        const valueText = typeof option === "string" ? option : option.value;

        return (
          <option key={idx} value={valueText}>
            {labelText}
          </option>
        );
      })}
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


export default AddPatient;
