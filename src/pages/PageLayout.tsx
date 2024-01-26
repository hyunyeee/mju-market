import styled from 'styled-components';

type Pages = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Pages) => {
  return <PageContainer>{children}</PageContainer>;
};

const PageContainer = styled.div`
  width: 100vw;
  height: 100%;
  color: ${({ theme }) => theme.colors.TXT_GRAY};
`;
export default PageLayout;
