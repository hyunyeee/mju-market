import styled from 'styled-components';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from './AuthForm';
import { ReactComponent as ID_icon } from '../../assets/id_icon.svg';
import { ReactComponent as PWD_icon } from '../../assets/pwd_icon.svg';

type InputType = {
  type: string;
  name: 'id' | 'password';
  placeholder: string;
  register: UseFormRegister<FormValues>;
  errorMsg?: string;
};

type InputBoxProps = {
  isFocus: boolean;
  isError: boolean;
};

const AuthInput: React.FC<InputType> = ({
  type,
  name,
  placeholder,
  register,
  errorMsg,
}: InputType) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div>
      <InputBox isFocus={isFocus} isError={errorMsg !== ''}>
        {name === 'id' ? (
          <ID_ICON isFocus={isFocus} isError={errorMsg !== ''} />
        ) : (
          <PWD_ICON isFocus={isFocus} isError={errorMsg !== ''} />
        )}
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </InputBox>
      {errorMsg && <HelperText>{errorMsg}</HelperText>}
    </div>
  );
};

const InputBox = styled.div<InputBoxProps>`
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid
    ${({ theme, isFocus, isError }) =>
      isError
        ? theme.colors.RED
        : isFocus
          ? theme.colors.BLUE_2
          : theme.colors.LIGHT_GRAY};
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
const ID_ICON = styled(ID_icon)<InputBoxProps>`
  width: 24px;
  fill: ${({ theme, isFocus, isError }) =>
    isError
      ? theme.colors.RED
      : isFocus
        ? theme.colors.BLUE_2
        : theme.colors.LIGHT_GRAY};
`;
const PWD_ICON = styled(PWD_icon)<InputBoxProps>`
  width: 24px;
  fill: ${({ theme, isFocus, isError }) =>
    isError
      ? theme.colors.RED
      : isFocus
        ? theme.colors.BLUE_2
        : theme.colors.LIGHT_GRAY};
`;
export default AuthInput;
