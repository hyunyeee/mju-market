import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import ImageGallery from 'react-image-gallery';

import { getProduct, deleteProduct } from '../../api/market';
import useToken from '../../hooks/useToken';
import { calculateTime } from '../../hooks/calculateTime';
import { Images, ImagesArr, ProductDetail } from '../../types';
import ProductActionBar from '../../components/UI/market/ProductActionBar';
import BackButton from '../../components/UI/BackButton';
import mjuLogo from '../../assets/img/mju_logo.jpg';

import './customGallery.css';

const Detail: React.FC = () => {
  const { productId } = useParams();
  const { categoryIndex, setProductName } = useContext(ProductContext);
  const [productObj, setProductObj] = useState<ProductDetail>();
  const [images, setImages] = useState<ImagesArr[]>([
    {
      original: mjuLogo,
      thumbnail: mjuLogo,
      originalClass: 'custom-image',
      thumbnailClass: 'custom-thumbnail',
    },
  ]);
  const {
    id,
    location,
    title,
    content,
    price = 0,
    visitedCount,
    ownerNickname,
    likedCount = 0,
    ownerId,
    isMyProduct = false,
    isLikedAlreadyByMe = false,
    createDate,
  } = productObj || {};
  const token = useToken();
  const navigate = useNavigate();
  const parsedRelativeTime = calculateTime(createDate);

  const handleDelete = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      if (confirm('상품을 삭제할까요?')) {
        await deleteProduct(token, categoryIndex, Number(productId));
        window.location.replace('/');
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
      setProductObj(response.product);
      setProductName(response.product.title);
      if (response.images.length !== 0) {
        const imageArray = response.images.map((image: Images) => ({
          original: image.url,
          thumbnail: image.url,
          originalClass: 'custom-image',
          thumbnailClass: 'custom-thumbnail',
        }));
        setImages(imageArray);
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

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <Container>
      <BackButton />
      {productObj && token && (
        <>
          <ImageBox>
            <ImageGallery items={images} showBullets={true} />
          </ImageBox>
          <Information>
            <Author>{ownerNickname}</Author>
            <Counts>
              찜{likedCount} &nbsp; &nbsp; 조회{visitedCount}
            </Counts>
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
          <MenuBar
            price={price}
            token={token}
            id={Number(id)}
            ownerId={Number(ownerId)}
            isMyProduct={isMyProduct}
            likedCount={likedCount}
            isLikedAlreadyByMe={isLikedAlreadyByMe}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.div``;
const ImageBox = styled.section`
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.TXT_GRAY};
  & > div {
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
