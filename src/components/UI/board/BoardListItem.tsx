import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { calculateTime } from '../../../hooks/calculateTime';
import { BoardValues } from '../../../types';
import heartEmpty from '../../../assets/img/heart-empty.svg';
import heartClicked from '../../../assets/img/heart_clicked.svg';
import comment from '../../../assets/img/comment.svg';
import mjuLogo from '../../../assets/img/mju_logo.jpg';

interface BoardListItemProps {
  board: BoardValues;
}
const BoardListItem: React.FC<BoardListItemProps> = ({ board }) => {
  const {
    id,
    title,
    writerNickname,
    createdDate,
    likeCount,
    commentCount,
    isLikedAlreadyByMe,
  } = board;

  const navigate = useNavigate();
  const onItemClick = () => {
    navigate(`/board/${id}`);
  };

  const parsedRelativeTime = calculateTime(createdDate);

  return (
    <ItemBox onClick={onItemClick}>
      <Content>
        <Image src={mjuLogo} />
        <Description>
          <Title>{title}</Title>
          <Nickname>{writerNickname}</Nickname>
          <BoardInfo>
            {parsedRelativeTime}
            <Comment>
              <img src={comment} />
              {commentCount}
            </Comment>
          </BoardInfo>
        </Description>
      </Content>
      <StatusBox>
        <Like>
          <img src={isLikedAlreadyByMe ? heartClicked : heartEmpty} />
          <div>{likeCount}</div>
        </Like>
      </StatusBox>
    </ItemBox>
  );
};

const ItemBox = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Content = styled.div`
  display: flex;
  gap: 15px;
`;
const StatusBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  align-items: center;
  gap: 10px;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  padding: 10px;
  flex-shrink: 0;
  border-radius: 8px;
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Title = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Nickname = styled.p`
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const BoardInfo = styled.div`
  display: flex;
  gap: 10px;
  white-space: nowrap;
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Like = styled.div`
  ${({ theme }) => theme.typographies.SMALL_TXT};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default BoardListItem;
