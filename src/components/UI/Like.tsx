import React, { useState } from 'react';
import styled from 'styled-components';
import heartEmpty from '../../assets/img/heart-empty.svg';
import heartClicked from '../../assets/img/heart_clicked.svg';

type LikeProps = {
  likeCount: number;
  initialClicked: boolean;
};
const Like: React.FC<LikeProps> = ({ likeCount, initialClicked }) => {
  const [isClicked, setIsClicked] = useState<boolean>(initialClicked);

  const onClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <Container>
      <Button onClick={onClick}>
        <Img src={isClicked ? heartClicked : heartEmpty} />
      </Button>
      {likeCount}
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
