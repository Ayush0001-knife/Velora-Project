import React, { useState } from "react";
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
import { demographics } from "../services/api";

const AddPatient = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [demographicsFormData, setDemographicsFormData] = useState({});
  const [anthropometricsFormData, setAnthropometricsFormData] = useState({});
  const [cardiorespiratoryFormData, setCardiorespiratoryFormData] = useState(
    {}
  );
  const [nutritionFormData, setNutritionFormData] = useState({});
  const [bloodTestsFormData, setBloodTestsFormData] = useState({});
  const [mentalHealthFormData, setMentalHealthFormData] = useState({});
  const [exerciseFormData, setExerciseFormData] = useState({});
  const [medicalHistoryFormData, setMedicalHistoryFormData] = useState({});
  const [goalsFormData, setGoalsFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    demographics: demographicsFormData,
    anthropometrics: anthropometricsFormData,
    cardiorespiratory: cardiorespiratoryFormData,
    nutrition: nutritionFormData,
    bloodTests: bloodTestsFormData,
    mentalHealth: mentalHealthFormData,
    exercise: exerciseFormData,
    medicalHistory: medicalHistoryFormData,
    goals: goalsFormData,
  });

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
    { title: t("goals"), icon: Target },
  ];

  const handleDemographicsInputChange = (field, value) => {
    setDemographicsFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnthropometricsInputChange = (field, value) => {
    setAnthropometricsFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleGoalsInputChange = (field, value) => {
    setGoalsFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDemographicsAPi = async () => {
    const data = await demographics(demographicsFormData);
    console.log(data);
  };

  const navigate = useNavigate();

  // Demographics & Identity
  const DemographicsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("full_name")}
          value={demographicsFormData.firstName}
          onChange={(v) => handleDemographicsInputChange("fullName", v)}
        />
        <FloatingInput
          label={t("date_of_birth")}
          type="date"
          value={demographicsFormData.date_of_birth}
          onChange={(v) => handleDemographicsInputChange("date_of_birth", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectInput
          label={t("biological_sex")}
          options={[t("male"), t("female"), t("other")]}
          value={demographicsFormData.gender}
          onChange={(v) => handleDemographicsInputChange("gender", v)}
        />
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
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("country_of_residence")}
          value={demographicsFormData.country_of_residence}
          onChange={(v) =>
            handleDemographicsInputChange("country_of_residence", v)
          }
        />
        <FloatingInput
          label={t("occupation")}
          value={demographicsFormData.occupation}
          onChange={(v) => handleDemographicsInputChange("occupation", v)}
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
        />
      </div>
    </div>
  );

  // Anthropometrics & Body Composition
  const AnthropometricsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("weight_kg")}
          type="number"
          value={anthropometricsFormData.weight_kg}
          onChange={(v) => handleAnthropometricsInputChange("weight_kg", v)}
        />
        <FloatingInput
          label={t("height_cm")}
          type="number"
          value={anthropometricsFormData.height_cm}
          onChange={(v) => handleAnthropometricsInputChange("height_cm", v)}
        />
        <FloatingInput
          label={t("bmi_auto_calculated")}
          type="number"
          value={anthropometricsFormData.bmi}
          disabled
          onChange={(v) => handleAnthropometricsInputChange("bmi", v)}
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
        />
        <FloatingInput
          label={t("hip_circumference_cm")}
          type="number"
          value={anthropometricsFormData.hip_circumference_cm}
          onChange={(v) =>
            handleAnthropometricsInputChange("hip_circumference_cm", v)
          }
        />
        <FloatingInput
          label={t("waist_hip_ratio_calculated")}
          type="number"
          value={anthropometricsFormData.waist_to_hip_ratio}
          disabled
          onChange={(v) =>
            handleAnthropometricsInputChange("waist_to_hip_ratio", v)
          }
        />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">
        {t("bioimpedance_metrics")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("body_fat_percentage")}
          type="number"
          value={anthropometricsFormData.body_fat_percent}
          onChange={(v) =>
            handleAnthropometricsInputChange("body_fat_percent", v)
          }
        />
        <FloatingInput
          label={t("muscle_mass_percentage")}
          type="number"
          value={anthropometricsFormData.muscle_mass_percent}
          onChange={(v) =>
            handleAnthropometricsInputChange("muscle_mass_percent", v)
          }
        />
        <FloatingInput
          label={t("visceral_fat_level")}
          type="number"
          value={anthropometricsFormData.visceral_fat_level}
          onChange={(v) =>
            handleAnthropometricsInputChange("visceral_fat_level", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("bone_mass")}
          type="number"
          value={anthropometricsFormData.bone_mass}
          onChange={(v) => handleAnthropometricsInputChange("bone_mass", v)}
        />
        <FloatingInput
          label={t("hydration_status")}
          type="number"
          value={anthropometricsFormData.hydration_status}
          onChange={(v) =>
            handleAnthropometricsInputChange("hydration_status", v)
          }
        />
      </div>
    </div>
  );

  // Cardiorespiratory Fitness & Vitals
  const CardioRespiratoryStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("resting_heart_rate")}
          type="number"
          value={cardiorespiratoryFormData.resting_heart_rate_bpm}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("resting_heart_rate_bpm", v)
          }
        />
        <FloatingInput
          label={t("blood_pressure_systolic")}
          type="number"
          value={cardiorespiratoryFormData.blood_pressure_systolic}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("blood_pressure_systolic", v)
          }
        />
        <FloatingInput
          label={t("blood_pressure_diastolic")}
          type="number"
          value={cardiorespiratoryFormData.blood_pressure_diastolic}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("blood_pressure_diastolic", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("vo2_max")}
          type="number"
          value={cardiorespiratoryFormData.vo2_max}
          onChange={(v) => handleCardiorespiratoryInputChange("vo2_max", v)}
        />
        <FloatingInput
          label={t("oxygen_saturation")}
          type="number"
          value={cardiorespiratoryFormData.oxygen_saturation_spo2}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("oxygen_saturation_spo2", v)
          }
        />
        <FloatingInput
          label={t("heart_rate_variability")}
          type="number"
          value={cardiorespiratoryFormData.heart_rate_variability_hrv}
          onChange={(v) =>
            handleCardiorespiratoryInputChange("heart_rate_variability_hrv", v)
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
          value={nutritionFormData.meals_prepared_at_home_per_week}
          onChange={(v) =>
            handleNutritionInputChange("meals_prepared_at_home_per_week", v)
          }
        />
        <FloatingInput
          label={t("daily_fruits_vegetables")}
          type="number"
          value={nutritionFormData.daily_servings_fruits_vegetables}
          onChange={(v) =>
            handleNutritionInputChange("daily_servings_fruits_vegetables", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("weekly_processed_foods")}
          type="number"
          value={nutritionFormData.weekly_servings_ultra_processed_foods}
          onChange={(v) =>
            handleNutritionInputChange(
              "weekly_servings_ultra_processed_foods",
              v
            )
          }
        />
        <FloatingInput
          label={t("water_intake_daily")}
          type="number"
          value={nutritionFormData.water_intake_liters_per_day}
          onChange={(v) =>
            handleNutritionInputChange("water_intake_liters_per_day", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("alcohol_intake_weekly")}
          type="number"
          value={nutritionFormData.alcohol_intake_drinks_per_week}
          onChange={(v) =>
            handleNutritionInputChange("alcohol_intake_drinks_per_week", v)
          }
        />
        <FloatingInput
          label={t("vitamin_d_level")}
          type="number"
          value={nutritionFormData.vitamin_d_blood_level}
          onChange={(v) =>
            handleNutritionInputChange("vitamin_d_blood_level", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("food_allergies")}
          value={nutritionFormData.food_allergies_intolerances}
          onChange={(v) =>
            handleNutritionInputChange("food_allergies_intolerances", v)
          }
        />
        <FloatingInput
          label={t("food_dislikes")}
          value={nutritionFormData.dislikes}
          onChange={(v) => handleNutritionInputChange("dislikes", v)}
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
        />
      </div>
    </div>
  );

  // Blood Tests & Biomarkers
  const BloodTestsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("fasting_glucose")}
          type="number"
          value={bloodTestsFormData.fasting_glucose}
          onChange={(v) => handleBloodTestsInputChange("fasting_glucose", v)}
        />
        <FloatingInput
          label={t("hba1c")}
          type="number"
          step="0.1"
          value={bloodTestsFormData.hba1c}
          onChange={(v) => handleBloodTestsInputChange("hba1c", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("total_cholesterol")}
          type="number"
          value={bloodTestsFormData.total_cholesterol}
          onChange={(v) => handleBloodTestsInputChange("total_cholesterol", v)}
        />
        <FloatingInput
          label={t("hdl_cholesterol")}
          type="number"
          value={bloodTestsFormData.hdl_cholesterol}
          onChange={(v) => handleBloodTestsInputChange("hdl_cholesterol", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("ldl_cholesterol")}
          type="number"
          value={bloodTestsFormData.ldl_cholesterol}
          onChange={(v) => handleBloodTestsInputChange("ldl_cholesterol", v)}
        />
        <FloatingInput
          label={t("triglycerides")}
          type="number"
          value={bloodTestsFormData.triglycerides}
          onChange={(v) => handleBloodTestsInputChange("triglycerides", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("crp_level")}
          type="number"
          step="0.1"
          value={bloodTestsFormData.crp_level}
          onChange={(v) => handleBloodTestsInputChange("crp_level", v)}
        />
        <FloatingInput
          label={t("vitamin_d")}
          type="number"
          value={bloodTestsFormData.vitamin_d}
          onChange={(v) => handleBloodTestsInputChange("vitamin_d", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("iron_level")}
          type="number"
          value={bloodTestsFormData.iron_level}
          onChange={(v) => handleBloodTestsInputChange("iron_level", v)}
        />
        <FloatingInput
          label={t("ferritin")}
          type="number"
          value={bloodTestsFormData.ferritin}
          onChange={(v) => handleBloodTestsInputChange("ferritin", v)}
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
          options={[t("never"), t("former"), t("current")]}
          value={mentalHealthFormData.smoker_status}
          onChange={(v) => handleMentalHealthInputChange("smoker_status", v)}
        />
        <SelectInput
          label={t("recreational_drug_use")}
          options={[
            t("none"),
            t("occasional"),
            t("regular"),
            t("prefer_not_to_say"),
          ]}
          value={mentalHealthFormData.recreational_drug_use}
          onChange={(v) =>
            handleMentalHealthInputChange("recreational_drug_use", v)
          }
        />
        <FloatingInput
          label={t("sleep_quality")}
          type="number"
          min="1"
          max="10"
          value={mentalHealthFormData.sleep_quality_scale}
          onChange={(v) =>
            handleMentalHealthInputChange("sleep_quality_scale", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("sleep_hours_weekday")}
          type="number"
          value={mentalHealthFormData.sleep_hours_weekday_average}
          onChange={(v) =>
            handleMentalHealthInputChange("sleep_hours_weekday_average", v)
          }
        />
        <FloatingInput
          label={t("sleep_hours_weekend")}
          type="number"
          value={mentalHealthFormData.sleep_hours_weekend_average}
          onChange={(v) =>
            handleMentalHealthInputChange("sleep_hours_weekend_average", v)
          }
        />
        <FloatingInput
          label={t("screen_time_before_bed")}
          type="number"
          value={mentalHealthFormData.screen_time_before_bed}
          onChange={(v) =>
            handleMentalHealthInputChange("screen_time_before_bed", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("stress_level")}
          type="number"
          min="1"
          max="10"
          value={mentalHealthFormData.stress_level_scale}
          onChange={(v) =>
            handleMentalHealthInputChange("stress_level_scale", v)
          }
        />
        <FloatingInput
          label={t("mood_level")}
          type="number"
          min="1"
          max="10"
          value={mentalHealthFormData.mood_scale}
          onChange={(v) => handleMentalHealthInputChange("mood_scale", v)}
        />
        <FloatingInput
          label={t("energy_level")}
          type="number"
          min="1"
          max="10"
          value={mentalHealthFormData.energy_level_scale}
          onChange={(v) =>
            handleMentalHealthInputChange("energy_level_scale", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <SelectInput
          label={t("mental_health_history")}
          options={[
            t("none"),
            t("anxiety"),
            t("depression"),
            t("both"),
            t("other"),
          ]}
          value={mentalHealthFormData.history_anxiety_depression}
          onChange={(v) =>
            handleMentalHealthInputChange("history_anxiety_depression", v)
          }
        />
      </div>
    </div>
  );

  // Exercise & Movement
  const ExerciseStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("weekly_exercise_frequency")}
          type="number"
          value={exerciseFormData.weekly_exercise_frequency}
          onChange={(v) =>
            handleExerciseInputChange("weekly_exercise_frequency", v)
          }
        />
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
          onChange={(v) => handleExerciseInputChange("weekly_exercise_type", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={t("exercise_intensity")}
          options={[t("low"), t("moderate"), t("high"), t("variable")]}
          value={exerciseFormData.weekly_exercise_intensity}
          onChange={(v) =>
            handleExerciseInputChange("weekly_exercise_intensity", v)
          }
        />
        <FloatingInput
          label={t("steps_per_day")}
          type="number"
          value={exerciseFormData.steps_per_day_average}
          onChange={(v) =>
            handleExerciseInputChange("steps_per_day_average", v)
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("sedentary_hours")}
          type="number"
          value={exerciseFormData.sedentary_hours_per_day}
          onChange={(v) =>
            handleExerciseInputChange("sedentary_hours_per_day", v)
          }
        />
        <FloatingInput
          label={t("mobility_limitations")}
          value={exerciseFormData.mobility_limitations}
          onChange={(v) => handleExerciseInputChange("mobility_limitations", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <FloatingInput
          label={t("activity_tracker")}
          value={exerciseFormData.type_of_activity_tracker}
          onChange={(v) =>
            handleExerciseInputChange("type_of_activity_tracker", v)
          }
        />
      </div>
    </div>
  );

  // Medical History & Risk
  const MedicalHistoryStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <FloatingTextarea
          label={t("known_medical_conditions")}
          value={medicalHistoryFormData.known_medical_conditions}
          onChange={(v) =>
            handleMedicalHistoryInputChange("known_medical_conditions", v)
          }
          placeholder={t("diabetes_hypertension_cvd")}
        />
        <FloatingTextarea
          label={t("medications")}
          value={medicalHistoryFormData.medications}
          onChange={(v) => handleMedicalHistoryInputChange("medications", v)}
        />
      </div>
      <div className="space-y-4">
        <FloatingTextarea
          label={t("supplement_usage")}
          value={medicalHistoryFormData.supplement_usage}
          onChange={(v) =>
            handleMedicalHistoryInputChange("supplement_usage", v)
          }
        />
        <FloatingTextarea
          label={t("allergies")}
          value={medicalHistoryFormData.allergies}
          onChange={(v) => handleMedicalHistoryInputChange("allergies", v)}
        />
      </div>

      <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">
        {t("family_history")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={t("type_2_diabetes")}
          options={[
            t("none"),
            t("first_degree_relative"),
            t("second_degree_relative"),
            t("unknown"),
          ]}
          value={medicalHistoryFormData.family_history_type2_diabetes}
          onChange={(v) =>
            handleMedicalHistoryInputChange("family_history_type2_diabetes", v)
          }
        />
        <SelectInput
          label={t("cardiovascular_disease")}
          options={[
            t("none"),
            t("first_degree_relative"),
            t("second_degree_relative"),
            t("unknown"),
          ]}
          value={medicalHistoryFormData.family_history_cardiovascular_disease}
          onChange={(v) =>
            handleMedicalHistoryInputChange(
              "family_history_cardiovascular_disease",
              v
            )
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("cancer_type")}
          value={medicalHistoryFormData.family_history_cancer_type}
          onChange={(v) =>
            handleMedicalHistoryInputChange("family_history_cancer_type", v)
          }
        />
        <SelectInput
          label={t("alzheimers_or_parkinsons")}
          options={[
            t("none"),
            t("first_degree_relative"),
            t("second_degree_relative"),
            t("unknown"),
          ]}
          value={medicalHistoryFormData.family_history_alzheimers_parkinsons}
          onChange={(v) =>
            handleMedicalHistoryInputChange(
              "family_history_alzheimers_parkinsons",
              v
            )
          }
        />
      </div>
    </div>
  );

  // Goals & Motivation
  const GoalsStep = () => {
    const handleFileUpload = (e) => {
      const uploadedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...uploadedFiles]);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <SelectInput
            label={t("primary_health_goals")}
            options={[
              t("weight_loss"),
              t("improved_sleep"),
              t("increased_energy"),
              t("longevity"),
              t("disease_prevention"),
              t("muscle_gain"),
              t("performance_improvement"),
              t("stress_reduction"),
              t("other"),
            ]}
            value={goalsFormData.primaryGoal}
            onChange={(v) => handleGoalsInputChange("primaryGoal", v)}
          />
        </div>

        {/* File Upload Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            {t("medical_reports_upload")}
          </h3>
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
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {t("uploaded_files")}:
              </h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">{file.name}</span>
                    </div>
                    <button
                      onClick={() =>
                        setFiles(files.filter((_, i) => i !== index))
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            label={t("preferred_intervention_focus")}
            options={[
              t("food_nutrition"),
              t("sleep"),
              t("physical_activity"),
              t("mental_health"),
              t("supplements"),
              t("comprehensive_approach"),
            ]}
            value={goalsFormData.interventionFocus}
            onChange={(v) => handleGoalsInputChange("interventionFocus", v)}
          />
          <FloatingInput
            label={t("motivation_level")}
            type="number"
            min="1"
            max="10"
            value={goalsFormData.motivationLevel}
            onChange={(v) => handleGoalsInputChange("motivationLevel", v)}
          />
        </div>

        <div className="space-y-4">
          <FloatingTextarea
            label={t("barriers_to_change")}
            value={goalsFormData.barriers}
            onChange={(v) => handleGoalsInputChange("barriers", v)}
            placeholder={t("barriers_placeholder")}
          />
        </div>

        <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">
          {t("digital_behavioral_inputs")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectInput
            label={t("wearable_connected")}
            options={[t("yes"), t("no")]}
            value={goalsFormData.wearableConnected}
            onChange={(v) => handleGoalsInputChange("wearableConnected", v)}
          />
          <FloatingInput
            label={t("device_type")}
            value={goalsFormData.deviceType}
            onChange={(v) => handleGoalsInputChange("deviceType", v)}
            placeholder={t("device_type_placeholder")}
          />
          <SelectInput
            label={t("data_streams_available")}
            options={[
              t("steps_day"),
              t("sleep_staging"),
              t("hrv"),
              t("cgm"),
              t("multiple"),
              t("none"),
            ]}
            value={goalsFormData.dataStreams}
            onChange={(v) => handleGoalsInputChange("dataStreams", v)}
          />
        </div>
      </div>
    );
  };

  const handleAddPatient = () => {
    console.log(formData);
  };

  const stepComponents = [
    DemographicsStep,
    AnthropometricsStep,
    CardioRespiratoryStep,
    NutritionStep,
    BloodTestsStep,
    MentalHealthStep,
    ExerciseStep,
    MedicalHistoryStep,
    GoalsStep,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
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
                      className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 transition-all duration-300 ${
                        index < activeStep ? "bg-blue-600" : "bg-gray-300"
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
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeStep === 0
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
                  onClick={async () => {
                    if (activeStep === 0) {
                      await handleDemographicsAPi();
                    }
                    setActiveStep(Math.min(steps.length - 1, activeStep + 1));
                  }}
                  className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  {t("next")}
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200"
                    onClick={handleAddPatient}
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

export default AddPatient;
