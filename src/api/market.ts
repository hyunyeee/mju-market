import { Axios } from './Axios';

export const getProducts = async (
  token: string,
  categoryId: number,
  productId: unknown,
  pageSize: number,
) => {
  const response = await Axios.get(
    `/api/categories/${categoryId}/products?${productId ? `productId=${productId}&` : ''}pageSize=${pageSize}`,
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
    `/api/categories/${categoryId}/products/${productId}`,
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
  formData: FormData,
  categoryId: number,
) => {
  await Axios.post(`/api/categories/${categoryId}/products`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProduct = async (
  token: string,
  formData: FormData,
  categoryId: number,
  productId: number | undefined,
) => {
  await Axios.patch(
    `/api/categories/${categoryId}/products/${productId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteProduct = async (
  token: string,
  categoryId: number,
  productId: number,
) => {
  await Axios.delete(`/api/categories/${categoryId}/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const buyProduct = async (
  token: string,
  categoryId: number,
  productId: number,
  price: number,
) => {
  await Axios.post(
    `/api/categories/${categoryId}/products/${productId}`,
    {
      usingCouponIds: [],
      productOriginalPrice: price,
      productDiscountPrice: price,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
