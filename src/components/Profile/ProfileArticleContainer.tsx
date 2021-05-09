/** @jsxImportSource @emotion/react */
import { useState, useEffect , memo } from 'react';
import { css } from '@emotion/react';
import colors from '../../constants/colors';
import styled from '@emotion/styled';
import type { Interest, InterestInfo } from '../../store/modules/articles';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { getArticlesByInterestThunk } from '../../store/modules/articles';

function ProfileArticleContainer({ active } : { active: Interest | '전체' }) {
    const { status, articles, error } = useAppSelector(store => store.articles);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(false) return; // 리덕스에 있으면 요청 취소 

        // dispatch(getArticlesByInterestThunk(active));
    }, []);

    if(status === 'pending') return <ArticleContainer>로딩중입니다...</ArticleContainer>
    if(error) return <ArticleContainer>에러 발생했습니다. 새로고침 해주세요.</ArticleContainer>
    if(!articles) return <ArticleContainer> 게시글이 없어요 :( </ArticleContainer>;

    return (
        <ArticleContainer>
            hello
        </ArticleContainer>
    );
}

const ArticleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    background-color: ${colors.xircleBg};
    color: #A7B0C0;
    font-size: 18px;
`;

export default memo(ProfileArticleContainer);