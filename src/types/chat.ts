export interface Message {
  chatRoomId: string;
  chattingId: string;
  isSendByMe: boolean;
  message: string;
  sendTime: string;
  senderId: number;
  senderNickname: string;
}

export interface ChatRoomInfo {
  buyerId: number;
  chatRoomId: number;
  chattingStatus: string;
  productId: number;
  sellerId: number;
}

export interface ChatRoomListInfo {
  productId: number;
  chattingRoomId: number;
  sellerNickname: string;
  productName: string;
  lastChattingTime: string;
}
