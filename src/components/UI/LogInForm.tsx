import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { schema } from '../../validation/schema';
import { AuthFormValues } from '../../types';
import { submitAuthForm } from '../../api/auth';
import AuthInput from './AuthInput';

const LogInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const onSubmit = async (data: AuthFormValues) => {
    try {
      const token = await submitAuthForm(data, 'login');
      localStorage.setItem('token', token);
      if (token !== undefined) {
        navigate('/');
      } else {
        alert('로그인 정보가 유효하지 않습니다.');
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <AuthInput
          type="text"
          name="id"
          placeholder="아이디"
          register={register}
          errorMsg={errors?.id?.message ?? ''}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="비밀번호"
          register={register}
          errorMsg={errors?.password?.message ?? ''}
        />
      </InputContainer>
      <Button type="submit">로그인</Button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
`;
const InputContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  gap: 10px;
`;
const Button = styled.button`
  width: 100%;
  height: 56px;
  margin-bottom: 40px;
  border-radius: 6px;
  color: white;
  ${({ theme }) => theme.typographies.BIG_TXT};
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;
export default LogInForm;
