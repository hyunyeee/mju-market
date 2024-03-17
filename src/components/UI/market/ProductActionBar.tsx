import styled from 'styled-components';
import heart_empty from '../../../assets/heart-empty.svg';

type Price = {
  price: number | undefined;
};

const ProductActionBar: React.FC<Price> = ({ price, ...attrProps }) => {
  return (
    <Container {...attrProps}>
      <LikeButton>
        <img src={heart_empty} />
      </LikeButton>
      <Line />
      <Price>{price}원</Price>
      <ChatButton>1:1 채팅하기</ChatButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-top: 1px solid rgba(204, 204, 204, 0.2);
  background-color: white;
`;
const LikeButton = styled.button`
  margin-left: 10px;
`;
const Line = styled.div`
  width: 1px;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const Price = styled.div`
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const ChatButton = styled.button`
  width: 170px;
  height: 40px;
  margin-left: auto;
  border-radius: 6px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  color: white;
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;

export default ProductActionBar;
