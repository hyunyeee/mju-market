import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import addIcon from '../../assets/img/add_icon.svg';

type Props = { path: string };
const WriteButton: React.FC<Props> = ({ path }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(path)}>
      <Img src={addIcon} alt="글쓰기 버튼" />
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 100px;
  right: 10px;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
`;

export default WriteButton;
