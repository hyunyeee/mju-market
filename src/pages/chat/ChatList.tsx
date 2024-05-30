import BackButton from '../../components/UI/BackButton';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { calculateTime } from '../../hooks/calculateTime';
import { chatListDummyData } from '../../assets/data/chatListDummyData';
import profileImg from '../../assets/img/default_profile_img.svg';

const ChatList = () => {
  const navigate = useNavigate();
  return (
    <ChatListPage>
      <BackButton />
      <Title>채팅</Title>
      <ListWrapper>
        <ChatListBox>
          {chatListDummyData.map((chatRoom) => (
            <ChatRoom
              key={chatRoom.id}
              onClick={() => navigate(`/chat/${chatRoom.id}`)}
            >
              <Profile>
                <DefaultProfileImg src={profileImg} />
                <Info>
                  <TopContent>
                    <Name>{chatRoom.name}</Name>
                    <Time>{calculateTime(chatRoom.timestamp)}</Time>
                  </TopContent>
                  <Message>{chatRoom.lastMessage}</Message>
                </Info>
              </Profile>
            </ChatRoom>
          ))}
        </ChatListBox>
      </ListWrapper>
    </ChatListPage>
  );
};
const ChatListPage = styled.div`
  padding: 20px;
`;
const Title = styled.div`
  width: calc(100% - 20px - 20px);
  height: 40px;
  margin-top: 40px;
  position: fixed;
  font-size: 24px;
  font-weight: 500;
  background-color: white;
`;
const ListWrapper = styled.div`
  margin-top: 80px;
  height: calc(100vh - 100px - 90px);
  position: sticky;
  overflow-y: scroll;
`;
const ChatListBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChatRoom = styled.div``;
const Profile = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const DefaultProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  object-fit: cover;
`;
const Info = styled.div`
  width: 100%;
`;
const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Name = styled.p`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Time = styled.p`
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Message = styled.p`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;

export default ChatList;