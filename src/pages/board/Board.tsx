import styled from 'styled-components';
import BoardListItem from '../../components/UI/board/BoardListItem';

const Board = () => {
  const board = {
    id: 1,
    writerNickname: '핑크색의강아지_bf477ae4',
    title: 'title',
    createdDate: '2024-04-29T13:27:15.027653',
  };

  return (
    <Container>
      <ListContainer>
        <BoardListItem key={board.id} board={board} />
        <BoardListItem key={board.id} board={board} />
        <BoardListItem key={board.id} board={board} />
      </ListContainer>
    </Container>
  );
};
const Container = styled.div``;
const ListContainer = styled.div`
  margin-top: 60px;
`;
export default Board;
