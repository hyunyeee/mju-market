import styled from 'styled-components';
import heart_empty from '../../assets/heart-empty.svg';

const ProductListItem: React.FC = () => {
  return (
    <ItemBox>
      <Content>
        <Image />
        <Description>
          <Title>Title</Title>
          <Price>Price</Price>
        </Description>
      </Content>
      <Like>
        <img src={heart_empty} />
        <div>3</div>
      </Like>
    </ItemBox>
  );
};

const ItemBox = styled.article`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
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
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
  flex-shrink: 1;
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
