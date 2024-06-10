import { useInfiniteQuery } from '@tanstack/react-query';
import useToken from './useToken';
import { getProducts } from '../api/market';

interface UseCategoryProductQueryProps {
  categoryId: number;
  pageSize: number;
}

const useCategoryProductQuery = ({
  categoryId,
  pageSize,
}: UseCategoryProductQueryProps) => {
  const token = useToken();

  return useInfiniteQuery({
    queryKey: ['categoryProducts', categoryId, token],
    queryFn: ({ pageParam = null }) => {
      if (!token) return Promise.reject(new Error('토큰이 없습니다.'));
      return getProducts(token, categoryId, pageParam, pageSize);
    },
    gcTime: 100,
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

export default useCategoryProductQuery;
