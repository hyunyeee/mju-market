import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationBar from '../components/UI/NavigationBar';

type Pages = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Pages) => {
  const hasBottomNav = [
    '/',
    '/boards',
    '/likes',
    '/chat',
    '/mypage',
    '/history',
  ];
  const location = useLocation();

  return (
    <PageContainer>
      {children || <Outlet />}
      {hasBottomNav.includes(location.pathname) && <NavigationBar />}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  color: ${({ theme }) => theme.colors.TXT_GRAY};
`;
export default PageLayout;
