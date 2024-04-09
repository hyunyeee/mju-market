import styled from 'styled-components';
import { Dispatch, useContext, useEffect } from 'react';
import { ProductContext } from '../../../ProductContext';
import { Product } from '../../../pages/Market';
import useCategoryProductQuery from '../../../hooks/useCategoryProductQuery';

interface ClickedStyle {
  $index: number;
  $categoryIndex: number;
}

interface SelectCategoryProps {
  dummyCategory: string[];
  setProductList: Dispatch<Product[]>;
}

// useCategoryProductQuery에서 반환된 data와
// 로딩 상태(isLoading, isError 등)를 이용해 UI를 조건부로 렌더링한다.
const SelectCategory: React.FC<SelectCategoryProps> = ({
  dummyCategory,
  setProductList,
}) => {
  const { setCategoryIndex, categoryIndex } = useContext(ProductContext);
  const token = localStorage.getItem('token') || '';

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useCategoryProductQuery({
      token,
      categoryId: categoryIndex,
      pageSize: 5,
    });

  if (isError) {
    const errorMessage = (error as Error)?.message;
    return <div>에러가 발생했습니다: {errorMessage}</div>;
  }

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const products = data.pages.flat();
      setProductList(products);
    }
  }, [data, isLoading, isError, setProductList]);

  const selectCategory = (index: number) => {
    setCategoryIndex(index);
  };

  return (
    <CategoryBox>
      {dummyCategory.map((category: string, index: number) => (
        <Category
          key={category}
          $index={index}
          onClick={() => selectCategory(index)}
          $categoryIndex={categoryIndex}
        >
          {category}
        </Category>
      ))}
      <button onClick={() => fetchNextPage()}>다음 페이지</button>
    </CategoryBox>
  );
};

const CategoryBox = styled.div`
  width: 100vw;
  padding: 10px;
  position: fixed;
  top: 0;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
`;
const Category = styled.button<ClickedStyle>`
  width: 90px;
  height: 40px;
  color: ${({ $categoryIndex, $index, theme }) =>
    $categoryIndex === $index ? theme.colors.BLUE_2 : '#969696'};
  border: 1px solid
    ${({ $categoryIndex, $index, theme }) =>
      $categoryIndex === $index ? theme.colors.BLUE_2 : '#dbdbdb'};
  background-color: ${({ $categoryIndex, $index }) =>
    $categoryIndex === $index ? '#D9E4F4' : 'white'};
  flex-shrink: 0;
  border-radius: 25px;
`;
export default SelectCategory;
