import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

type Pages = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Pages) => {
  return <PageContainer>{children || <Outlet />}</PageContainer>;
};

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 20px 20px 0;
  color: ${({ theme }) => theme.colors.TXT_GRAY};
`;
export default PageLayout;
