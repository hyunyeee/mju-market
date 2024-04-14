import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../ProductContext';
import SelectCategory from '../components/UI/market/SelectCategory';
import ProductListItem from '../components/UI/market/ProductListItem';
import useCategoryProductQuery from '../hooks/useCategoryProductQuery';

export interface Product {
  price: number;
  id: number;
  title: string;
}

const Market = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const dummyCategory: string[] = ['1', '2', '3', '4', '5', '6'];
  const { categoryIndex } = useContext(ProductContext);

  const token = localStorage.getItem('token') || '';

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useCategoryProductQuery({
      token,
      categoryId: categoryIndex,
      pageSize: 5,
    });

  if (isError) {
    const errorMessage = (error as Error)?.message;
    return <div>에러가 발생했습니다: {errorMessage}</div>;
  }

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const products = data.pages.flat();
      setProductList(products);
    }
  }, [data, isLoading, isError, setProductList]);

  return (
    <Container>
      <SelectCategory dummyCategory={dummyCategory} />
      <ListContainer>
        {productList.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </ListContainer>
      {isFetchingNextPage ? (
        <div>로딩중!!!!!!!!!!!!</div>
      ) : (
        //TODO 바닥에 닿았을 때 이게 실행 되도록 바꿔야함!
        <button onClick={() => fetchNextPage()}>다음 페이지</button>
      )}
    </Container>
  );
};

const Container = styled.div``;
const ListContainer = styled.div`
  margin-top: 60px;
`;
export default Market;
