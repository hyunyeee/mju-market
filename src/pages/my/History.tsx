import styled from 'styled-components';
import BackButton from '../../components/UI/BackButton';
import { useEffect, useState } from 'react';
import { getHistory } from '../../api/myHistory';
import useToken from '../../hooks/useToken';
import { getMyId } from '../../api/auth';
import { HistoryProps } from '../../types';
import { useNavigate } from 'react-router-dom';

interface ClickStyle {
  $isClicked: boolean;
}
const History = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [memberId, setMemberId] = useState<number>();
  const [historyList, setHistoryList] = useState<HistoryProps[]>([]);
  const token = useToken();
  const navigate = useNavigate();

  const handleClick = (state: boolean) => {
    setIsSeller(state);
  };

  const getSenderId = async () => {
    if (!token) {
      return;
    }
    const myId = await getMyId(token);
    setMemberId(myId);
  };

  const fetchData = async () => {
    try {
      if (!token || !memberId) {
        return;
      }
      const response = await getHistory(token, memberId, isSeller);
      setHistoryList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isSeller, memberId]);

  useEffect(() => {
    getSenderId();
  }, [token]);

  return (
    <Container>
      <BackButton />
      <Buttons>
        <Button $isClicked={!isSeller} onClick={() => handleClick(false)}>
          구매
        </Button>
        <Button $isClicked={isSeller} onClick={() => handleClick(true)}>
          판매
        </Button>
      </Buttons>
      <ListContainer>
        {historyList?.map((history) => (
          <Box
            key={history.tradeHistoryId}
            onClick={() => navigate(`/products/${history.productId}`)}
          >
            <Title>{history.productTitle}</Title>
            <Price>{history.productOriginPrice}원</Price>
            <SellerName>
              {isSeller
                ? `구매자: ${history.buyerName}`
                : `판매자: ${history.sellerName}`}
            </SellerName>
          </Box>
        ))}
      </ListContainer>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 90px);
  padding: 60px 20px 20px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const Button = styled.button<ClickStyle>`
  padding: 10px 20px;
  border-radius: 4px;
  background-color: ${({ $isClicked, theme }) =>
    $isClicked && theme.colors.BLUE_2};
  color: ${({ $isClicked }) => $isClicked && `white`};
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const ListContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;
const Box = styled.div`
  width: 100%;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const Title = styled.p`
  ${({ theme }) => theme.typographies.BIG_TXT};
  margin-bottom: 4px;
`;
const Price = styled.p`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const SellerName = styled.p`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;

export default History;
