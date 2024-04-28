import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import useToken from '../hooks/useToken';
import { getProduct } from '../api/market';
import ProductForm from '../components/UI/market/ProductForm';
import { ProductDetail } from '../types';
import camera from '../assets/camera.svg';
import delete_img_btn from '../assets/delete_image.svg';

const Write: React.FC = () => {
  const { productId } = useParams();
  const { categoryIndex } = useContext(ProductContext);
  const token = useToken();
  const navigate = useNavigate();
  const [productObj, setProductObj] = useState<ProductDetail>();

  const fetchData = async () => {
    try {
      if (!productId) {
        setProductObj(undefined);
        return;
      }
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
      <Title>글쓰기</Title>
      <AddImageContainer>
        <SubTitle>상품 이미지 등록</SubTitle>
        <ImageBox>
          <AddButton>
            <img src={camera} />
            5/10
          </AddButton>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
        </ImageBox>
      </AddImageContainer>
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
const SubTitle = styled.h2`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const AddImageContainer = styled.div`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const ImageBox = styled.div`
  padding: 10px 0;
  display: flex;
  gap: 12px;
  overflow-x: scroll;
`;
const AddButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-shrink: 0;
`;
const Image = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  flex-shrink: 0;
`;
const DeleteBtn = styled.img`
  position: absolute;
  z-index: 1;
  top: -5px;
  right: -8px;
  cursor: pointer;
`;

export default Write;
