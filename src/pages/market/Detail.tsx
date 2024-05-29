import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { ProductContext } from '../../context/ProductContext';

import { getProduct, deleteProduct } from '../../api/market';
import useToken from '../../hooks/useToken';
import { calculateTime } from '../../hooks/calculateTime';
import ProductActionBar from '../../components/UI/market/ProductActionBar';
import BackButton from '../../components/UI/BackButton';
import { ProductDetail } from '../../types';
import './customGallery.css';

const Detail: React.FC = () => {
  const { productId } = useParams();
  const { categoryIndex } = useContext(ProductContext);
  const [productObj, setProductObj] = useState<ProductDetail>();
  const {
    id,
    content,
    location,
    price = 0,
    title,
    visitedCount,
    ownerNickname,
    isMyProduct,
    createDate,
  } = productObj || {};
  const token = useToken();
  const navigate = useNavigate();
  const parsedRelativeTime = calculateTime(createDate);

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
      originalClass: 'custom-image',
      thumbnailClass: 'custom-thumbnail',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
      originalClass: 'custom-image',
      thumbnailClass: 'custom-thumbnail',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
      originalClass: 'custom-image',
      thumbnailClass: 'custom-thumbnail',
    },
  ];

  const handleDelete = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      if (confirm('상품을 삭제할까요?')) {
        await deleteProduct(token, categoryIndex, Number(productId));
        navigate('/');
      }
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
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <Container>
      <BackButton />
      {productObj && (
        <>
          <ImageBox>
            <ImageGallery items={images} showBullets={true} />
          </ImageBox>
          <Information>
            <Author>{ownerNickname}</Author>
            <Counts>찜3 &nbsp; &nbsp; 조회{visitedCount}</Counts>
          </Information>
          {isMyProduct && (
            <Buttons>
              <Button onClick={() => navigate(`/modify/${id}`)}>수정</Button>
              <Button onClick={() => handleDelete()}>삭제</Button>
            </Buttons>
          )}
          <Content>
            <Time>{location}</Time>
            <Time>{parsedRelativeTime}</Time>
            <Title>{title}</Title>
            <Category>Category {categoryIndex + 1}</Category>
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
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
  & > div {
    width: 100vw;
    overflow: hidden;
  }
`;
const Information = styled.section`
  padding: 10px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  align-items: center;
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Author = styled.div`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const Counts = styled.div`
  color: ${({ theme }) => theme.colors.TXT_LIGHT_GRAY};
`;
const Content = styled.section`
  padding: 20px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;
const Button = styled.button`
  width: 50px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 4px;
`;
const Time = styled.div`
  ${({ theme }) => theme.typographies.SMALL_TXT};
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
  position: fixed;
  bottom: 0;
`;
export default Detail;
