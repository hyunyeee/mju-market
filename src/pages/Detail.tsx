import styled from 'styled-components';
import { ProductContext } from '../ProductContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProduct } from '../api/market';
import ProductActionBar from '../components/UI/market/ProductActionBar';

interface ProductDetail {
  content: string;
  ownerId: number;
  price: number;
  productId: number;
  title: string;
}

const Detail: React.FC = () => {
  const productContext = useContext(ProductContext);
  const [productObj, setProductObj] = useState<ProductDetail | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  const { content, ownerId, price, productId, title } = productObj || {};

  const fetchData = async () => {
    const response = await getProduct(
      productContext.categoryIndex,
      productContext.productId,
      navigate,
    );
    setProductObj(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      {productObj && (
        <>
          <ImageBox>image</ImageBox>
          <Information>
            <Author>Author {ownerId} &gt; </Author>
            <Counts>찜3 &nbsp; &nbsp; 조회10</Counts>
          </Information>
          <Content>
            <Title>{title}</Title>
            <Category>Category {productContext.categoryIndex}</Category>
            <TextBody>{content}</TextBody>
          </Content>
          <MenuBar price={price} />
        </>
      )}
    </Container>
  );
};

const Container = styled.div``;
const ImageBox = styled.section`
  height: 50vh;
  margin: -20px -20px 0;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const Information = styled.section`
  margin: 0 -20px;
  padding: 10px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  align-items: center;
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Author = styled.div`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Counts = styled.div`
  color: ${({ theme }) => theme.colors.TXT_LIGHT_GRAY};
`;
const Content = styled.section`
  margin-top: 30px;
`;
const Title = styled.h1`
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const Category = styled.p`
  text-decoration: underline ${({ theme }) => theme.colors.LIGHT_GRAY} solid;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const TextBody = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const MenuBar = styled(ProductActionBar)`
  width: 100%;
  height: 70px;
  margin-left: -20px;
  position: fixed;
  bottom: 0;
`;
export default Detail;
