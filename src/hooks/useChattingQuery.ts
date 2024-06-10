import { useInfiniteQuery } from '@tanstack/react-query';
import useToken from './useToken';
import { getChatHistory } from '../api/chat';

interface QueryProps {
  productId: number;
  chattingRoomId: number;
  pageSize: number;
}

const useChattingQuery = ({
  productId,
  chattingRoomId,
  pageSize,
}: QueryProps) => {
  const token = useToken();

  return useInfiniteQuery({
    queryKey: ['chatHistory', productId, token],
    queryFn: ({ pageParam = null }) => {
      if (!token) return Promise.reject(new Error('토큰이 없습니다.'));

      return getChatHistory(
        token,
        productId,
        chattingRoomId,
        pageParam,
        pageSize,
      );
    },
    gcTime: 100,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < pageSize) {
        return undefined;
      }
      return lastPage[lastPage.length - 1].chattingId;
    },
    enabled: !!token,
    initialPageParam: undefined,
  });
};

export default useChattingQuery;
