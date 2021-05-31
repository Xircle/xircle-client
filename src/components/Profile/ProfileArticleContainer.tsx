/** @jsxImportSource @emotion/react */
import { useState, useEffect, memo } from 'react';
import { css } from '@emotion/react';
import colors from '../../constants/colors';
import styled from '@emotion/styled';
import type { Interest, InterestInfo } from '../../store/modules/articles';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { getArticlesByInterestThunk } from '../../store/modules/articles';
import { url } from 'inspector';
import ProfileArticleCard from './ProfileArticleCard';

function ProfileArticleContainer({
  activeInterest,
}: {
  activeInterest: Interest | '전체';
}) {
  const { status, articles, error } = useAppSelector((store) => store.articles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (articles?.[activeInterest]) return; // 리덕스에 있으면 요청 취소
    dispatch(getArticlesByInterestThunk(activeInterest));
  }, [activeInterest]);

  if (status === 'pending')
    return <ArticleContainer>로딩중입니다...</ArticleContainer>;
  if (error)
    return (
      <ArticleContainer>에러 발생했습니다. 새로고침 해주세요.</ArticleContainer>
    );
  if (!articles?.[activeInterest] || articles[activeInterest].length === 0)
    return (
      <ArticleContainer
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        게시글을 올리고 <br/> 친구들과 네트워킹 해보세요!
      </ArticleContainer>
    );

  return (
    <ArticleContainer>
      <ArticleCardList>
        {articles[activeInterest].map((el, index) => (
          <ProfileArticleCard
            key={el.articleImgSrc}
            articleImgSrc={el.articleImgSrc!}
            articleTitle={el.articleTitle}
            index={index}
            interest={activeInterest}
          />
        ))}
      </ArticleCardList>
    </ArticleContainer>
  );
}

const ArticleCardList = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ArticleContainer = styled.div`
  padding: 40px 0;
  min-height: 200px;
  color: #8c94a4;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  background-color: ${colors.xircleBg};
  line-height: 25px;
`;

export default memo(ProfileArticleContainer);
