import { useInfiniteQuery } from 'react-query';
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
  return useInfiniteQuery(
    ['categoryProducts', categoryId, token],
    ({ pageParam = null }) => {
      if (!token) return Promise.reject(new Error('토큰이 없습니다.'));
      return getProducts(token, categoryId, pageParam, pageSize);
    },
    {
      getNextPageParam: (lastPage) => {
        // response 페이지의 크기가 pageSize보다 작으면 마지막 페이지로 간주한다.
        if (!lastPage || lastPage.length < pageSize) {
          return undefined;
        }
        return lastPage[lastPage.length - 1].id;
      },
      enabled: !!token,
    },
  );
};

export default useCategoryProductQuery;
