import { useState } from 'react';
import { ProductContext } from './ProductContext';

const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const [productId, setProductId] = useState<number>(0);

  const productInfo = {
    categoryIndex,
    setCategoryIndex,
    productId,
    setProductId,
  };

  return (
    <ProductContext.Provider value={productInfo}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
