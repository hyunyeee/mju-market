import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };
  return <Button onClick={() => onClick()}>로그아웃</Button>;
};

const Button = styled.button`
  width: 100%;
  height: 50px;
  margin-top: auto;
  color: white;
  ${({ theme }) => theme.typographies.DEFAULT};
  background-color: ${({ theme }) => theme.colors.LIGHT_GRAY};
`;
export default LogoutButton;
