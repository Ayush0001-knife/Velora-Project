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

const AddPatient = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Demographics & Identity
  const DemographicsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("full_name")}
          value={formData.fullName}
          onChange={(v) => handleInputChange("fullName", v)}
        />
        <FloatingInput
          label={t("date_of_birth")}
          type="date"
          value={formData.dob}
          onChange={(v) => handleInputChange("dob", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectInput
          label={t("biological_sex")}
          options={[t("male"), t("female"), t("other")]}
          value={formData.biologicalSex}
          onChange={(v) => handleInputChange("biologicalSex", v)}
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
          value={formData.genderIdentity}
          onChange={(v) => handleInputChange("genderIdentity", v)}
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
          value={formData.ethnicity}
          onChange={(v) => handleInputChange("ethnicity", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("country_of_residence")}
          value={formData.country}
          onChange={(v) => handleInputChange("country", v)}
        />
        <FloatingInput
          label={t("occupation")}
          value={formData.occupation}
          onChange={(v) => handleInputChange("occupation", v)}
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
          value={formData.socioeconomicIndicator}
          onChange={(v) => handleInputChange("socioeconomicIndicator", v)}
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
          value={formData.weight}
          onChange={(v) => handleInputChange("weight", v)}
        />
        <FloatingInput
          label={t("height_cm")}
          type="number"
          value={formData.height}
          onChange={(v) => handleInputChange("height", v)}
        />
        <FloatingInput
          label={t("bmi_auto_calculated")}
          type="number"
          value={formData.bmi}
          disabled
          onChange={(v) => handleInputChange("bmi", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("waist_circumference_cm")}
          type="number"
          value={formData.waistCircumference}
          onChange={(v) => handleInputChange("waistCircumference", v)}
        />
        <FloatingInput
          label={t("hip_circumference_cm")}
          type="number"
          value={formData.hipCircumference}
          onChange={(v) => handleInputChange("hipCircumference", v)}
        />
        <FloatingInput
          label={t("waist_hip_ratio_calculated")}
          type="number"
          value={formData.waistHipRatio}
          disabled
          onChange={(v) => handleInputChange("waistHipRatio", v)}
        />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">
        {t("bioimpedance_metrics")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("body_fat_percentage")}
          type="number"
          value={formData.bodyFatPercentage}
          onChange={(v) => handleInputChange("bodyFatPercentage", v)}
        />
        <FloatingInput
          label={t("muscle_mass_percentage")}
          type="number"
          value={formData.muscleMassPercentage}
          onChange={(v) => handleInputChange("muscleMassPercentage", v)}
        />
        <FloatingInput
          label={t("visceral_fat_level")}
          type="number"
          value={formData.visceralFatLevel}
          onChange={(v) => handleInputChange("visceralFatLevel", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("bone_mass")}
          type="number"
          value={formData.boneMass}
          onChange={(v) => handleInputChange("boneMass", v)}
        />
        <FloatingInput
          label={t("hydration_status")}
          type="number"
          value={formData.hydrationStatus}
          onChange={(v) => handleInputChange("hydrationStatus", v)}
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
          value={formData.restingHeartRate}
          onChange={(v) => handleInputChange("restingHeartRate", v)}
        />
        <FloatingInput
          label={t("blood_pressure_systolic")}
          type="number"
          value={formData.systolicBP}
          onChange={(v) => handleInputChange("systolicBP", v)}
        />
        <FloatingInput
          label={t("blood_pressure_diastolic")}
          type="number"
          value={formData.diastolicBP}
          onChange={(v) => handleInputChange("diastolicBP", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("vo2_max")}
          type="number"
          value={formData.vo2Max}
          onChange={(v) => handleInputChange("vo2Max", v)}
        />
        <FloatingInput
          label={t("oxygen_saturation")}
          type="number"
          value={formData.oxygenSaturation}
          onChange={(v) => handleInputChange("oxygenSaturation", v)}
        />
        <FloatingInput
          label={t("heart_rate_variability")}
          type="number"
          value={formData.hrv}
          onChange={(v) => handleInputChange("hrv", v)}
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
          value={formData.homePreparedMeals}
          onChange={(v) => handleInputChange("homePreparedMeals", v)}
        />
        <FloatingInput
          label={t("daily_fruits_vegetables")}
          type="number"
          value={formData.fruitVegServings}
          onChange={(v) => handleInputChange("fruitVegServings", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("weekly_processed_foods")}
          type="number"
          value={formData.processedFoodServings}
          onChange={(v) => handleInputChange("processedFoodServings", v)}
        />
        <FloatingInput
          label={t("water_intake_daily")}
          type="number"
          value={formData.waterIntake}
          onChange={(v) => handleInputChange("waterIntake", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("alcohol_intake_weekly")}
          type="number"
          value={formData.alcoholIntake}
          onChange={(v) => handleInputChange("alcoholIntake", v)}
        />
        <FloatingInput
          label={t("vitamin_d_level")}
          type="number"
          value={formData.vitaminD}
          onChange={(v) => handleInputChange("vitaminD", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("food_allergies")}
          value={formData.foodAllergies}
          onChange={(v) => handleInputChange("foodAllergies", v)}
        />
        <FloatingInput
          label={t("food_dislikes")}
          value={formData.foodDislikes}
          onChange={(v) => handleInputChange("foodDislikes", v)}
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
          value={formData.specialDiet}
          onChange={(v) => handleInputChange("specialDiet", v)}
        />
      </div>
    </div>
  );

  // Blood Tests & Biomarkers
  const BloodTestsStep = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700 mb-3">
        {t("core_labs")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("fasting_glucose")}
          type="number"
          value={formData.fastingGlucose}
          onChange={(v) => handleInputChange("fastingGlucose", v)}
        />
        <FloatingInput
          label={t("hba1c")}
          type="number"
          value={formData.hba1c}
          onChange={(v) => handleInputChange("hba1c", v)}
        />
        <FloatingInput
          label={t("total_cholesterol")}
          type="number"
          value={formData.totalCholesterol}
          onChange={(v) => handleInputChange("totalCholesterol", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("ldl")}
          type="number"
          value={formData.ldl}
          onChange={(v) => handleInputChange("ldl", v)}
        />
        <FloatingInput
          label={t("hdl")}
          type="number"
          value={formData.hdl}
          onChange={(v) => handleInputChange("hdl", v)}
        />
        <FloatingInput
          label={t("triglycerides")}
          type="number"
          value={formData.triglycerides}
          onChange={(v) => handleInputChange("triglycerides", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("creatinine")}
          type="number"
          value={formData.creatinine}
          onChange={(v) => handleInputChange("creatinine", v)}
        />
        <FloatingInput
          label={t("alt")}
          type="number"
          value={formData.alt}
          onChange={(v) => handleInputChange("alt", v)}
        />
        <FloatingInput
          label={t("ast")}
          type="number"
          value={formData.ast}
          onChange={(v) => handleInputChange("ast", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("ggt")}
          type="number"
          value={formData.ggt}
          onChange={(v) => handleInputChange("ggt", v)}
        />
        <FloatingInput
          label={t("uric_acid")}
          type="number"
          value={formData.uricAcid}
          onChange={(v) => handleInputChange("uricAcid", v)}
        />
        <FloatingInput
          label={t("ferritin")}
          type="number"
          value={formData.ferritin}
          onChange={(v) => handleInputChange("ferritin", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <FloatingInput
          label={t("vitamin_b12")}
          type="number"
          value={formData.vitaminB12}
          onChange={(v) => handleInputChange("vitaminB12", v)}
        />
      </div>

      <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">
        {t("advanced_cardiometabolic")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("apoa1")}
          type="number"
          value={formData.apoA1}
          onChange={(v) => handleInputChange("apoA1", v)}
        />
        <FloatingInput
          label={t("apob")}
          type="number"
          value={formData.apoB}
          onChange={(v) => handleInputChange("apoB", v)}
        />
        <FloatingInput
          label={t("lipoprotein_a")}
          type="number"
          value={formData.lipoproteinA}
          onChange={(v) => handleInputChange("lipoproteinA", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("small_dense_ldl")}
          type="number"
          value={formData.smallDenseLDL}
          onChange={(v) => handleInputChange("smallDenseLDL", v)}
        />
        <FloatingInput
          label={t("hs_crp")}
          type="number"
          value={formData.hsCRP}
          onChange={(v) => handleInputChange("hsCRP", v)}
        />
        <FloatingInput
          label={t("homocysteine")}
          type="number"
          value={formData.homocysteine}
          onChange={(v) => handleInputChange("homocysteine", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("fasting_insulin")}
          type="number"
          value={formData.fastingInsulin}
          onChange={(v) => handleInputChange("fastingInsulin", v)}
        />
        <FloatingInput
          label={t("homa_ir")}
          type="number"
          value={formData.homaIR}
          onChange={(v) => handleInputChange("homaIR", v)}
        />
        <FloatingInput
          label={t("c_peptide")}
          type="number"
          value={formData.cPeptide}
          onChange={(v) => handleInputChange("cPeptide", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("adiponectin")}
          type="number"
          value={formData.adiponectin}
          onChange={(v) => handleInputChange("adiponectin", v)}
        />
        <FloatingInput
          label={t("omega3_index")}
          type="number"
          value={formData.omega3Index}
          onChange={(v) => handleInputChange("omega3Index", v)}
        />
        <FloatingInput
          label={t("galectin3_optional")}
          type="number"
          value={formData.galectin3}
          onChange={(v) => handleInputChange("galectin3", v)}
        />
      </div>

      <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">
        {t("hormonal_longevity")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("testosterone_total")}
          type="number"
          value={formData.totalTestosterone}
          onChange={(v) => handleInputChange("totalTestosterone", v)}
        />
        <FloatingInput
          label={t("testosterone_free")}
          type="number"
          value={formData.freeTestosterone}
          onChange={(v) => handleInputChange("freeTestosterone", v)}
        />
        <FloatingInput
          label={t("estradiol_women")}
          type="number"
          value={formData.estradiol}
          onChange={(v) => handleInputChange("estradiol", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("dhea_s")}
          type="number"
          value={formData.dheaS}
          onChange={(v) => handleInputChange("dheaS", v)}
        />
        <FloatingInput
          label={t("cortisol")}
          type="number"
          value={formData.cortisol}
          onChange={(v) => handleInputChange("cortisol", v)}
        />
        <FloatingInput
          label={t("igf_1")}
          type="number"
          value={formData.igf1}
          onChange={(v) => handleInputChange("igf1", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("tsh")}
          type="number"
          value={formData.tsh}
          onChange={(v) => handleInputChange("tsh", v)}
        />
        <FloatingInput
          label={t("free_t3")}
          type="number"
          value={formData.freeT3}
          onChange={(v) => handleInputChange("freeT3", v)}
        />
        <FloatingInput
          label={t("free_t4")}
          type="number"
          value={formData.freeT4}
          onChange={(v) => handleInputChange("freeT4", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("parathyroid_hormone")}
          type="number"
          value={formData.pth}
          onChange={(v) => handleInputChange("pth", v)}
        />
        <FloatingInput
          label={t("vitamin_k2")}
          type="number"
          value={formData.vitaminK2}
          onChange={(v) => handleInputChange("vitaminK2", v)}
        />
      </div>

      <h3 className="text-lg font-medium text-gray-700 mt-6 mb-3">
        {t("gut_inflammation_other")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("fecal_calprotectin")}
          type="number"
          value={formData.fecalCalprotectin}
          onChange={(v) => handleInputChange("fecalCalprotectin", v)}
        />
        <FloatingInput
          label={t("zonulin")}
          type="number"
          value={formData.zonulin}
          onChange={(v) => handleInputChange("zonulin", v)}
        />
        <FloatingInput
          label={t("stool_microbiome_profile")}
          value={formData.microbiomeProfile}
          onChange={(v) => handleInputChange("microbiomeProfile", v)}
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
          value={formData.smokerStatus}
          onChange={(v) => handleInputChange("smokerStatus", v)}
        />
        <SelectInput
          label={t("recreational_drug_use")}
          options={[
            t("none"),
            t("occasional"),
            t("regular"),
            t("prefer_not_to_say"),
          ]}
          value={formData.recreationalDrugUse}
          onChange={(v) => handleInputChange("recreationalDrugUse", v)}
        />
        <FloatingInput
          label={t("sleep_quality")}
          type="number"
          min="1"
          max="10"
          value={formData.sleepQuality}
          onChange={(v) => handleInputChange("sleepQuality", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("sleep_hours_weekday")}
          type="number"
          value={formData.sleepHoursWeekday}
          onChange={(v) => handleInputChange("sleepHoursWeekday", v)}
        />
        <FloatingInput
          label={t("sleep_hours_weekend")}
          type="number"
          value={formData.sleepHoursWeekend}
          onChange={(v) => handleInputChange("sleepHoursWeekend", v)}
        />
        <FloatingInput
          label={t("screen_time_before_bed")}
          type="number"
          value={formData.screenTimeBeforeBed}
          onChange={(v) => handleInputChange("screenTimeBeforeBed", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FloatingInput
          label={t("stress_level")}
          type="number"
          min="1"
          max="10"
          value={formData.stressLevel}
          onChange={(v) => handleInputChange("stressLevel", v)}
        />
        <FloatingInput
          label={t("mood_level")}
          type="number"
          min="1"
          max="10"
          value={formData.moodLevel}
          onChange={(v) => handleInputChange("moodLevel", v)}
        />
        <FloatingInput
          label={t("energy_level")}
          type="number"
          min="1"
          max="10"
          value={formData.energyLevel}
          onChange={(v) => handleInputChange("energyLevel", v)}
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
          value={formData.mentalHealthHistory}
          onChange={(v) => handleInputChange("mentalHealthHistory", v)}
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
          min="0"
          max="7"
          value={formData.exerciseFrequency}
          onChange={(v) => handleInputChange("exerciseFrequency", v)}
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
          value={formData.exerciseType}
          onChange={(v) => handleInputChange("exerciseType", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput
          label={t("exercise_intensity")}
          options={[t("low"), t("moderate"), t("high"), t("variable")]}
          value={formData.exerciseIntensity}
          onChange={(v) => handleInputChange("exerciseIntensity", v)}
        />
        <FloatingInput
          label={t("steps_per_day")}
          type="number"
          value={formData.stepsPerDay}
          onChange={(v) => handleInputChange("stepsPerDay", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("sedentary_hours")}
          type="number"
          value={formData.sedentaryHours}
          onChange={(v) => handleInputChange("sedentaryHours", v)}
        />
        <FloatingInput
          label={t("mobility_limitations")}
          value={formData.mobilityLimitations}
          onChange={(v) => handleInputChange("mobilityLimitations", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <FloatingInput
          label={t("activity_tracker")}
          value={formData.activityTracker}
          onChange={(v) => handleInputChange("activityTracker", v)}
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
          value={formData.medicalConditions}
          onChange={(v) => handleInputChange("medicalConditions", v)}
          placeholder={t("diabetes_hypertension_cvd")}
        />
        <FloatingTextarea
          label={t("medications")}
          value={formData.medications}
          onChange={(v) => handleInputChange("medications", v)}
        />
      </div>
      <div className="space-y-4">
        <FloatingTextarea
          label={t("supplement_usage")}
          value={formData.supplements}
          onChange={(v) => handleInputChange("supplements", v)}
        />
        <FloatingTextarea
          label={t("allergies")}
          value={formData.allergies}
          onChange={(v) => handleInputChange("allergies", v)}
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
          value={formData.familyDiabetes}
          onChange={(v) => handleInputChange("familyDiabetes", v)}
        />
        <SelectInput
          label={t("cardiovascular_disease")}
          options={[
            t("none"),
            t("first_degree_relative"),
            t("second_degree_relative"),
            t("unknown"),
          ]}
          value={formData.familyCardiovascular}
          onChange={(v) => handleInputChange("familyCardiovascular", v)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label={t("cancer_type")}
          value={formData.familyCancer}
          onChange={(v) => handleInputChange("familyCancer", v)}
        />
        <SelectInput
          label={t("alzheimers_or_parkinsons")}
          options={[
            t("none"),
            t("first_degree_relative"),
            t("second_degree_relative"),
            t("unknown"),
          ]}
          value={formData.familyNeurological}
          onChange={(v) => handleInputChange("familyNeurological", v)}
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
            value={formData.primaryGoal}
            onChange={(v) => handleInputChange("primaryGoal", v)}
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
            value={formData.interventionFocus}
            onChange={(v) => handleInputChange("interventionFocus", v)}
          />
          <FloatingInput
            label={t("motivation_level")}
            type="number"
            min="1"
            max="10"
            value={formData.motivationLevel}
            onChange={(v) => handleInputChange("motivationLevel", v)}
          />
        </div>

        <div className="space-y-4">
          <FloatingTextarea
            label={t("barriers_to_change")}
            value={formData.barriers}
            onChange={(v) => handleInputChange("barriers", v)}
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
            value={formData.wearableConnected}
            onChange={(v) => handleInputChange("wearableConnected", v)}
          />
          <FloatingInput
            label={t("device_type")}
            value={formData.deviceType}
            onChange={(v) => handleInputChange("deviceType", v)}
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
            value={formData.dataStreams}
            onChange={(v) => handleInputChange("dataStreams", v)}
          />
        </div>
      </div>
    );
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
                  onClick={() =>
                    setActiveStep(Math.min(steps.length - 1, activeStep + 1))
                  }
                  className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  {t("next")}
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors duration-200">
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
