/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Button from '../UI/Button';
import { useAppSelector } from '../../hooks/useSelector';

export default function AuthFinal() {
    const { adj, job } = useAppSelector(store => store.profile.data);
    const { displayName } = useAppSelector(store => store.auth.data);

    return (
        <Container>
            <Logo 
                src="/Logo/xircleLogo.png" 
                alt="logo"
            />
            <ThanksWord>{adj} {job}
                <Name>
                    {displayName}
                </Name>
                님 ! <br/> 회원가입 대단히 감사합니다.
            </ThanksWord>
            <Text>
                <Blue>
                    현재는 친구 탐색과 게시글 작성까지만 
                    가능하며 기능들을 하나하나 추가해나가는 중입니다.
                </Blue> 
                기능 업데이트시 적어주신 문자로 연락을 드리겠습니다. 감사합니다.
            </Text>
            <Button css={css`background-color: #fff; color: #8C94A4; margin: 0px;`}>XIRCLE에 친구들 초대하기</Button>
            <Button css={css`background-color: #8C94A4;`}>
                <a href="https://xircle.org/login" css={css`color: #fff;`}>써클 로그인!</a>
            </Button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    margin: 0 0 30px;
`;

const Logo = styled.img`
    width: 120px;
    height: 120px;
`;

const ThanksWord = styled.span`
    padding: 0 4rem;
    margin: 10px 0;
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
`;

const Name = styled.span`
    font-weight: 300;
    font-size: 18px;
`;

const Text = styled.span`
    padding: 0 4rem;
    margin: 30px 0;
    color: #979797;
    line-height: 19px;
`;

const Blue = styled.span`
    color: #007FFF;
`;
