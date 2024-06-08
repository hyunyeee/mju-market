import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const onClick = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.clear();
      setToken(null);
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
