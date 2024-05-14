import React from 'react';
import styled from 'styled-components';
import { calculateTime } from '../../../hooks/calculateTime';
import { CommentValues } from '../../../types';
import more from '../../../assets/img/more.svg';

interface CommentProps {
  commentObj: CommentValues;
  setCommentId: (commentId: number) => void;
  setModifyComment: (comment: string) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}
const Comment: React.FC<CommentProps> = ({
  commentObj,
  setCommentId,
  setModifyComment,
  setIsModalOpen,
}) => {
  const { id, writerNickname, content, createDate } = commentObj;
  const parsedRelativeTime = calculateTime(createDate);

  const handleModal = () => {
    setIsModalOpen(true);
    setCommentId(id);
    setModifyComment(content);
  };

  return (
    <Container>
      <Profile>
        <ProfileImg />
        <Writer>{writerNickname}</Writer>
        <MenuButton onClick={handleModal}>
          <Img src={more} />
        </MenuButton>
      </Profile>
      <Content>
        <CommentContent>{content}</CommentContent>
        <Time>{parsedRelativeTime}</Time>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-top: 1px solid ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ProfileImg = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  border-radius: 4px;
`;
const Content = styled.div`
  margin: 0 0 5px 5px;
`;
const MenuButton = styled.button`
  margin-left: auto;
`;
const Img = styled.img`
  width: 20px;
  margin-top: 3px;
`;
const Writer = styled.p`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const CommentContent = styled.p`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const Time = styled.p`
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;

export default Comment;
