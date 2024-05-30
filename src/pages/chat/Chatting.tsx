import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  connectWebSocket,
  disconnectWebSocket,
  sendWebSocketMessage,
} from '../../service/webSocket';
import { getChatHistory } from '../../api/chat';
import useToken from '../../hooks/useToken';
import BackButton from '../../components/UI/BackButton';
import { Message } from '../../types';

type MessageProps = {
  $isMine: boolean;
};
const Chatting = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { chatRoomId } = useParams();
  const token = useToken();
  const navigate = useNavigate();
  const chattingRoomId = Number(chatRoomId);
  const senderId = 1;
  const productId = 1;

  useEffect(() => {
    const onMessageReceived = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    // 기존 연결을 닫고 새로운 WebSocket 연결을 설정
    disconnectWebSocket();
    connectWebSocket(chattingRoomId, onMessageReceived);

    return () => {
      disconnectWebSocket();
    };
  }, [chattingRoomId]);

  const onClick = () => {
    sendWebSocketMessage(chattingRoomId, senderId, input);
    setInput('');
  };

  const fetchChatData = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await getChatHistory(token, productId, chattingRoomId);
      setMessages(response);
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
      fetchChatData();
    }
  }, [token]);

  return (
    <PageContainer>
      <BackButton />
      <RoomInfo>chattingRoomId: {chattingRoomId}</RoomInfo>
      <ChatBox>
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            // TODO GET response로 변경해야됨
            $isMine={message.senderId === senderId}
          >
            <Content>{message.message}</Content>
            <Time>time</Time>
          </MessageBox>
        ))}
      </ChatBox>
      <InputBox>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={onClick}>Send</Button>
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
