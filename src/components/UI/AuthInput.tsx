import styled from 'styled-components';

type InputType = {
  children: React.ReactNode;
  type: string;
};

const AuthInput = ({ children, type }: InputType) => {
  return (
    <InputBox>
      {children}
      <Input type={type} />
    </InputBox>
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
export default AuthInput;
