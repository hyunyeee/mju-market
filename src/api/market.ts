import { Axios } from './Axios';

export const getProducts = async (token: string | null, categoryId: number) => {
  const response = await Axios.get(
    `/api/categories/${categoryId + 1}/products`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.products;
};

export const getProduct = async (
  token: string | null,
  categoryId: number,
  productId: number,
) => {
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
