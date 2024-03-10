import styled from 'styled-components';
import { useState } from 'react';

interface clickedStyle {
  $index: number;
  $clickedIndex: number;
}
const SelectCategory = () => {
  const [clickedIndex, setClickedIndex] = useState<number>(0);
  const dummy_category = ['1', '2', '3', '4', '5', '6'];

  return (
    <CategoryBox>
      {dummy_category.map((category: string, index: number) => (
        <Category
          key={category}
          $index={index}
          onClick={() => setClickedIndex(index)}
          $clickedIndex={clickedIndex}
        >
          {category}
        </Category>
      ))}
    </CategoryBox>
  );
};

const CategoryBox = styled.div`
  margin: 0 -20px;
  padding: 10px;
  display: flex;
  gap: 20px;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
`;
const Category = styled.button<clickedStyle>`
  width: 90px;
  height: 40px;
  color: ${({ $clickedIndex, $index, theme }) =>
    $clickedIndex === $index ? theme.colors.BLUE_2 : '#969696'};
  border: 1px solid
    ${({ $clickedIndex, $index, theme }) =>
      $clickedIndex === $index ? theme.colors.BLUE_2 : '#dbdbdb'};
  background-color: ${({ $clickedIndex, $index }) =>
    $clickedIndex === $index ? '#D9E4F4' : 'white'};
  flex-shrink: 0;
  border-radius: 25px;
`;
export default SelectCategory;
