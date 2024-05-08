import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import addIcon from '../../assets/add_icon.svg';

type Props = { path: string };
const WriteButton: React.FC<Props> = ({ path }) => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(path)}>
      <img src={addIcon} alt="글쓰기 버튼" />
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 80px;
  right: 10px;
`;

export default WriteButton;
