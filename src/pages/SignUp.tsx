import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/UI/SignUpForm';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>회원가입</Title>
      <SignUpForm />
      <SignUpButton onClick={() => navigate('/login')}>로그인</SignUpButton>
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
