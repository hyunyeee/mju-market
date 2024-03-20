import { useState } from 'react';
import SelectCategory from '../components/UI/market/SelectCategory';
import ProductListItem from '../components/UI/market/ProductListItem';

export interface Product {
  price: number;
  id: number;
  title: string;
}

const Market = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const dummyCategory: string[] = ['1', '2', '3', '4', '5', '6'];

  return (
    <div>
      <SelectCategory
        dummyCategory={dummyCategory}
        setProductList={setProductList}
      />
      {productList.map((product) => (
        <ProductListItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Market;
