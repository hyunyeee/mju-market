import styled from 'styled-components';
import { calculateTime } from '../../hooks/calculateTime';
import profileImg from '../../assets/default_profile_img.png';
import heart_empty from '../../assets/heart-empty.svg';

const BoardDetail = () => {
  const detail = {
    id: 2,
    writerNickname: '핑크색의강아지_bf477ae4',
    title: '안녕하세요 게시판에 쓰는 게시글 제목',
    content: '게시글 content 내용 쓰는 부분',
    likeCount: 0,
    isMyPost: true,
    createdDate: '2024-04-29T15:25:00.734238',
  };
  const {
    id,
    writerNickname,
    title,
    content,
    likeCount,
    isMyPost,
    createdDate,
  } = detail;
  const parsedRelativeTime = calculateTime(createdDate);

  return (
    <Container>
      {detail && (
        <>
          <Post>
            <Profile>
              <DefaultProfileImg src={profileImg} />
              <Info>
                <NickName>{writerNickname}</NickName>
                <Time>{parsedRelativeTime}</Time>
              </Info>
            </Profile>
            <Title>{title}</Title>
            <Content>{content}</Content>
          </Post>
          <Like>
            <img src={heart_empty} />
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
const Post = styled.div``;
const Profile = styled.div`
  margin-bottom: 20px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
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
