import axios from 'axios';
import { Axios } from './Axios';
import { AuthFormValues } from '../types';

export const submitAuthForm = async (data: AuthFormValues, path: string) => {
  try {
    const response = await Axios.post(`/api/${path}`, {
      email: data.id,
      password: data.password,
    });
    if (response.status === 200) return response.data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(error?.response?.data);
    }
  }
};
