import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { calculate_time } from '../../../hooks/calculate_time';
import { Product } from '../../../types';
import heart_empty from '../../../assets/heart-empty.svg';
import people from '../../../assets/people_icon.svg';

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { id, title, price, productStatus, createDate, visitedCount } = product;
  const navigate = useNavigate();

  const onItemClick = () => {
    navigate(`/products/${id}`);
  };

  const time = calculate_time(createDate);

  return (
    <ItemBox onClick={onItemClick}>
      <Content>
        <Image />
        <Description>
          <Title>
            {title.slice(0, 13)} {title.length > 10 ? '...' : ''}
          </Title>
          <TrafficData>
            <Time>{time}</Time>
            <VisitedCount>
              <Icon src={people} />
              <div>{visitedCount}</div>
            </VisitedCount>
          </TrafficData>
          <Price>{price}</Price>
        </Description>
      </Content>
      <StatusBox>
        <ProductStatus>{productStatus}</ProductStatus>
        <Like>
          <img src={heart_empty} />
          <div>3</div>
        </Like>
      </StatusBox>
    </ItemBox>
  );
};

const ItemBox = styled.div`
  padding: 20px;
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
const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ProductStatus = styled.div`
  height: 30px;
  padding: 5px 10px;
  ${({ theme }) => theme.typographies.SMALL_TXT};
  background-color: ${({ theme }) => theme.colors.BLUE_1};
  border-radius: 8px;
  color: white;
`;
const Image = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 1;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const Description = styled.div`
  min-width: 120px;
`;
const Title = styled.h2`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const TrafficData = styled.div`
  display: flex;
  gap: 10px;
`;
const Price = styled.div`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Time = styled.div`
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const VisitedCount = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.colors.TXT_LIGHT_GRAY};
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Icon = styled.img`
  width: 12px;
`;
const Like = styled.div`
  ${({ theme }) => theme.typographies.SMALL_TXT};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default ProductListItem;
