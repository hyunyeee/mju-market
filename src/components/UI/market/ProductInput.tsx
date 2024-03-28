import React from 'react';
import styled from 'styled-components';
import remove_btn from '../../../assets/x.svg';

interface ProductInput {
  type?: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ProductInput = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}: ProductInput) => {
  return (
    <InputBox>
      {name === 'content' ? (
        <TextArea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <>
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <RemoveButton>
            <DeleteIcon src={remove_btn} />
          </RemoveButton>
        </>
      )}
    </InputBox>
  );
};

const InputBox = styled.div``;
const Input = styled.input`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const RemoveButton = styled.button`
  height: 100%;
`;
const DeleteIcon = styled.img`
  margin-top: 3px;
`;
const TextArea = styled.textarea`
  height: 300px;
  padding: 20px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  border: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  border-radius: 8px;
`;
export default ProductInput;
