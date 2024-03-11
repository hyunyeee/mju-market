import { Axios } from './Axios';

export const getProducts = async (categoryId: number) => {
  const token = localStorage.getItem('token');

  try {
    const response = await Axios.get(
      `/api/categories/${categoryId + 1}/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.products;
  } catch (error) {
    console.log(error);
  }
};
