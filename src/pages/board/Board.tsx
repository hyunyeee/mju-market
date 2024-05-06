import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '../../api/board';
import useToken from '../../hooks/useToken';
import BoardListItem from '../../components/UI/board/BoardListItem';
import { BoardValues } from '../../types';

const Board = () => {
  const [boards, setBoards] = useState<BoardValues[]>();
  const token = useToken();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await getBoards(token);
      console.log(response);
      setBoards(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data);
        navigate('/');
        if (error?.response?.status === 401) {
          navigate('/login');
        }
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <Container>
      <ListContainer>
        {boards?.map((board) => <BoardListItem key={board.id} board={board} />)}
      </ListContainer>
    </Container>
  );
};
const Container = styled.div``;
const ListContainer = styled.div`
  margin-top: 60px;
`;
export default Board;
