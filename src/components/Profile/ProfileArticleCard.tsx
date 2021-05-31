/** @jsxImportSource @emotion/react */
import { useState, useEffect, memo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface Props {
  articleImgSrc: string;
  articleTitle?: string;
  index: number
  interest: string
}

export default function ProfileArticleCard({
  articleImgSrc,
  articleTitle,
  index,
  interest
}: Props) {
  const [clicked, setClicked] = useState(false);

  return (
    <Container>
      <ArticleCardListRow 
        backgroundImgUrl={articleImgSrc} 
        onClick={() => setClicked(!clicked)}
      />
      {clicked && (
        <Link to={`/my/article/${interest}/${index}`}>
          <Backdrop>
            {articleTitle}
          </Backdrop>
        </Link>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 45%;
`;

const Backdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #1a1c2d;
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  margin: 5px 3px;
  cursor: pointer;
`;

const ArticleCardListRow = styled.div<{ backgroundImgUrl: string }>`
  height: 310px;
  margin: 5px 3px;
  border-radius: 15px;
  background-image: ${(props) => `url(${props.backgroundImgUrl})`};
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
`;
