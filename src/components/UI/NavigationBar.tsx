import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navList } from '../../assets/data/navigatePaths';

const NavigationBar: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = (path: string) => {
    navigate(path);
    setCurrentPath(path);
  };

  useEffect(() => {
    if (location.pathname !== currentPath) {
      setCurrentPath(location.pathname);
    }
  }, [location.pathname]);
  return (
    <NavBox>
      {navList.map((item) => (
        <Link key={item.path} onClick={() => onClick(item.path)}>
          <Img
            src={item.path === currentPath ? item.filledImg : item.emptyImg}
          />
          <Label>{item.label}</Label>
        </Link>
      ))}
    </NavBox>
  );
};

const NavBox = styled.div`
  padding: 7px 0 34px;
  width: 100vw;
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: white;
`;
const Link = styled.button`
  width: 100%;
`;
const Img = styled.img``;
const Label = styled.p`
  ${({ theme }) => theme.typographies.SMALL_TXT};
  line-height: 14px;
`;

export default NavigationBar;
