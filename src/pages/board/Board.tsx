import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '../../api/board';
import useToken from '../../hooks/useToken';
import { BoardValues } from '../../types';
import BoardListItem from '../../components/UI/board/BoardListItem';
import WriteButton from '../../components/UI/WriteButton';

interface PageButtonProps {
  $pageNumber: number;
  $currentPageNumber: number;
}

const Board = () => {
  const [boards, setBoards] = useState<BoardValues[]>();
  const [pageState, setPageState] = useState({
    currentPage: 0,
    nowPage: 0,
    totalPages: 0,
  });
  const token = useToken();
  const navigate = useNavigate();

  const handlePage = (index: number) => {
    setPageState((prevState) => ({ ...prevState, currentPage: index }));
  };
  const fetchData = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await getBoards(token, pageState.currentPage);
      setPageState((prevState) => ({
        ...prevState,
        nowPage: response.nowPage,
        totalPages: response.totalPages,
      }));
      setBoards(response.boards);
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
  }, [token, pageState.currentPage]);

  return (
    <PageContainer>
      <Container>
        <ListContainer>
          {boards?.length === 0 && <Box>데이터가 존재하지 않습니다.</Box>}
          {boards?.map((board) => (
            <BoardListItem key={board.id} board={board} />
          ))}
        </ListContainer>
        <PageSeletBox>
          {Array.from({ length: pageState.totalPages }, (_, index) => (
            <PageButton
              key={index}
              onClick={() => handlePage(index)}
              $pageNumber={index}
              $currentPageNumber={pageState.currentPage}
            >
              {index + 1}
            </PageButton>
          ))}
        </PageSeletBox>
      </Container>
      <WriteButton path="/board/write" />
    </PageContainer>
  );
};
const PageContainer = styled.div``;
const Box = styled.div`
  width: calc(100% - 80px);
  margin: 20px 40px;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  color: white;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const Container = styled.div`
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ListContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
`;
const PageSeletBox = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const PageButton = styled.button<PageButtonProps>`
  padding: 5px 10px;
  border-radius: 4px;
  ${({ theme }) => theme.typographies.DEFAULT};

  background-color: ${({ theme, $pageNumber, $currentPageNumber }) =>
    $pageNumber === $currentPageNumber ? theme.colors.BLUE_2 : 'white'};
  border: 1px solid
    ${({ theme, $pageNumber, $currentPageNumber }) =>
      $pageNumber === $currentPageNumber ? 'white' : theme.colors.BLUE_2};
  color: ${({ theme, $pageNumber, $currentPageNumber }) =>
    $pageNumber === $currentPageNumber ? 'white' : theme.colors.BLUE_2};
  cursor: pointer;
`;
export default Board;
