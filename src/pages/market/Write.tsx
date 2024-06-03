import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProductContext } from '../../context/ProductContext';
import {
  useNavigate,
  useParams,
  useLocation,
  useMatch,
} from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { getProduct } from '../../api/market';
import ProductForm from '../../components/UI/market/ProductForm';
import BackButton from '../../components/UI/BackButton';
import { ProductDetail } from '../../types';

const Write: React.FC = () => {
  const { productId } = useParams();
  const { categoryIndex } = useContext(ProductContext);
  const token = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const matchWrite = useMatch('/write');
  const matchModify = useMatch('/modify/:productId');
  const [productObj, setProductObj] = useState<ProductDetail>();

  /**
   * productId 가 null 이면 이 함수를 호출하면 안 됨
   */
  const fetchData = async () => {
    try {
      if (!token) {
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
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = false; // Chrome에서 returnValue set 필요
    };

    if (matchWrite || matchModify) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (token && productId) {
      fetchData();
    }
  }, [token]);

  return (
    <Container>
      <BackButton />
      <Title>글쓰기</Title>
      <ProductForm productObj={productObj} />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const Title = styled.h1`
  margin: 20px auto 0;
  text-align: center;
  ${({ theme }) => theme.typographies.BIG_TXT};
`;

export default Write;
