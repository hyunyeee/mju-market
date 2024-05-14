import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useToken from '../../hooks/useToken';
import { deleteBoard, getBoard } from '../../api/board';
import { getComments, postComment } from '../../api/comment';
import { calculateTime } from '../../hooks/calculateTime';
import Comment from '../../components/UI/board/Comment';
import CommentInput from '../../components/UI/board/CommentInput';
import Modal from '../../components/UI/board/Modal';
import BackButton from '../../components/UI/BackButton';
import { BoardDetailValues, CommentValues } from '../../types';
import profileImg from '../../assets/img/default_profile_img.png';
import heartEmpty from '../../assets/img/heart-empty.svg';

const BoardDetail = () => {
  const { boardId } = useParams();
  const [boardObj, setBoardObj] = useState<BoardDetailValues>();
  const [commentList, setCommentList] = useState<CommentValues[]>();
  const [comment, setComment] = useState('');
  const [ismodalOpen, setIsModalOpen] = useState<boolean>(true);
  const [commentId, setCommentId] = useState<number>();
  const [modifyComment, setModifyComment] = useState('');

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

  const fetchCommentData = async () => {
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
      const commentResponse = await getComments(token, id);
      setCommentList(commentResponse);
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

  const handleInputChange = (value: string) => {
    setComment(value);
  };

  const handleSubmit = async () => {
    setComment('');
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      await postComment(token, Number(boardId), comment);
      await fetchCommentData();
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
      fetchCommentData();
    }
  }, [token]);

  return (
    <>
      {ismodalOpen && boardId && commentId && (
        <Modal
          boardId={Number(boardId)}
          commentId={commentId}
          setIsModalOpen={setIsModalOpen}
          modifyComment={modifyComment}
        />
      )}
      <Container>
        <BackButton />
        {boardObj && (
          <>
            <Post>
              {isMyPost && (
                <Buttons>
                  <Button onClick={() => navigate(`/board/modify/${id}`)}>
                    수정
                  </Button>
                  <Button onClick={() => handleDelete()}>삭제</Button>
                </Buttons>
              )}
              <Profile>
                <DefaultProfileImg src={profileImg} />
                <Info>
                  <NickName>{writerNickname}</NickName>
                  <Time>{parsedRelativeTime}</Time>
                </Info>
              </Profile>
              <ArticleSection>
                <Title>{title}</Title>
                <Content>{content}</Content>
              </ArticleSection>
            </Post>
            <Like>
              <Img src={heartEmpty} />
              <div>{likeCount}</div>
            </Like>
          </>
        )}
      </Container>
      <Hr />
      {/*TODO Modal open 되어있으면 스크롤 방지*/}
      <CommentContainer>
        {commentList && (
          <CommentList>
            {commentList.map((comment: CommentValues) => (
              <Comment
                key={comment.id}
                commentObj={comment}
                setCommentId={setCommentId}
                setModifyComment={setModifyComment}
                setIsModalOpen={setIsModalOpen}
              />
            ))}
          </CommentList>
        )}
        {/*TODO 수정 값 인지 여부를 알아야 함 */}
        {/* 변경 값 없으면 취소 버튼만 가능하게*/}
        <CommentInput
          comment={comment}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </CommentContainer>
    </>
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
  gap: 2px;
`;
const Img = styled.img`
  width: 20px;
  height: 20px;
`;
const Hr = styled.div`
  width: 100vw;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
`;
const CommentContainer = styled.div`
  margin-bottom: 50px;
`;
const CommentList = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export default BoardDetail;
