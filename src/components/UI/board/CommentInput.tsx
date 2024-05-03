import styled from 'styled-components';
import sendIcon from '../../../assets/prime_send.svg';

const CommentInput = () => {
  return (
    <InputContainer onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <Input />
      <Button type="submit">
        <img src={sendIcon} />
      </Button>
    </InputContainer>
  );
};

const InputContainer = styled.form`
  width: 100vw;
  height: 50px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  display: flex;
  gap: 10px;
  background-color: white;
`;
const Input = styled.input`
  padding: 0 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
`;
const Button = styled.button`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 4px;
`;
export default CommentInput;
