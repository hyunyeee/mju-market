import styled from 'styled-components';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChatRoom } from '../../../api/chat';
import { buyProduct } from '../../../api/market';
import { ProductContext } from '../../../context/ProductContext';
import Like from '../Like';

type ProductActionBarProps = {
  price: number;
  token: string;
  id: number;
  ownerId: number;
  isMyProduct: boolean;
  likedCount: number;
  isLikedAlreadyByMe: boolean;
};

const ProductActionBar: React.FC<ProductActionBarProps> = ({
  price,
  token,
  id,
  ownerId,
  isMyProduct,
  likedCount = 0,
  isLikedAlreadyByMe = false,
  ...attrProps
}) => {
  const { categoryIndex } = useContext(ProductContext);
  const navigate = useNavigate();

  const buy = async () => {
    const response = confirm(`구매할까요?`);
    if (!token) {
      return;
    }
    if (response) {
      await buyProduct(token, categoryIndex, id, price);
    }
  };

  const createRoom = async () => {
    const response = await createChatRoom(token, id, ownerId);
    const { chatRoomId, productId } = response;
    navigate(`/chatting?productId=${productId}&chatRoomId=${chatRoomId}`);
  };

  return (
    <Container {...attrProps}>
      <Like
        productId={id}
        likeCount={likedCount}
        initialClicked={isLikedAlreadyByMe}
      />
      <Line />
      <PriceTag>{price}원</PriceTag>
      {!isMyProduct && (
        <Buttons>
          <ChatButton onClick={buy}>구매하기</ChatButton>
          <ChatButton onClick={createRoom}>1:1 채팅</ChatButton>
        </Buttons>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  border-top: 1px solid rgba(204, 204, 204, 0.2);
  background-color: white;
`;
const Line = styled.div`
  width: 1px;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const PriceTag = styled.div`
  ${({ theme }) => theme.typographies.BIG_TXT};
  white-space: nowrap;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;
const ChatButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  white-space: nowrap;
  border-radius: 6px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  color: white;
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;

export default ProductActionBar;
