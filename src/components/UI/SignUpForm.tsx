import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signup_schema } from '../../validation/schema';
import AuthInput from './AuthInput';
import { useEffect } from 'react';

export type SignUpFormValues = {
  id: string;
  password: string;
  password_check: string;
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signup_schema),
    mode: 'onChange',
  });
  const onSubmit = (data: SignUpFormValues) => console.log(data);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'password') {
        trigger('password_check');
      }
    });
    return () => subscription.unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [watch, trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <AuthInput<SignUpFormValues>
          type="text"
          name="id"
          placeholder="아이디"
          register={register}
          errorMsg={errors?.id?.message ?? ''}
        />
        <AuthInput<SignUpFormValues>
          type="password"
          name="password"
          placeholder="비밀번호"
          register={register}
          errorMsg={errors?.password?.message ?? ''}
        />
        <AuthInput<SignUpFormValues>
          type="password"
          name="password_check"
          placeholder="비밀번호 재입력"
          register={register}
          errorMsg={errors?.password_check?.message ?? ''}
        />
      </InputContainer>
      <Button type="submit">회원가입</Button>
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
export default SignUpForm;
