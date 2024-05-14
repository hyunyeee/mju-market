import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { getBoard } from '../../api/board';
import BoardForm from '../../components/UI/board/BoardForm';
import BackButton from '../../components/UI/BackButton';
import { BoardDetailValues } from '../../types';
import camera from '../../assets/img/camera.svg';
import deleteBtn from '../../assets/img/delete_image.svg';

const BoardWrite = () => {
  const { boardId } = useParams();
  const token = useToken();
  const navigate = useNavigate();
  const matchWrite = useMatch('/board/write');
  const matchModify = useMatch('/board/modify/:productId');
  const [boardObj, setBoardObj] = useState<BoardDetailValues>();

  const fetchData = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      const id = Number(boardId);
      if (isNaN(id)) {
        alert('잘못된 접근입니다.');
        navigate('/');
        return;
      }
      const response = await getBoard(token, id);
      setBoardObj(response);
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
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = false; // Chrome에서 returnValue set 필요
    };

    if (matchWrite || matchModify) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (token && boardId) {
      fetchData();
    }
  }, [token]);

  return (
    <Container>
      <BackButton />
      <Title>게시판 글쓰기</Title>
      <AddImageContainer>
        <SubTitle>이미지 등록</SubTitle>
        <ImageBox>
          <AddButton>
            <img src={camera} />
            5/10
          </AddButton>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
        </ImageBox>
      </AddImageContainer>
      <BoardForm boardObj={boardObj} />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const Title = styled.h1`
  margin: 20px auto 0;
  text-align: center;
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const SubTitle = styled.h2`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const AddImageContainer = styled.div`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const ImageBox = styled.div`
  padding: 10px 0;
  display: flex;
  gap: 12px;
  overflow-x: scroll;
`;
const AddButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-shrink: 0;
`;
const Image = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  flex-shrink: 0;
`;
const DeleteBtn = styled.img`
  position: absolute;
  z-index: 1;
  top: -5px;
  right: -8px;
  cursor: pointer;
`;

export default BoardWrite;
