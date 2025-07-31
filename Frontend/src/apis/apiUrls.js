// src/apis/apiUrls.js

const apiUrls = {
  LOGIN: '/v1/user/login',
  DEMOGRAPHICS: '/v1/patient/patient',
  ANTHROPOMETRICS:(id) => `/v1/patient_anthropmetrics/patients/anthropometrics/${id}`,
  MEDICALHISTORY:(id) => `/v1/patient_medical_history/medical_history/${id}`,
  NUTRITION:(id) => `/v1/patient_nutration/patients/nutrition/${id}`,
  CARDIORESPIRATORY:(id) => `/v1/patient_cardiorespiratory/patients/cardiorespiratory/${id}`,
  BLOODTESTS:(id) => `/v1/patient_blood_test/patient/${id}/blood_test`,
  MENTALHEALTH:(id) => `/v1/patient_mental_health/mental_health/${id}`,
  EXERCISE:(id) => `/v1/patient_exercise/patients/exercise/${id}`,
  GOALS:(id) => `/v1/patient_goals/goals/${id}`,
  REPORTS: `/v1/patient_analysis/patient_analysis`,
};

export default apiUrls;
