import axios from 'axios';
import { Axios } from './Axios';
import { NavigateFunction } from 'react-router-dom';

export const getProducts = async (
  categoryId: number,
  navigate: NavigateFunction,
) => {
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
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 401) {
        navigate('/login');
      }
    }
  }
};
