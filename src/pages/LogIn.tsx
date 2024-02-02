import styled from 'styled-components';
import AuthInput from '../components/UI/AuthInput';
import { ReactComponent as ID_icon } from '../assets/id_icon.svg';
import { ReactComponent as PWD_icon } from '../assets/pwd_icon.svg';
import BACK_ICON from '../assets/back_icon.svg';

const LogIn: React.FC = () => {
  return (
    <Container>
      <BackButton>
        <img src={BACK_ICON} alt="뒤로가기 버튼" />
      </BackButton>
      <Title>로그인</Title>
      <InputContainer>
        <AuthInput type="text">
          <ID_ICON />
        </AuthInput>
        <AuthInput type="password">
          <PWD_ICON />
        </AuthInput>
      </InputContainer>
      <Button>로그인</Button>
      <SignUpButton>회원가입</SignUpButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BackButton = styled.button`
  margin: 20px auto 20px 0;
`;
const Title = styled.p`
  color: ${({ theme }) => theme.colors.BLUE_2};
  font-size: 28px;
  font-weight: 800;
`;
const InputContainer = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  gap: 10px;
`;
const ID_ICON = styled(ID_icon)`
  width: 24px;
`;
const PWD_ICON = styled(PWD_icon)`
  width: 24px;
`;
const Button = styled.button`
  width: 100%;
  height: 56px;
  margin-bottom: 40px;
  border-radius: 6px;
  color: white;
  ${({ theme }) => theme.typographies.BIG_TXT};
  background-color: ${({ theme }) => theme.colors.BLUE_2};
`;
const SignUpButton = styled.button`
  color: ${({ theme }) => theme.colors.BLUE_2};
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
export default LogIn;
