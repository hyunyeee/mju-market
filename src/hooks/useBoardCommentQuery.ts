import { useInfiniteQuery } from '@tanstack/react-query';
import useToken from './useToken';
import { getComments } from '../api/comment';

interface QueryProps {
  boardId: number;
  pageSize: number;
}

const useBoardCommentQuery = ({ boardId, pageSize }: QueryProps) => {
  const token = useToken();

  return useInfiniteQuery({
    queryKey: ['boardComments', boardId, token],
    queryFn: ({ pageParam = null }) => {
      if (!token) return Promise.reject(new Error('토큰이 없습니다.'));
      return getComments(token, boardId, pageParam, pageSize);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.length < pageSize) {
        return undefined;
      }
      return lastPage[lastPage.length - 1].id;
    },
    enabled: !!token,
    initialPageParam: undefined,
  });
};

export default useBoardCommentQuery;
