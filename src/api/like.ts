import { Axios } from './Axios';
import { Product } from '../types';

type PatchLikeResponse = {
  boardId: number;
  likeStatus: boolean;
};

export const getLikeList = async (token: string, categoryId: number) => {
  const response = await Axios.get<Product[]>(
    `/api/categories/${categoryId}/products/likes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
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
  const response = await Axios.patch<boolean>(
    `/api/categories/${categoryId}/products/${productId}/likes`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
