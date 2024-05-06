import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { calculateTime } from '../../../hooks/calculateTime';
import { BoardValues } from '../../../types';
import heartEmpty from '../../../assets/heart-empty.svg';

interface BoardListItemProps {
  board: BoardValues;
}
const BoardListItem: React.FC<BoardListItemProps> = ({ board }) => {
  const { id, title, writerNickname, createdDate } = board;

  const navigate = useNavigate();
  const onItemClick = () => {
    navigate(`/board/${id}`);
  };

  const parsedRelativeTime = calculateTime(createdDate);

  return (
    <ItemBox onClick={onItemClick}>
      <Content>
        <Image />
        <Description>
          <Title>{title}</Title>
          <Nickname>{writerNickname}</Nickname>
          <Time>{parsedRelativeTime}</Time>
        </Description>
      </Content>
      <StatusBox>
        <Like>
          <img src={heartEmpty} />
          <div>3</div>
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
const Image = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
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
const Time = styled.div`
  white-space: nowrap;
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const VisitedCount = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.TXT_LIGHT_GRAY};
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Icon = styled.img`
  width: 12px;
`;
const Like = styled.div`
  ${({ theme }) => theme.typographies.SMALL_TXT};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default BoardListItem;
