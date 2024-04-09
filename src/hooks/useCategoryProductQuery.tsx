import { useInfiniteQuery } from 'react-query';
import { getProducts } from '../api/market';

interface UseCategoryProductQueryProps {
  token: string;
  categoryId: number;
  pageSize: number;
}

const useCategoryProductQuery = ({
  token,
  categoryId,
  pageSize,
}: UseCategoryProductQueryProps) => {
  return useInfiniteQuery(
    ['categoryProducts', categoryId],
    ({ pageParam = null }) =>
      getProducts(token, categoryId, pageParam, pageSize),
    {
      getNextPageParam: (lastPage) => {
        // response 페이지의 크기가 pageSize보다 작으면 마지막 페이지로 간주한다.
        if (!lastPage || lastPage.length < pageSize) {
          return undefined;
        }
        return lastPage[lastPage.length - 1].id;
      },
    },
  );
};

export default useCategoryProductQuery;
