import { Axios } from './Axios';

const token = localStorage.getItem('token');

export const getProducts = async (categoryId: number) => {
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

export const getProduct = async (categoryId: number, productId: number) => {
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
