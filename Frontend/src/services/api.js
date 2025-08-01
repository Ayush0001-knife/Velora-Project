import axiosInstance from '../apis/axiosinstance';
import apiUrl from '../apis/apiUrls';

export const userLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post(apiUrl.LOGIN, {
      email,
      password,
    });

    console.log("Login response:", response.data);

    const data = response.data;

    if (data && data.data?.access_token) {
      const token = data.data.access_token;
      localStorage.setItem('access_token', token);
      console.log("Token saved to localStorage:", token);

      // ✅ Also store Authorization header if available
      const authHeader = response.headers['authorization'];
      if (authHeader) {
        localStorage.setItem('authorization', authHeader);
        console.log("Authorization header saved to localStorage:", authHeader);
      } else {
        console.warn("Authorization header not found in response headers");
      }

      const userInfo = {
        avatar: data.data.avatar || null,
        name: data.data.nickname || '',
        email: data.data.email || email,
      };

      return {
        token,
        user: userInfo,
      };
    } else {
      console.warn("No access token found in response");
      throw new Error("No access token in response");
    }
  } catch (error) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};


export const demographics = async (formData) => {
  const response = await axiosInstance.post(apiUrl.DEMOGRAPHICS, formData);
  return response.data;
};

export const anthropometrics = async (formData,patientId) => {
  const response = await axiosInstance.post(apiUrl.ANTHROPOMETRICS(patientId), formData);
  return response.data;
};

export const cardiorespiratory = async (formData,patientId) => {
  const response = await axiosInstance.post(apiUrl.CARDIORESPIRATORY(patientId), formData);
  return response.data;
};

export const nutrition = async (formData,patientId) => {
  const response = await axiosInstance.post(apiUrl.NUTRITION(patientId), formData);
  return response.data;
};

export const bloodTests = async (formData,patientId) => {
  const response = await axiosInstance.post(apiUrl.BLOODTESTS(patientId), formData);
  return response.data;
};

export const mentalHealth = async (formData,patientId) => {
  const response = await axiosInstance.post(apiUrl.MENTALHEALTH(patientId), formData);
  return response.data;
};

export const exercise = async (formData,patientId) => {
  const response = await axiosInstance.post(apiUrl.EXERCISE(patientId), formData);
  return response.data;
};

export const medicalHistory = async (formData,patientId) => {
  const response = await axiosInstance.post(apiUrl.MEDICALHISTORY(patientId), formData);
  return response.data;
};

export const goals = async (formData,patientId) => {
  const response = await axiosInstance.post(apiUrl.GOALS(patientId), formData);
  return response.data;
};

export const reportss = async (formData) => {
  const response = await axiosInstance.post(apiUrl.REPORTS, formData);
  return response.data;
};


export const demographicsPut = async (formData,patientId) => {
  const response = await axiosInstance.put(apiUrl.DEMOGRAPHICSPUT(patientId), formData);
  return response.data;
};

export const anthropometricsPut = async (formData,anthropometricsId) => {
  console.log("patientId in api request",anthropometricsId)
  const response = await axiosInstance.put(apiUrl.ANTHROPOMETRICSPUT(anthropometricsId), formData);
  return response.data;
};

export const cardiorespiratoryPut = async (formData,vitalId) => {
  const response = await axiosInstance.put(apiUrl.CARDIORESPIRATORYPUT(vitalId), formData);
  return response.data;
};

export const nutritionPut = async (formData,nutritionId) => {
  const response = await axiosInstance.put(apiUrl.NUTRITIONPUT(nutritionId), formData);
  return response.data;
};

export const bloodTestsPut = async (formData,bloodTestsId) => {
  const response = await axiosInstance.put(apiUrl.BLOODTESTSPUT(bloodTestsId), formData);
  return response.data;
};

export const mentalHealthPut = async (formData,mentalHealthId) => {
  const response = await axiosInstance.put(apiUrl.MENTALHEALTHPUT(mentalHealthId), formData);
  return response.data;
};

export const exercisePut = async (formData,exerciseId) => {
  /**
   * @typedef {Object} ExercisePutResponse
   * @property {boolean} success - Whether the request was successful
   * @property {string} message - A message about the request
   * @property {Exercise} data - The Exercise object with the updated data
   *
   * @type {Promise<ExercisePutResponse>}
   */
  const response = await axiosInstance.put(apiUrl.EXERCISEPUT(exerciseId), formData);
  return response.data;
};

export const medicalHistoryPut = async (formData,medicalHistoryId) => {
  const response = await axiosInstance.put(apiUrl.MEDICALHISTORYPUT(medicalHistoryId), formData);
  return response.data;
};

export const patientGet = async () => {
  const response = await axiosInstance.get(apiUrl.PATIENTLIST);
  return response.data;
};

export const patientAllData = async (patientId) => {
  const response = await axiosInstance.get(apiUrl.PATIENTALLDATA(patientId));
  return response.data;
}






  