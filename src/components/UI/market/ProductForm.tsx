import styled from 'styled-components';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductInput from './ProductInput';
import { postProduct } from '../../../api/market';

export interface ProductFormValues {
  title: string;
  price: number | string;
  content: string;
}

const ProductForm = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [formData, setFormData] = useState<ProductFormValues>({
    title: '',
    price: '',
    content: '',
  });
  const navigate = useNavigate();

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
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인 정보가 유효하지 않습니다.');
        navigate('/login');
        return;
      }
      if (categoryId === 0) {
        alert('카테고리를 선택해주세요.');
        return;
      }
      if (isFormValid()) {
        await postProduct(token, formData, categoryId);
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
  return (
    <Form onSubmit={onSubmit}>
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
          <select onChange={(e) => setCategoryId(Number(e.target.value))}>
            <option value="0">카테고리 선택</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </Category>
      </Content>
      <ProductInput
        type="text"
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
