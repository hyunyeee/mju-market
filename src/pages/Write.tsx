import styled from 'styled-components';
import remove_btn from '../assets/x.svg';
import camera from '../assets/camera.svg';
import delete_img_btn from '../assets/delete_image.svg';

const Write: React.FC = () => {
  return (
    <Container>
      <Title>글쓰기</Title>
      <AddImageContainer>
        <SubTitle>상품 이미지 등록</SubTitle>
        <ImageBox>
          <AddButton>
            <img src={camera} />
            5/10
          </AddButton>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
          <Image>
            <DeleteBtn src={delete_img_btn} />
          </Image>
        </ImageBox>
      </AddImageContainer>
      <Content>
        <Name>
          <Input placeholder="상품명" />
          <RemoveButton>
            <DeleteIcon src={remove_btn} />
          </RemoveButton>
        </Name>
        <Price>
          <Input placeholder="판매가격" />원
          <RemoveButton>
            <DeleteIcon src={remove_btn} />
          </RemoveButton>
        </Price>
        <Category>
          <select>
            <option value="default">카테고리 선택</option>
          </select>
        </Category>
      </Content>
      <ProductDescription>
        <textarea placeholder="제품 설명을 작성해주세요" />
      </ProductDescription>
      <SubmitButton>작성 완료</SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const Title = styled.h1`
  margin: 20px auto 0;
  text-align: center;
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const SubTitle = styled.h2`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const AddImageContainer = styled.div`
  ${({ theme }) => theme.typographies.DEFAULT};
`;
const ImageBox = styled.div`
  padding: 10px 0;
  display: flex;
  gap: 12px;
  overflow-x: scroll;
`;
const AddButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-shrink: 0;
`;
const Image = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.BG_LIGHT_GRAY};
  flex-shrink: 0;
`;
const DeleteBtn = styled.img`
  position: absolute;
  z-index: 1;
  top: -5px;
  right: -8px;
  cursor: pointer;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};

  & > div {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    height: 60px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  }
`;

const Name = styled.div``;
const Category = styled.div``;
const Price = styled.div``;
const RemoveButton = styled.button`
  height: 100%;
`;
const DeleteIcon = styled.img`
  margin-top: 3px;
`;
const Input = styled.input`
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
const ProductDescription = styled.p`
  height: 300px;
  padding: 20px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  border: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  border-radius: 8px;
`;
const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 6px;
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
  color: white;
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;
export default Write;
