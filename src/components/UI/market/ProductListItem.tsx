import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { calculateTime } from '../../../hooks/calculateTime';
import { Product } from '../../../types';
import heartEmpty from '../../../assets/img/heart-empty.svg';
import heartClicked from '../../../assets/img/heart_clicked.svg';
import people from '../../../assets/img/people_icon.svg';
import defaultImg from '../../../assets/img/defaultImg.svg';

interface isVisibleProps {
  $isVisible: boolean;
}
interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const {
    id,
    location,
    title,
    price,
    visitedCount,
    productStatus,
    ownerName,
    productLikesCount,
    isAlreadyLikedByMe,
    createDate,
    thumbnailUrl,
    thumbnailId,
  } = product;
  const navigate = useNavigate();

  const onItemClick = () => {
    navigate(`/products/${id}`);
  };
  const parsedRelativeTime = calculateTime(createDate);

  return (
    <ItemBox onClick={onItemClick}>
      <Content>
        <Image src={thumbnailId === -1 ? defaultImg : thumbnailUrl} />
        <Description>
          <ProductInfo>
            <Title>{title}</Title>
            <TrafficData>
              <Time>{parsedRelativeTime}</Time>
              <Location>{location}</Location>
              <VisitedCount>
                <Icon src={people} />
                <div>{visitedCount}</div>
              </VisitedCount>
            </TrafficData>
            <OwnerName>{ownerName}</OwnerName>
          </ProductInfo>
          <Price>{price.toLocaleString()}원</Price>
        </Description>
      </Content>
      <StatusBox>
        <Like>
          <img src={isAlreadyLikedByMe ? heartClicked : heartEmpty} />
          <div>{productLikesCount}</div>
        </Like>
        <ProductStatus $isVisible={productStatus === 'COMPLETED'}>
          거래 완료
        </ProductStatus>
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
  width: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  align-items: center;
  gap: 10px;
`;
const ProductStatus = styled.div<isVisibleProps>`
  padding: 3px 5px;
  ${({ theme }) => theme.typographies.SMALL_TXT};
  color: white;
  background-color: ${({ theme }) => theme.colors.BLUE_1};
  border-radius: 4px;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 8px;
  object-fit: cover;
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductInfo = styled.div``;
const Title = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const TrafficData = styled.div`
  display: flex;
  gap: 10px;
`;
const OwnerName = styled.p`
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Location = styled.p`
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Price = styled.div`
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const Time = styled.div`
  white-space: nowrap;
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
