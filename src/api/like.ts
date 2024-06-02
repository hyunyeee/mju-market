import { Axios } from './Axios';

type PatchLikeResponse = {
  boardId: number;
  likeStatus: boolean;
};

export const patchLike = async (token: string, boardId: number) => {
  const response = await Axios.patch<PatchLikeResponse>(
    `/api/boards/${boardId}/likes`,
    {
      boardId: boardId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.likeStatus;
};

export const patchMarketLike = async (
  token: string,
  categoryId: number,
  productId: number,
) => {
  const response = await Axios.patch<PatchLikeResponse>(
    `/api/categories/${categoryId}/products/${productId}/likes`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.likeStatus;
};
