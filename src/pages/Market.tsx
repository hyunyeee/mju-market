import { useState } from 'react';
import SelectCategory from '../components/UI/market/SelectCategory';
import ProductListItem from '../components/UI/market/ProductListItem';

export interface Iproduct {
  price: number;
  productId: number;
  title: string;
}

const Market = () => {
  const [productList, setProductList] = useState<Iproduct[]>([]);
  const dummy_category: string[] = ['1', '2', '3', '4', '5', '6'];

  return (
    <div>
      <SelectCategory
        dummy_category={dummy_category}
        setProductList={setProductList}
      />
      {productList?.length !== 0 && (
        <>
          {productList.map((product) => (
            <ProductListItem product={product} key={product.productId} />
          ))}
        </>
      )}
    </div>
  );
};

export default Market;
