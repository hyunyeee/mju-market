import { Axios } from './Axios';
import { ChatRoomInfo } from '../types';

export const createChatRoom = async (
  token: string,
  productId: number,
  sellerId: number,
): Promise<ChatRoomInfo> => {
  const response = await Axios.post(
    `/api/products/${productId}/chats`,
    { sellerId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const getChatHistory = async (
  token: string,
  productId: number,
  chattingRoomId: number,
  chatId: unknown,
  pageSize: number,
) => {
  if (!token) {
    throw new Error('로그인 정보가 유효하지 않습니다.');
  }
  const response = await Axios.get(
    `/api/products/${productId}/chats/${chattingRoomId}?${chatId ? `chatId=${chatId}&` : ''}pageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export const getChatRoomList = async (token: string) => {
  const response = await Axios.get(`/api/chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
