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
      <InputBox>
        <Input />
        <Button>Send</Button>
      </InputBox>
    </PageContainer>
  );
};

const PageContainer = styled.div``;
const RoomInfo = styled.div`
  width: 100%;
  padding: 30px 20px;
  position: fixed;
  top: 0;
  text-align: center;
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const ChatBox = styled.div`
  height: calc(100vh - 80px - 50px);
  margin-top: 80px;
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  position: sticky;
  overflow-y: scroll;
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
const InputBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 10px;
  position: fixed;
  bottom: 0;
`;
const Input = styled.input`
  height: 100%;
  padding: 10px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.BLUE_1};
`;
export default Chatting;
