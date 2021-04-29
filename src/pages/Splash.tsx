/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, keyframes } from '@emotion/react';
import Layout from '../components/layout';

type SplashProps = {
    history: any
}

const Splash = ({ history }: SplashProps) => {
    console.log(typeof history);
    return (
        <Layout footerNone>
            <section style={{minHeight: '100vh', backgroundColor: '#000', padding: '30px 35px'}}>
                <span onClick={() => history.push('/secure')} style={{color: "#A7B0C0", margin: 0, float: 'right',  textAlign: 'right', cursor: 'pointer'}}>개인정보처리방침</span>

                <section 
                    css={css`
                        height: 88vh;
                        display: flex; 
                        flex-direction: column; 
                        justify-content: space-between;
                        clear: right;
                    `}
                >
                    <img 
                        css={css`
                            align-self: center;
                            margin-top: 20vh;
                            animation: ${FadeIn} 1s ease-in;
                        `}
                        src="/Logo/XIRCLE.svg"
                        alt="xircle"
                    />
                    <section css={css`display: flex; flex-direction: column; align-items:  center;`}>
                        <a onClick={() => history.push('/login')} style={{color: "#18A0FB", cursor: 'pointer', fontWeight: 700, fontSize: 16, textAlign: 'center', margin: '30px 0'}}>로그인하기</a>
                        <button 
                            css={css`
                                color: #8C94A4;
                                font-weight: 700;
                                background-color: #fff;
                                width: 80%;
                                border-radius: 60px;
                                padding: 20px 50px;
                                &:hover {
                                    background-color: #fff;
                                }
                                &:active {
                                    outline: none;
                                    background-color: #A7B0C0;
                                }
                            `}
                            onClick={() => history.push('/auth')}
                        >이메일 인증하기</button>
                        <button 
                            css={css`
                                color: #fff;
                                font-weight: 700;
                                background-color: #A7B0C0;
                                width: 80%;
                                border-radius: 60px;
                                padding: 20px 50px;
                                margin: 15px 0;
                                &:active {
                                    outline: none;   
                                }
                            `}
                            onClick={() => window.location.href= 'http://pf.kakao.com/_kDxhtK'} 
                        > 학생증/포털 이미지 가입</button>
                        <span css={css`color: #A7B0C0; margin: 15px 0;`}>1분 회원가입하시면 xircle을 즐기실 수 있어요!</span>
                    </section>
                </section>
            </section>
        </Layout>
    )
}

const FadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;



export default Splash;