import styled from 'styled-components';
import { useState } from 'react';
import { calculateTime } from '../../hooks/calculateTime';
import BackButton from '../../components/UI/BackButton';
import { Message } from '../../types';
import { chatDummyData } from '../../assets/data/chatDummyData';

type MessageProps = {
  $isMine: boolean;
};
const Chatting = () => {
  const [messages, setMessages] = useState<Message[]>(chatDummyData?.messages);
  const myId = chatDummyData.participants[1].id;
  return (
    <PageContainer>
      <BackButton />
      <RoomInfo>{chatDummyData.participants[0].name}</RoomInfo>
      <ChatBox>
        {messages.map((message) => (
          <MessageBox
            key={message.timestamp}
            $isMine={message.senderId === myId}
          >
            <Content>{message.message}</Content>
            <Time>{calculateTime(message.timestamp)}</Time>
          </MessageBox>
        ))}
      </ChatBox>
    </PageContainer>
  );
};

const PageContainer = styled.div``;
const RoomInfo = styled.div`
  width: 100%;
  padding: 30px 20px;
  margin-bottom: 20px;
  text-align: center;
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const ChatBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MessageBox = styled.div<MessageProps>`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: ${({ theme, $isMine }) =>
    $isMine ? `white` : theme.colors.BLUE_1};
  align-self: ${({ $isMine }) => ($isMine ? `flex-end` : `flex-start`)};
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Content = styled.p`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const Time = styled.p`
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;

export default Chatting;
