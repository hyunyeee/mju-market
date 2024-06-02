import { Client } from '@stomp/stompjs';
import { Message } from '../types';

let stompClient: Client;

export const connectWebSocket = (
  chattingRoomId: number,
  onMessageReceived: (message: Message) => void,
) => {
  stompClient = new Client({
    brokerURL: `${process.env.REACT_APP_SOCKET_URL}/ws-stomp`,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('WebSocket connected');
      subscribeToChatRoom(chattingRoomId, onMessageReceived);
    },
    onDisconnect: () => {
      console.log('WebSocket disconnected');
    },
  });

  stompClient.activate();
};

const subscribeToChatRoom = (
  chattingRoomId: number,
  onMessageReceived: (message: Message) => void,
) => {
  const subscriptionUrl = `/sub/chats/${chattingRoomId}`;
  stompClient.subscribe(subscriptionUrl, (message) => {
    if (message.body) {
      const receivedMessage: Message = JSON.parse(message.body);
      onMessageReceived(receivedMessage);
    }
  });
};

export const sendWebSocketMessage = (
  chattingRoomId: number,
  senderId: number,
  message: string,
) => {
  const publishUrl = `/pub/chats/${chattingRoomId}/messages`;
  if (stompClient && stompClient.connected) {
    const messageData = JSON.stringify({ senderId, message });
    stompClient.publish({
      destination: publishUrl,
      body: messageData,
    });
    console.log(`Message sent to ${publishUrl}`);
  } else {
    console.error('WebSocket is not connected');
  }
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
