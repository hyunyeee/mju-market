import { Axios } from './Axios';
import { AuthFormValues } from '../types';

export const submitAuthForm = async (data: AuthFormValues, path: string) => {
  const response = await Axios.post(`/api/${path}`, {
    email: data.id,
    password: data.password,
  });
  if (response.status === 200) {
    return response.data.token;
  }
};
