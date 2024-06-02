import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  connectWebSocket,
  disconnectWebSocket,
  sendWebSocketMessage,
} from '../../service/webSocket';
import { useInView } from 'react-intersection-observer';
import BackButton from '../../components/UI/BackButton';
import { Message } from '../../types';
import useChattingQuery from '../../hooks/useChattingQuery';
import { calculateTime } from '../../hooks/calculateTime';
import { getMyId } from '../../api/auth';
import useToken from '../../hooks/useToken';

type MessageProps = {
  $isMine: boolean;
};
const Chatting = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [senderId, setSenderId] = useState<number>();
  const [params] = useSearchParams();
  const chattingRoomId = Number(params.get('chatRoomId'));
  const productId = Number(params.get('productId'));

  const token = useToken();
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useChattingQuery({
      productId: productId,
      chattingRoomId: chattingRoomId,
      pageSize: 20,
    });

  const getSenderId = async () => {
    if (!token) {
      return;
    }
    const myId = await getMyId(token);
    setSenderId(myId);
  };

  const onClick = () => {
    if (!senderId) {
      return;
    }
    if (input.trim() !== '') {
      sendWebSocketMessage(chattingRoomId, senderId, input);
      setInput('');
    }
  };

  if (isError) {
    const errorMessage = (error as Error)?.message;
    return <div>에러가 발생했습니다: {errorMessage}</div>;
  }

  const setRef = ref as React.RefCallback<HTMLDivElement>;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  useEffect(() => {
    const onMessageReceived = (message: Message) => {
      const isMine = message.senderId === senderId;
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, isSendByMe: isMine },
      ]);
    };
    // 기존 연결을 닫고 새로운 WebSocket 연결을 설정
    disconnectWebSocket();
    connectWebSocket(chattingRoomId, onMessageReceived);

    return () => {
      disconnectWebSocket();
    };
  }, [chattingRoomId, senderId]);

  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const messagesData = data.pages.flat().reverse();
      setMessages(messagesData);
    }
  }, [data, isLoading, isError, setMessages]);

  useEffect(() => {
    getSenderId();
  }, [token]);

  return (
    <PageContainer>
      <RoomInfo>
        <BackButton />
        chattingRoomId: {chattingRoomId}
      </RoomInfo>
      <ChatBox ref={chatBoxRef}>
        {isFetchingNextPage ? (
          <div>로딩중!!!!!!!!!!!!</div>
        ) : (
          <div ref={setRef} />
        )}
        {messages.map((message, index) => (
          <MessageBox key={index} $isMine={message.isSendByMe}>
            <Content>{message.message}</Content>
            <Time>{calculateTime(message.sendTime)}</Time>
          </MessageBox>
        ))}
      </ChatBox>
      <InputBox>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
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
