import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postProduct, updateProduct } from '../../../api/market';
import useToken from '../../../hooks/useToken';
import ProductInput from './ProductInput';
import { ProductDetail, ProductFormValues } from '../../../types';
import { categories } from '../../../assets/data/categories';
import { places } from '../../../assets/data/places';
import camera from '../../../assets/img/camera.svg';
import deleteBtn from '../../../assets/img/delete_image.svg';

interface ProductFormProps {
  productObj?: ProductDetail;
}

const ProductForm: React.FC<ProductFormProps> = ({ productObj }) => {
  const [categoryId, setCategoryId] = useState(0);
  const [place, setPlace] = useState('');

  const token = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<ProductFormValues>({
    title: '',
    price: '',
    content: '',
    location: 'BUILDING_THREE',
    categoryId: 0,
    images: [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
    }
  };

  const handleDelete = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'price' ? parseInt(value) : value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.price !== 0 &&
      formData.price !== '' &&
      formData.content.trim() !== ''
    );
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      const data = new FormData();
      data.append('title', formData.title);
      data.append('price', formData.price.toString());
      data.append('content', formData.content);
      data.append('location', formData.location);
      data.append('categoryId', categoryId.toString());

      if (formData.images) {
        formData.images.forEach((image) => {
          data.append('images', image);
        });
      }
      if (isFormValid()) {
        if (location.pathname === '/write') {
          await postProduct(token, data, categoryId);
          navigate('/');
        } else {
          await updateProduct(token, data, categoryId, productObj?.id);
          navigate('/');
        }
      } else {
        alert('모든 입력 필드를 채워주세요.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data);
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    if (productObj) {
      setFormData({
        title: productObj.title,
        price: productObj.price,
        content: productObj.content,
        location: productObj.location,
        categoryId: productObj.categoryId,
        images: [],
      });
      setCategoryId(productObj.categoryId ?? 0);
    }
  }, [productObj]);

  return (
    <Form onSubmit={onSubmit}>
      <AddImageContainer>
        <SubTitle>상품 이미지 등록</SubTitle>
        <ImageBox>
          <AddButton>
            <Label htmlFor="file-input">
              <img src={camera} alt="카메라 아이콘" />
              {formData.images.length}/10
            </Label>
            <input
              id="file-input"
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </AddButton>
          {formData.images &&
            formData.images.map((image, index) => (
              <Image key={index}>
                <Img
                  src={URL.createObjectURL(image)}
                  alt={`이미지 ${index + 1}`}
                />
                <DeleteBtn
                  onClick={() => handleDelete(index)}
                  src={deleteBtn}
                  alt="삭제 버튼"
                />
              </Image>
            ))}
        </ImageBox>
      </AddImageContainer>
      <Content>
        <ProductInput
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          value={formData.title}
          onChange={onChange}
        />
        <ProductInput
          type="number"
          name="price"
          placeholder="가격을 입력해주세요."
          value={formData.price}
          onChange={onChange}
        />
        <Category>
          <select
            value={place}
            onChange={(e) => {
              const newPlace = e.target.value;
              setPlace(newPlace);
              setFormData((prevState) => ({
                ...prevState,
                location: newPlace,
              }));
            }}
          >
            {places.map((place) => (
              <option key={place.id} value={place.name}>
                {place.koName}
              </option>
            ))}
          </select>
        </Category>
        <Category>
          <select
            value={categoryId}
            onChange={(e) => {
              const newCategoryId = Number(e.target.value);
              setCategoryId(newCategoryId);
              setFormData((prevState) => ({
                ...prevState,
                categoryId: newCategoryId,
              }));
            }}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Category>
      </Content>
      <ProductInput
        type="textarea"
        name="content"
        placeholder="제품 설명을 작성해주세요"
        value={formData.content}
        onChange={onChange}
      />
      <SubmitButton type="submit">작성 완료</SubmitButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
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
const AddButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-shrink: 0;
  label {
    cursor: pointer;
  }
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
`;
const Image = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  flex-shrink: 0;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: cover;
`;
const DeleteBtn = styled.img`
  position: absolute;
  z-index: 1;
  top: -5px;
  right: -8px;
  cursor: pointer;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};

  & > div {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    height: 60px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  }
`;
const Category = styled.div``;
const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 6px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  color: white;
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;

export default ProductForm;
