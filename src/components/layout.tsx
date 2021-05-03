/** @jsxImportSource @emotion/react */
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Footer_nav from './footer_nav';
import Modal from './UI/modal';
import * as actions from '../store/actions/index';

interface LayoutProps extends RouteComponentProps {
    children: React.ReactNode;
    isIntro?: Boolean;
    footerNone?: Boolean;
    num?: String;
}

function Layout({ children, history, isIntro, num, footerNone }: LayoutProps) {
    const [headerColor, setHeaderColor] = useState('black');
    const [isWriteClicked, setIsWriteClicked] = useState(false);
    const [oldScroll, setOldScroll] = useState(window.pageYOffset);
    const [shouldNavHide, setShouldNavHide] = useState(false);

    const directRef = useRef<HTMLTextAreaElement>(null!);
    const dispatch = useDispatch();

    useEffect(() => {
        const currPath = window.location.pathname;
        let NavInterval: NodeJS.Timeout;
        if(currPath === '/' || currPath === '/search' || currPath === '/my-profile' || currPath === '/friend-profile' || currPath.includes('/my/article') || currPath.includes('/friend/article')) {
            NavInterval = setInterval(() => {
                window.addEventListener('scroll', handleScroll)
            }, 150);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(NavInterval);
        }
    }, [oldScroll]);

    // Scroll에 따라 Headroom 변경 || Navigation 변경
    const handleScroll = useCallback(() => {
        const currPath = window.location.pathname;
        if(currPath === '/') {
            const screenHeight = window.innerHeight;
            if(window.scrollY > screenHeight) {
                setHeaderColor('white');
            }else
                setHeaderColor('black')
        }else if(currPath === '/my-profile' || currPath === '/search' || currPath === '/friend-profile' || currPath.includes('/my/article') || currPath.includes('/friend/article') ) {
            const newScroll = window.pageYOffset;
            const willHide = newScroll > oldScroll;
            setShouldNavHide(willHide);
            setOldScroll(newScroll);
        }   

    }, [oldScroll]);
    
    const jobAdjSubmitHandler = useCallback((e) => {
        e.preventDefault();
        const currPath = window.location.pathname;
        const text = directRef.current.value;
        console.log(text);
        if(currPath === '/setting/3') { //job
            dispatch(actions.addJob(text));
            history.push('/setting/4');
        }else {  //adj
            dispatch(actions.addAdj(text));
            history.push('/setting/5');
        }
        setIsWriteClicked(false);
        directRef.current.value = '';
    }, []);

    return (
        <div 
            id="layout" 
            css={css`
                background-color: ${isIntro ? "#F7F7FA" : '#fff'};
                @media (min-width: 700px) {
                    width: 400px;
                };
                margin: 0 auto;
                position: relative;
            `} 
        >
            {num === '3' || num === '4' ? (
                <aside>
                    <img
                        style={{width: '60px', height: '60px', zIndex: 999, position: 'fixed', right: 20, bottom: 30, cursor: 'pointer'}} 
                        onClick={() => setIsWriteClicked(true)}
                        src="/setting/write.svg"
                        alt="write"
                    />
                </aside>
            ) : null}
            <Modal show={isWriteClicked} clicked={() => setIsWriteClicked(false)} type="directInput">
                <img 
                    onClick={() => setIsWriteClicked(false)}
                    style={{width: 25, height: 25, margin: '0 0 0 auto'}}
                    src="/close-outline.svg"
                    alt="x"
                />
                <form onSubmit={(e) => jobAdjSubmitHandler(e)}>
                    <textarea 
                        name="directInput"
                        id="directInput"
                        ref={directRef}
                        autoFocus
                        placeholder="회원님은 어떤 사람인가요? 직접입력해보세요."
                        style={{height: '100px', backgroundColor: "#F7F7FA", textAlign: 'center'}}
                        className="my-10 px-3 py-5 w-full text-base placeholder-gray-300">
                    </textarea>
                    <button onClick={(e) => jobAdjSubmitHandler(e)} style={{backgroundColor: "#979B9F", color: '#fff', padding: "10px 60px", borderRadius: 2}}>
                        확인
                    </button>
                </form>
            </Modal>
            {isIntro ? (
                <>
                    <header>
                        <div
                            id="introHeader"
                            css={css`
                                position: fixed;
                                width: 100%;
                                z-index: 300;
                                background-color: ${headerColor};
                                -webkit-transition: all .5s ease-in-out;
                                -moz-transition: all .5s ease-in-out;
                                -o-transition: all .5s ease-in-out;
                                transition: all .5s ease-in-out;
                                @media (min-width: 700px) {
                                    width: 400px;
                                }
                            `}
                        >
                            <div className="flex flex-row items-center justify-between px-5 py-7">
                                <h3 style={{color: headerColor === 'black' ? 'white' : 'black'}} className="m-0 text-xl font-bold text-white">XIRCLE</h3>
                                <nav>
                                    <label 
                                        onClick={() => history.push('/select')} 
                                        style={{border: '1px solid black'}} 
                                        css={css`
                                            border-radius: 1px solid black;
                                            cursor: pointer;
                                            padding: 8px 24px;
                                            border-radius: 3px;
                                            font-size: bold;
                                            background-color: ${headerColor === 'black' ? 'white' : 'black'};
                                            color: ${headerColor === 'black' ? 'black' : 'white'};
                                        `}
                                        className="font-bold bg-white focus:outline-none"
                                    >
                                        구경하기</label>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <div style={{height: 73, backgroundColor: 'black'}}></div>
                </>
            ) : isIntro ?  <header style={{height: 73, backgroundColor: 'black'}}></header> : null}

            <main className="min-h-screen w-full relative">
                {children}
                <footer style={{position: 'fixed', zIndex: 200, left: '50%', bottom: -20, transition: '.5s ease', transform: shouldNavHide ? 'translate(-50%, 50px)' : 'translate(-50%, -50px)'}}>
                    <Footer_nav footerNone/>
                </footer>
            </main>

            {/* footer */}
            {isIntro ? (
                <footer 
                    style={{height: '40vh', backgroundColor: '#000', padding: '50px 20px 60px'}}>
                    <div style={{color: '#D9D9D9'}}>
                        <p style={{margin: 0}}>고객센터 (팀) 연고링</p> <br/>
                        <p style={{margin: 0}}>각종 문의 : <a style={{color: '#4183c4'}} href="https://pf.kakao.com/_kDxhtK">[XIRCLE] 카카오톡 채널</a></p>
                        <p style={{margin: 0}}>이메일 문의 : <a style={{color: '#4183c4'}} href="https://www.instagram.com/xircle_official/">XIRCLE 인스타그램</a></p>
                        <p style={{margin: 0}}>비즈니스 문의 : <a style={{color: '#4183c4'}} href="https://www.instagram.com/xircle_official/">XIRCLE 인스타그램</a></p>
                        <br/>
                        <p style={{margin: 0}}>XIRCLE 인스타그램</p> 
                        <p style={{margin: 0}}>XIRCLE 페이스북</p>  
                        <p style={{margin: 0}}>XIRCLE 유튜브 채널 [오픈 예정]</p>
                    </div>
                </footer>
            ) : 
                null
            }
        </div>
    )
}

export default withRouter(Layout);