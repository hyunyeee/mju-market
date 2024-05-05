import styled from 'styled-components';
import React, { useState } from 'react';

interface modifyCommentProps {
  boardId: number;
  commentId: number;
  modifyComment: string;
  setIsModalOpen: (isOpen: boolean) => void;
}
const CommentModifyPage: React.FC<modifyCommentProps> = ({
  boardId,
  commentId,
  modifyComment,
  setIsModalOpen,
}) => {
  const [modifyValue, setModifyValue] = useState<string>(modifyComment);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyValue(e.target.value);
  };
  const onClick = () => {
    console.log(boardId);
    console.log(commentId);
    console.log(modifyValue);
  };
  return (
    <Container>
      <TextArea value={modifyValue} onChange={(e) => onChange(e)} />
      <Buttons>
        <Button onClick={() => setIsModalOpen(false)}>취소</Button>
        <Button onClick={onClick}>수정</Button>
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const TextArea = styled.textarea`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
const Button = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 6px;
  color: white;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;
export default CommentModifyPage;
