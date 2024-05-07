import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <NavBox>
      <Link onClick={() => navigate('/likes')}>하트</Link>
      <Link onClick={() => navigate('/boards')}>보드</Link>
      <Link onClick={() => navigate('/')}>마켓</Link>
      <Link onClick={() => navigate('/chat')}>채팅</Link>
      <Link onClick={() => navigate('/mypage')}>메뉴</Link>
    </NavBox>
  );
};

const NavBox = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: dodgerblue;
`;
const Link = styled.button`
  width: 100%;
  background-color: pink;
`;

export default NavigationBar;
