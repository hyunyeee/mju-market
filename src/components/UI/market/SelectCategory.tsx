import styled from 'styled-components';
import { Dispatch, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../api/market';
import { Iproduct } from '../../../pages/Market';
import { ProductContext } from '../../../ProductContext';

interface clickedStyle {
  $index: number;
  $categoryIndex: number;
}
interface selectCategoryProps {
  dummy_category: string[];
  setProductList: Dispatch<Iproduct[]>;
}

const SelectCategory: React.FC<selectCategoryProps> = ({
  dummy_category,
  setProductList,
}) => {
  const productContext = useContext(ProductContext);
  const navigate = useNavigate();

  const selectCategory = async (index: number) => {
    productContext.setCategoryIndex(index);
    const products = getProducts(index, navigate);
    await setProductList(await products);
  };

  return (
    <CategoryBox>
      {dummy_category.map((category: string, index: number) => (
        <Category
          key={category}
          $index={index}
          onClick={() => selectCategory(index)}
          $categoryIndex={productContext.categoryIndex}
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
