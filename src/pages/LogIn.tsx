import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../components/UI/LogInForm';
import backIcon from '../assets/back_icon.svg';

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <BackButton>
        <img src={backIcon} alt="뒤로가기 버튼" />
      </BackButton>
      <Title>로그인</Title>
      <LogInForm />
      <SignUpButton onClick={() => navigate('/signup')}>회원가입</SignUpButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
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
export default LogIn;
