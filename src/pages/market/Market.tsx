import styled from 'styled-components';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ProductContext } from '../../context/ProductContext';
import SelectCategory from '../../components/UI/market/SelectCategory';
import ProductListItem from '../../components/UI/market/ProductListItem';
import useCategoryProductQuery from '../../hooks/useCategoryProductQuery';
import { Product } from '../../types';
import WriteButton from '../../components/UI/WriteButton';

const Market = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const { categoryIndex } = useContext(ProductContext);
  const { ref, inView } = useInView();
  const location = useLocation();
  const initialPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== initialPath.current) {
      window.location.reload();
      initialPath.current = location.pathname;
    }
  }, [location]);

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useCategoryProductQuery({
      categoryId: categoryIndex,
      pageSize: 10,
    });

  if (isError) {
    const errorMessage = (error as Error)?.message;
    return <div>에러가 발생했습니다: {errorMessage}</div>;
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const products = data.pages.flat();
      setProductList(products);
    }
  }, [data, isLoading, isError, setProductList]);

  const setRef = ref as React.RefCallback<HTMLDivElement>;

  return (
    <Container>
      <SelectCategory />
      <ListContainer>
        {productList.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </ListContainer>
      {isFetchingNextPage ? (
        <div>로딩중!!!!!!!!!!!!</div>
      ) : (
        <div ref={setRef} />
      )}
      <WriteButton path="/write" />
    </Container>
  );
};

const Container = styled.div``;
const ListContainer = styled.div`
  margin: 60px 0 90px;
`;
export default Market;
