import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/UI/BackButton';
import LogoutButton from '../../components/UI/my/LogoutButton';

const Mypage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackButton />
      <HistoryListButton onClick={() => navigate('/history')}>
        구매/판매 내역
      </HistoryListButton>
      <LogoutButton />
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
`;
const HistoryListButton = styled.button`
  margin-top: 90px;
  padding: 20px;
  text-align: start;
  ${({ theme }) => theme.typographies.BIG_TXT};
  border-top: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
  border-bottom: 1px solid ${({ theme }) => theme.colors.LIGHT_GRAY};
`;

export default Mypage;
