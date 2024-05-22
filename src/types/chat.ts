export interface ChatList {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
}

export interface Message {
  senderId: string;
  message: string;
  timestamp: string;
}
