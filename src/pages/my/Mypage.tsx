import BackButton from '../../components/UI/BackButton';
import LogoutButton from '../../components/UI/my/LogoutButton';
import styled from 'styled-components';

const Mypage = () => {
  return (
    <Container>
      <BackButton />
      <LogoutButton />
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
`;
export default Mypage;
