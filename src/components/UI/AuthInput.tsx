import styled from 'styled-components';
import { useState } from 'react';
import { UseFormRegister, FieldValues, FieldPath } from 'react-hook-form';
import { ReactComponent as ID_icon } from '../../assets/img/id_icon.svg';
import { ReactComponent as PWD_icon } from '../../assets/img/pwd_icon.svg';

interface InputType<T extends FieldValues> {
  type: string;
  name: keyof T;
  placeholder: string;
  register: UseFormRegister<T>;
  errorMsg?: string;
}

type InputBoxProps = {
  $isFocus: boolean;
  $isError: boolean;
};

function AuthInput<T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  errorMsg,
}: InputType<T>) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const IconComponent = name === 'id' ? ID_ICON : PWD_ICON;

  return (
    <div>
      <InputBox $isFocus={isFocus} $isError={errorMsg !== ''}>
        <IconComponent $isFocus={isFocus} $isError={errorMsg !== ''} />
        <Input
          type={type}
          placeholder={placeholder}
          // 'name'을 'FieldPath<T>'로 캐스팅: react-hook-form의 엄격한 타입 요구사항을 충족
          {...register(name as FieldPath<T>)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </InputBox>
      {errorMsg && <HelperText>{errorMsg}</HelperText>}
    </div>
  );
}

const InputBox = styled.div<InputBoxProps>`
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid
    ${({ theme, $isFocus, $isError }) =>
      $isError
        ? theme.colors.RED
        : $isFocus
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
  fill: ${({ theme, $isFocus, $isError }) =>
    $isError
      ? theme.colors.RED
      : $isFocus
        ? theme.colors.BLUE_2
        : theme.colors.LIGHT_GRAY};
`;
const PWD_ICON = styled(PWD_icon)<InputBoxProps>`
  width: 24px;
  fill: ${({ theme, $isFocus, $isError }) =>
    $isError
      ? theme.colors.RED
      : $isFocus
        ? theme.colors.BLUE_2
        : theme.colors.LIGHT_GRAY};
`;
export default AuthInput;
