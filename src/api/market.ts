import { Axios } from './Axios';
import { ProductFormValues } from '../components/UI/market/ProductForm';

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

export const postProduct = async (
  token: string,
  formData: ProductFormValues,
  categoryId: number | undefined,
) => {
  if (categoryId === 0) {
    throw new Error('카테고리를 선택해주세요.');
  }
  await Axios.post(
    `/api/categories/${categoryId}/products`,
    {
      title: formData.title,
      price: formData.price,
      content: formData.content,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};
