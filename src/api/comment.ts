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
