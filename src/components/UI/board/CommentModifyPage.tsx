import styled from 'styled-components';
import React, { useState } from 'react';
import useToken from '../../../hooks/useToken';
import { updateComments } from '../../../api/comment';

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
  const token = useToken();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModifyValue(e.target.value);
  };
  const onClick = async () => {
    if (!token) {
      alert('로그인 정보가 유효하지 않습니다.');
      return;
    }
    await updateComments(token, boardId, commentId, modifyValue);
    alert('수정되었습니다');
    setIsModalOpen(false);
    window.location.reload();
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
