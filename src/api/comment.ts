import { Axios } from './Axios';

export const postComment = async (
  token: string,
  boardId: number,
  comment?: string,
) => {
  await Axios.post(
    `/api/boards/${boardId}/comments`,
    { comment: comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const getComments = async (token: string, boardId: number) => {
  if (!token) {
    throw new Error('로그인 정보가 유효하지 않습니다.');
  }
  const response = await Axios.get(
    `/api/boards/${boardId}/comments?pageSize=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
