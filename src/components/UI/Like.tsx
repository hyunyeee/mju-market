import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { ProductContext } from '../../context/ProductContext';
import { patchLike, patchMarketLike } from '../../api/like';
import heartClicked from '../../assets/img/heart_clicked.svg';
import heartEmpty from '../../assets/img/heart-empty.svg';

type LikeProps = {
  boardId?: number;
  categoryId?: number;
  productId?: number;
  likeCount: number;
  initialClicked: boolean;
};
const Like: React.FC<LikeProps> = ({
  boardId,
  productId,
  likeCount,
  initialClicked,
}) => {
  const [likeStatus, setLikeStatus] = useState<boolean>(initialClicked);
  const [renderLikeCount, setRenderLikeCount] = useState(likeCount);
  const { categoryIndex } = useContext(ProductContext);
  const token = useToken();
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      if (boardId) {
        const isLiked = await patchLike(token, boardId);
        setLikeStatus(isLiked);
      } else if (categoryIndex !== undefined && productId) {
        const isLiked = await patchMarketLike(token, categoryIndex, productId);
        setLikeStatus(isLiked);
      } else {
        return;
      }
      setRenderLikeCount((prev) => (likeStatus ? prev - 1 : prev + 1));
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
        <Img src={likeStatus ? heartClicked : heartEmpty} />
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
