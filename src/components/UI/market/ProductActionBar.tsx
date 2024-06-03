import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createChatRoom } from '../../../api/chat';
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
  const navigate = useNavigate();

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
        <ChatButton onClick={createRoom}>1:1 채팅하기</ChatButton>
      )}
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
const Line = styled.div`
  width: 1px;
  height: 60%;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const PriceTag = styled.div`
  ${({ theme }) => theme.typographies.BIG_TXT};
  white-space: nowrap;
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
