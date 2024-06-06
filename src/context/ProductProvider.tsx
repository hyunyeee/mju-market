import { useEffect, useState } from 'react';
import { ProductContext } from './ProductContext';

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const localStorageValue = localStorage.getItem('productName');
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [productName, setProductName] = useState<string>(
    localStorageValue || '',
  );

  useEffect(() => {
    localStorage.setItem('productName', productName);
  }, [productName]);

  const productInfo = {
    categoryIndex,
    setCategoryIndex,
    productName,
    setProductName,
  };

  return (
    <ProductContext.Provider value={productInfo}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
