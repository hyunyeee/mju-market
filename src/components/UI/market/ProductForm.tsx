import styled from 'styled-components';
import React, { useState } from 'react';
import ProductInput from './ProductInput';

interface ProductFormValues {
  title: string;
  price: string;
  content: string;
}

const ProductForm = () => {
  const [formData, setFormData] = useState<ProductFormValues>({
    title: '',
    price: '',
    content: '',
  });

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
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
          <select>
            <option value="default">카테고리 선택</option>
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
