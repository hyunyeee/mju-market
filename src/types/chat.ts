export interface Message {
  senderId: number;
  message: string;
}

export interface ChatRoomInfo {
  buyerId: number;
  chatRoomId: number;
  chattingStatus: string;
  productId: number;
  sellerId: number;
}
