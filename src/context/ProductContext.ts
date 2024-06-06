import { createContext } from 'react';

interface ProductContext {
  categoryIndex: number;
  setCategoryIndex: (index: number) => void;
  productName: string;
  setProductName: (index: string) => void;
}

export const ProductContext = createContext<ProductContext>({
  categoryIndex: 0,
  setCategoryIndex: () => {},
  productName: '',
  setProductName: () => {},
});
