import styled from 'styled-components';
import { useState } from 'react';
import CommentModifyPage from '../../components/UI/board/CommentModifyPage';

interface ModalProps {
  boardId: number;
  commentId: number;
  setIsModalOpen: (isModalOpen: boolean) => void;
  modifyComment: string;
}
const Modal: React.FC<ModalProps> = ({
  boardId,
  commentId,
  setIsModalOpen,
  modifyComment,
}) => {
  const [isModify, setIsModify] = useState(false);

  const handleUpdate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsModify(true);
  };

  const handleDelete = () => {
    if (confirm('댓글을 삭제할까요?')) {
      alert('댓글 삭제');
    }
    setIsModalOpen(false);
  };

  return (
    <ModalPage onClick={() => !isModify && setIsModalOpen(false)}>
      <ModalBackground />
      <Wrapper>
        {isModify ? (
          <CommentModifyPage
            boardId={boardId}
            commentId={commentId}
            modifyComment={modifyComment}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          <>
            <Option onClick={(e) => handleUpdate(e)}>수정</Option>
            <Option onClick={handleDelete}>삭제</Option>
          </>
        )}
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
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
`;
const Wrapper = styled.div`
  width: 100%;
  margin: 280px auto 0;
  position: relative;
  background-color: rgb(255, 255, 255);
`;
const Option = styled.div`
  height: 50px;
  text-align: center;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  line-height: 50px;
  cursor: pointer;
`;
export default Modal;
