export interface ChatList {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
}

export interface Message {
  senderId: number;
  message: string;
  timestamp: string;
}
