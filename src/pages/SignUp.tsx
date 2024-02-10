import styled from 'styled-components';
import SignUpForm from '../components/UI/SignUpForm';
import BACK_ICON from '../assets/back_icon.svg';

const SignUp: React.FC = () => {
  return (
    <Container>
      <BackButton>
        <img src={BACK_ICON} alt="뒤로가기 버튼" />
      </BackButton>
      <Title>회원가입</Title>
      <SignUpForm />
      <SignUpButton>로그인</SignUpButton>
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
  margin-top: 40px;
  color: ${({ theme }) => theme.colors.BLUE_2};
  font-size: 28px;
  font-weight: 800;
`;
const SignUpButton = styled.button`
  color: ${({ theme }) => theme.colors.BLUE_2};
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
export default SignUp;
