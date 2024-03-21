import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ProductContext } from '../ProductContext';
import { getProduct } from '../api/market';
import ProductActionBar from '../components/UI/market/ProductActionBar';

interface ProductDetail {
  content: string;
  ownerId: number;
  price: number;
  title: string;
}

const Detail: React.FC = () => {
  const { productId } = useParams();
  const { categoryIndex } = useContext(ProductContext);
  const [productObj, setProductObj] = useState<ProductDetail>();
  const { content, ownerId, price = 0, title } = productObj || {};

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인 정보가 유효하지 않습니다.');
        navigate('/login');
        return;
      }
      const id = Number(productId);
      if (isNaN(id)) {
        alert('잘못된 접근입니다.');
        navigate('/');
        return;
      }
      const response = await getProduct(token, categoryIndex, id);
      setProductObj(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data);
        navigate('/');
        if (error?.response?.status === 401) {
          navigate('/login');
        }
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
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
            <Category>Category {categoryIndex}</Category>
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
