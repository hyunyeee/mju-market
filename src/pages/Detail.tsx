import styled from 'styled-components';
import ProductActionBar from '../components/UI/market/ProductActionBar';

const Detail: React.FC = () => {
  return (
    <Container>
      <ImageBox>image</ImageBox>
      <Information>
        <Author>Author &gt; </Author>
        <Counts>찜3 &nbsp; &nbsp; 조회10</Counts>
      </Information>
      <Content>
        <Title>Title</Title>
        <Category>Category</Category>
        <TextBody>Content</TextBody>
      </Content>
      <MenuBar />
    </Container>
  );
};

const Container = styled.div``;
const ImageBox = styled.section`
  height: 50vh;
  margin: -20px -20px 0;
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const Information = styled.section`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.typographies.SMALL_TXT};
`;
const Author = styled.div`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const Counts = styled.div`
  color: ${({ theme }) => theme.colors.TXT_LIGHT_GRAY};
`;
const Content = styled.section`
  margin-top: 30px;
`;
const Title = styled.h1`
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const Category = styled.p`
  text-decoration: underline ${({ theme }) => theme.colors.LIGHT_GRAY} solid;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
const TextBody = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const MenuBar = styled(ProductActionBar)`
  width: 100%;
  height: 70px;
  margin-left: -20px;
  position: fixed;
  bottom: 0;
`;
export default Detail;
