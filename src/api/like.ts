import { Axios } from './Axios';

type PatchLikeResponse = {
  boardId: number;
  likeStatus: boolean;
};

export const patchLike = async (
  token: string,
  isLiked: boolean,
  boardId: number,
) => {
  const response = await Axios.patch<PatchLikeResponse>(
    `/api/boards/${boardId}/likes`,
    {
      boardId: boardId,
      likeStatus: isLiked,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.likeStatus;
};
