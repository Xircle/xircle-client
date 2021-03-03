import React, { useCallback, useState, useEffect } from 'react'
import Footer_nav from './footer_nav';
import Banner from './banner';
import { Link } from 'react-router-dom';
import { createKakaoButton } from '../components/KakaoShareButton';
import Headroom from 'react-headroom';
import { scrolltoTop } from '../components/scrolltoTop';

const Layout = ({ children, isIntro, invitement, num, footerNone, btnClicked, setBtnClicked }) => {
    const [headerColor, setHeaderColor] = useState('black');
    const [isInvitementClosed, setIsInvitementClosed] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        if(isIntro)
            document.body.style.backgroundColor = 'black';
        else
            document.body.style.backgroundColor = '#E4E4E4';
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    
    // Headroom. scroll에 따라 색깔 변경
    const handleScroll = useCallback(() => {
        const screenHeight = window.innerHeight;
        if(window.scrollY > screenHeight) {
            setHeaderColor('white');
        }else
            setHeaderColor('black')
    }, []);
    
    return (
        <div id="layout" style={{backgroundColor: isIntro ? 'black' : "white"}} className="flex flex-col mx-auto md:w-full">
            {num === '2' || num === '3' ? (
                <aside>
                    <img
                        style={{width: '60px', height: '60px', position: 'fixed', right: 10, bottom: 10, cursor: 'pointer'}} 
                        onClick={() => scrolltoTop()}
                        src="/arrow-up-circle.svg"
                        alt="scroll-top"
                        />
                </aside>
            ) : null}

            {invitement && !isInvitementClosed ? (
                <aside id="invitement">
                    <div className="relative flex flex-row justify-center items-center" style={{backgroundColor: "rgba(38, 38, 38, 0.8)", height: 64}}>
                        <p style={{color: 'white', margin: 0}}>XIRCLE 초대장 보내기</p>
                        <img 
                            src="/close-outline.svg"
                            alt="close"
                            color="white"
                            style={{width: 20, height: 20, position: 'absolute', right: 0, top: 0, backgroundColor: '#fff', cursor: 'pointer'}}
                            onClick={() => setIsInvitementClosed(true)}
                        />
                    </div>
                </aside>
            ) : null}

            {isIntro && !btnClicked ? (
                <header>
                    <Headroom
                        style={{
                            position: 'fixed', 
                            zIndex: 200, 
                            backgroundColor: headerColor,
                            WebkitTransition: 'all .4s ease-in-out',
                            MozTransition: 'all .4s ease-in-out',
                            OTransition: 'all .4s ease-in-out',
                            transition: 'all .4s ease-in-out',
                        }}
                    >
                        <div className="flex flex-row items-center justify-between px-5 py-7">
                            <h3 style={{color: headerColor === 'black' ? 'white' : 'black'}} className="m-0 text-xl font-bold text-white">Xircle.연고링</h3>
                            <nav>
                                <label onClick={() => scrolltoTop(setBtnClicked)} className="text-black cursor-pointer px-5 py-2 rounded-lg font-bold border-2 bg-white hover:bg-white hover:text-black focus:outline-none">사전신청하기</label>
                            </nav>
                        </div>
                    </Headroom>
                </header>
            ) : isIntro ?  <header style={{height: 73, backgroundColor: 'black'}}></header> : null}

            <main className="min-h-screen">
                {children}
            </main>

            {/* footer */}
            {isIntro ? (
                <footer style={{height: '40vh', padding: '50px 20px 60px'}}>
                    <div style={{color: '#D9D9D9'}}>
                        <p style={{margin: 0}}>고객센터 (팀) 연고링</p> <br/>
                        <p style={{margin: 0}}>각종 문의 : <a style={{color: '##4183c4'}} href="https://pf.kakao.com/_kDxhtK">[XIRCLE] 카카오톡 채널</a></p>
                        <p style={{margin: 0}}>이메일 문의 : <a style={{color: '##4183c4'}} href="https://www.instagram.com/ykring_official/">XIRCLE 인스타그램</a></p>
                        <p style={{margin: 0}}>비즈니스 문의 : <a style={{color: '##4183c4'}} href="https://www.instagram.com/ykring_official/">XIRCLE 인스타그램   010 8033 6028</a></p>
                        <br/>
                        <p style={{margin: 0}}>XIRCLE 인스타그램</p> 
                        <p style={{margin: 0}}>XIRCLE 페이스북</p>  
                        <p style={{margin: 0}}>XIRCLE 유튜브 채널 [오픈 예정]</p>
                    </div>
                </footer>
            ) : 
                <Footer_nav footerNone={footerNone}/>
            }
        </div>
    )
}

export default Layout;