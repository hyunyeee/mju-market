import axios from 'axios';
import { Axios } from './Axios';
import { NavigateFunction } from 'react-router-dom';

const token = localStorage.getItem('token');

export const getProducts = async (
  categoryId: number,
  navigate: NavigateFunction,
) => {
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

export const getProduct = async (
  categoryId: number,
  productId: number,
  navigate: NavigateFunction,
) => {
  try {
    const response = await Axios.get(
      `/api/categories/${categoryId + 1}/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 401) {
        navigate('/login');
      }
    }
  }
};
