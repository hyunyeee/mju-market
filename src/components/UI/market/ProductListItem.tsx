import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../../ProductContext';
import { Iproduct } from '../../../pages/Market';
import heart_empty from '../../../assets/heart-empty.svg';

interface ProductListItemProps {
  product: Iproduct;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const productContext = useContext(ProductContext);
  const navigate = useNavigate();

  const clickItem = () => {
    navigate(`/${product.productId}`);
    productContext.setProductId(product.productId);
  };

  return (
    <ItemBox onClick={() => clickItem()}>
      <Content>
        <Image />
        <Description>
          <Title>{product.title}</Title>
          <Price>{product.price}</Price>
        </Description>
      </Content>
      <Like>
        <img src={heart_empty} />
        <div>3</div>
      </Like>
    </ItemBox>
  );
};

const ItemBox = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Content = styled.div`
  display: flex;
  gap: 15px;
`;
const Image = styled.div`
  width: 62px;
  height: 62px;
  flex-shrink: 1;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const Description = styled.div``;
const Title = styled.h2`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const Price = styled.div`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Like = styled.div`
  ${({ theme }) => theme.typographies.SMALL_TXT};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default ProductListItem;
