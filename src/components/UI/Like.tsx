import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { patchLike } from '../../api/like';

import heartEmpty from '../../assets/img/heart-empty.svg';
import heartClicked from '../../assets/img/heart_clicked.svg';

type LikeProps = {
  boardId: number;
  likeCount: number;
  initialClicked: boolean;
};
const Like: React.FC<LikeProps> = ({ boardId, likeCount, initialClicked }) => {
  const [isClicked, setIsClicked] = useState<boolean>(initialClicked);
  const [renderLikeCount, setRenderLikeCount] = useState(likeCount);
  const token = useToken();
  const navigate = useNavigate();

  const onClick = async () => {
    setIsClicked((prev) => !prev);
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      const likeStatus = await patchLike(token, isClicked, boardId);
      setIsClicked(likeStatus);
      setRenderLikeCount(likeStatus ? likeCount + 1 : likeCount);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data);
        navigate('/');
        if (error?.response?.status === 401) {
          navigate('/login');
        }
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('알 수 없는 에러가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <Button onClick={onClick}>
        <Img src={isClicked ? heartClicked : heartEmpty} />
      </Button>
      {renderLikeCount}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
`;
const Button = styled.button`
  height: 32px;
`;
const Img = styled.img``;

export default Like;
