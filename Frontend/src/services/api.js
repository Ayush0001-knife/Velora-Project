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


  