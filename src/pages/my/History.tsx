import styled from 'styled-components';
import BackButton from '../../components/UI/BackButton';
import { useState } from 'react';

interface ClickStyle {
  $isClicked: boolean;
}
const History = () => {
  const [isSeller, setIsSeller] = useState(false);
  const handleClick = (state: boolean) => {
    setIsSeller(state);
  };
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
      <Box>
        <Title>productTitle</Title>
        <Price>productOriginPrice</Price>
        <SellerName>sellerName</SellerName>
      </Box>
      <Box>
        <Title>productTitle</Title>
        <Price>productOriginPrice</Price>
        <SellerName>sellerName</SellerName>
      </Box>
      <Box>
        <Title>productTitle</Title>
        <Price>productOriginPrice</Price>
        <SellerName>sellerName</SellerName>
      </Box>
      <Box>
        <Title>productTitle</Title>
        <Price>productOriginPrice</Price>
        <SellerName>sellerName</SellerName>
      </Box>
      <Box>
        <Title>productTitle</Title>
        <Price>productOriginPrice</Price>
        <SellerName>sellerName</SellerName>
      </Box>
      <Box>
        <Title>productTitle</Title>
        <Price>productOriginPrice</Price>
        <SellerName>sellerName</SellerName>
      </Box>
      <Box>
        <Title>productTitle</Title>
        <Price>productOriginPrice</Price>
        <SellerName>sellerName</SellerName>
      </Box>
      <Box>
        <Title>productTitle</Title>
        <Price>productOriginPrice</Price>
        <SellerName>sellerName</SellerName>
      </Box>
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
const Box = styled.div`
  width: 100%;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const Title = styled.p`
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const Price = styled.p`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const SellerName = styled.p`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;

export default History;
