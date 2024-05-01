import styled from 'styled-components';
import BoardForm from '../../components/UI/board/BoardForm';
import camera from '../../assets/camera.svg';
import deleteBtn from '../../assets/delete_image.svg';

const BoardWrite = () => {
  return (
    <Container>
      <Title>게시판 글쓰기</Title>
      <AddImageContainer>
        <SubTitle>이미지 등록</SubTitle>
        <ImageBox>
          <AddButton>
            <img src={camera} />
            5/10
          </AddButton>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
          <Image>
            <DeleteBtn src={deleteBtn} />
          </Image>
        </ImageBox>
      </AddImageContainer>
      <BoardForm />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
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

export default BoardWrite;
