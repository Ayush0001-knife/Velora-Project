import axiosInstance from '../apis/axiosinstance';
import apiUrl from '../apis/apiUrls';


export const loginUser = async (credentials) => {
  const response = await axiosInstance.post(apiUrl.LOGIN, credentials);
  return response.data;
};

export const demographics = async (credentials) => {
  const response = await axiosInstance.post(apiUrl.DEMOGRAPHICS, credentials);
  return response.data;
};