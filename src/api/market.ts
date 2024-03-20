import { Axios } from './Axios';

export const getProducts = async (token: string, categoryId: number) => {
  if (!token) {
    throw new Error('로그인 정보가 유효하지 않습니다.');
  }
  const response = await Axios.get(
    `/api/categories/${categoryId + 1}/products?pageSize=2`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const getProduct = async (
  token: string,
  categoryId: number,
  productId: number,
) => {
  if (!token) {
    throw new Error('로그인 정보가 유효하지 않습니다.');
  }
  const response = await Axios.get(
    `/api/categories/${categoryId + 1}/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
