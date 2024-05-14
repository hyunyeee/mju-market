import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/img/back_icon.svg';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)}>
      <img src={backIcon} alt="뒤로가기 버튼" />
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  top: 20px;
  left: 10px;
`;

export default BackButton;
