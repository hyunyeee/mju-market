import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import { postBoard } from '../../../api/board';
import ProductInput from '../market/ProductInput';
import { BoardFormValues } from '../../../types';

const BoardForm = () => {
  const [formData, setFormData] = useState<BoardFormValues>({
    title: '',
    content: '',
  });

  const token = useToken();
  const navigate = useNavigate();

  const isFormValid = () => {
    return formData.title.trim() !== '' && formData.content.trim() !== '';
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      if (isFormValid()) {
        await postBoard(token, formData);
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

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      </Content>
      <ProductInput
        type="text"
        name="content"
        placeholder="내용을 작성해주세요"
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
const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 6px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  color: white;
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;

export default BoardForm;
