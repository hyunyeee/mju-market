import { Axios } from './Axios';
import { BoardFormValues } from '../types';

export const postBoard = async (token: string, formData: BoardFormValues) => {
  console.log(formData);
  await Axios.post(`/api/boards`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
