import { useState } from 'react';
import SelectCategory from '../components/UI/market/SelectCategory';
import ProductListItem from '../components/UI/market/ProductListItem';
import styled from 'styled-components';

export interface Product {
  price: number;
  id: number;
  title: string;
}

const Market = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const dummyCategory: string[] = ['1', '2', '3', '4', '5', '6'];

  return (
    <Container>
      <SelectCategory
        dummyCategory={dummyCategory}
        setProductList={setProductList}
      />
      <ListContainer>
        {productList.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </ListContainer>
    </Container>
  );
};

const Container = styled.div``;
const ListContainer = styled.div`
  margin-top: 60px;
`;
export default Market;
