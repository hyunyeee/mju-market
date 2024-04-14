import styled from 'styled-components';
import { useContext } from 'react';
import { ProductContext } from '../../../ProductContext';

interface ClickedStyle {
  $index: number;
  $categoryIndex: number;
}

interface SelectCategoryProps {
  dummyCategory: string[];
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ dummyCategory }) => {
  const { setCategoryIndex, categoryIndex } = useContext(ProductContext);

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
