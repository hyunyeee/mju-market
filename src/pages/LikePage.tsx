import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLikeList } from '../api/like';
import useToken from '../hooks/useToken';
import ProductListItem from '../components/UI/market/ProductListItem';
import { Product } from '../types';

const LikePage = () => {
  const [likeList, setLikeList] = useState<Product[]>();
  const token = useToken();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await getLikeList(token, 0);
      setLikeList(response);
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
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <Container>
      <H1>좋아요한 상품 목록</H1>
      <LikeList>
        {likeList?.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </LikeList>
    </Container>
  );
};

const Container = styled.div``;
const H1 = styled.h1`
  padding: 20px;
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const LikeList = styled.div`
  width: 100%;
  height: calc(100vh - 60px - 90px);
  overflow: scroll;
`;

export default LikePage;
