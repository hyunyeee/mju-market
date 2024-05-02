import { Axios } from './Axios';
import { BoardFormValues } from '../types';

export const getBoard = async (token: string, boardId: number) => {
  if (!token) {
    throw new Error('로그인 정보가 유효하지 않습니다.');
  }
  const response = await Axios.get(`/api/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postBoard = async (token: string, formData: BoardFormValues) => {
  await Axios.post(`/api/boards`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateBoard = async (
  token: string,
  formData: BoardFormValues,
  boardId: number | undefined,
) => {
  await Axios.patch(`/api/boards/${boardId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteBoard = async (token: string, boardId: number) => {
  await Axios.delete(`/api/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
