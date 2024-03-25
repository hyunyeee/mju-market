import { Axios } from './Axios';
import { AuthFormValues } from '../types';

interface Token {
  token: string;
}

export const submitAuthForm = async (data: AuthFormValues, path: string) => {
  const response = await Axios.post<Token>(`/api/${path}`, {
    email: data.id,
    password: data.password,
  });
  if (response.status === 200) {
    return response.data.token;
  }
  throw new Error('로그인 정보가 유효하지 않습니다.');
};
