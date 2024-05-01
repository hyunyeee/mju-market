import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useToken from '../../hooks/useToken';
import { deleteBoard, getBoard } from '../../api/board';
import { calculateTime } from '../../hooks/calculateTime';
import { BoardDetailValues } from '../../types';
import profileImg from '../../assets/default_profile_img.png';
import heartEmpty from '../../assets/heart-empty.svg';

const BoardDetail = () => {
  const { boardId } = useParams();
  const [boardObj, setBoardObj] = useState<BoardDetailValues>();
  const {
    id,
    writerNickname,
    title,
    content,
    likeCount,
    isMyPost,
    createdDate,
  } = boardObj || {};

  const token = useToken();
  const navigate = useNavigate();
  const parsedRelativeTime = calculateTime(createdDate);

  const handleDelete = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      if (confirm('게시글을 삭제할까요?')) {
        await deleteBoard(token, Number(boardId));
        navigate('/');
      }
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

  const fetchData = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      const id = Number(boardId);
      if (isNaN(id)) {
        alert('잘못된 접근입니다.');
        navigate('/boards');
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
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <Container>
      {boardObj && (
        <>
          <Post>
            <Profile>
              <DefaultProfileImg src={profileImg} />
              <Info>
                <NickName>{writerNickname}</NickName>
                <Time>{parsedRelativeTime}</Time>
              </Info>
            </Profile>
            {isMyPost && (
              <Buttons>
                <Button onClick={() => navigate(`/board/modify/${id}`)}>
                  수정
                </Button>
                <Button onClick={() => handleDelete()}>삭제</Button>
              </Buttons>
            )}
            <ArticleSection>
              <Title>{title}</Title>
              <Content>{content}</Content>
            </ArticleSection>
          </Post>
          <Like>
            <img src={heartEmpty} />
            <div>{likeCount}</div>
          </Like>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Post = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Profile = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const ArticleSection = styled.section``;
const Title = styled.p`
  margin-bottom: 10px;
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Content = styled.p`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const DefaultProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
`;
const Info = styled.div``;
const Buttons = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;
const Button = styled.button`
  width: 50px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 4px;
`;
const Time = styled.p`
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const NickName = styled.p`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const Like = styled.div`
  ${({ theme }) => theme.typographies.SMALL_TXT};
  display: flex;
  align-items: center;
`;
export default BoardDetail;
