import styled from 'styled-components';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from './AuthForm';

type InputType = {
  children: React.ReactNode;
  type: string;
  name: 'id' | 'password';
  placeholder: string;
  register: UseFormRegister<FormValues>;
  errorMsg?: string;
};

const AuthInput = ({
  children,
  type,
  name,
  placeholder,
  register,
  errorMsg,
}: InputType) => {
  return (
    <div>
      <InputBox>
        {children}
        <Input type={type} placeholder={placeholder} {...register(name)} />
      </InputBox>
      {errorMsg && <HelperText>{errorMsg}</HelperText>}
    </div>
  );
};

const InputBox = styled.div`
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  border-radius: 6px;
`;
const Input = styled.input`
  width: 100%;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const HelperText = styled.p`
  margin: 4px;
  color: ${({ theme }) => theme.colors.RED};
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
export default AuthInput;
