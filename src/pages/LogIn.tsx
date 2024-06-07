import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../components/UI/LogInForm';
import { submitAuthForm } from '../api/auth';

const LogIn: React.FC = () => {
  const navigate = useNavigate();

  const loginTestAccount = async () => {
    const testAuth = {
      id: 'test@test.com',
      password: '!!test123',
    };
    try {
      const token = await submitAuthForm(testAuth, 'login');
      localStorage.setItem('token', token);
      if (token !== undefined) {
        navigate('/');
        window.location.reload();
      } else {
        alert('로그인 정보가 유효하지 않습니다.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data);
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <LogInForm />
      <SignUpButton onClick={() => navigate('/signup')}>회원가입</SignUpButton>
      <TestLogInButton onClick={loginTestAccount}>
        테스트용 계정 로그인
      </TestLogInButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.p`
  margin-top: 40px;
  color: ${({ theme }) => theme.colors.BLUE_2};
  font-size: 28px;
  font-weight: 800;
`;
const SignUpButton = styled.button`
  color: ${({ theme }) => theme.colors.BLUE_2};
  ${({ theme }) => theme.typographies.BIG_TXT};
`;
const TestLogInButton = styled.button`
  color: ${({ theme }) => theme.colors.BLUE_2};
  ${({ theme }) => theme.typographies.MEDIUM_TXT};
`;
export default LogIn;
