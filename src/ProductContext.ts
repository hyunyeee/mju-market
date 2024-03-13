import { createContext } from 'react';

interface IProductContext {
  categoryIndex: number;
  setCategoryIndex: (index: number) => void;
  productId: number;
  setProductId: (index: number) => void;
}

export const ProductContext = createContext<IProductContext>({
  categoryIndex: 0,
  setCategoryIndex: () => {},
  productId: 1,
  setProductId: () => {},
});
