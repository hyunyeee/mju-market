import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface ModalProps {
  boardId: number;
  commentId: number;
  seIsModalOpen: (isModalOpen: boolean) => void;
}
const Modal: React.FC<ModalProps> = ({ boardId, commentId, seIsModalOpen }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/board/${boardId}/comment/${commentId}/modify`);
  };
  const handleDelete = () => {
    if (confirm('댓글을 삭제할까요?')) {
      alert('댓글 삭제');
    }
    seIsModalOpen(false);
  };

  return (
    <ModalPage onClick={() => seIsModalOpen(false)}>
      <ModalBackground />
      <Wrapper>
        <Option onClick={handleUpdate}>수정</Option>
        <Option onClick={handleDelete}>삭제</Option>
      </Wrapper>
    </ModalPage>
  );
};
const ModalPage = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;
const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  filter: blur(100px);
  position: absolute;
`;
const Wrapper = styled.div`
  width: 100%;
  margin: 300px auto 0;
  position: relative;
`;
const Option = styled.div`
  height: 50px;
  text-align: center;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  line-height: 50px;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
`;
export default Modal;
