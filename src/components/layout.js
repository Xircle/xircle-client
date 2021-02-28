import React, { useCallback, useState, useEffect } from 'react'
import Footer_nav from './footer_nav';
import Banner from './banner';
import { Link } from 'react-router-dom';
import { createKakaoButton } from '../components/KakaoShareButton';
import Headroom from 'react-headroom';

const Layout = ({ children, isIntro, invitement, num, headerNone, footerNone }) => {
    const [headerColor, setHeaderColor] = useState('black');

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        if(isIntro)
            document.body.style.backgroundColor = 'black';
        else
            document.body.style.backgroundColor = '#E4E4E4';
    }, []);

    const shareBtnClicked = useCallback(() => {
        createKakaoButton('#kakao-link-btn-second');
    }, []);

    // Head room. scroll에 따라 색깔 변경
    const handleScroll = useCallback(() => {
        const screenHeight = window.innerHeight;
        if(window.scrollY > screenHeight) {
            setHeaderColor('white');
        }else
            setHeaderColor('black')
    }, []);
    
    return (
        <div id="layout" style={{backgroundColor: isIntro ? 'black' : "white"}} className="flex flex-col mx-auto md:w-full">
            {!headerNone ? (
                <>
                    <nav className="flex flex-row justify-between px-3 py-2">
                        <Link to="/my-profile">
                            <img
                                style={{width: 40, height: 40}}
                                src="/yk-logo.png"
                                alt="yk-logo"
                                className=" rounded-2xl"
                            />
                        </Link>
                        <div className="flex flex-row items-center">
                            <Link to="/my-profile">
                                <img 
                                    style={{width: 30, height: 30, margin: '0 10px'}}
                                    src="/notifications-outline.svg"
                                    alt="notification"
                                />
                            </Link>
                            <Link to="/my-profile">
                                <img 
                                    style={{width: 30, height: 30, margin: '0 10px'}}
                                    src="/Article/ellipsis-vertical-outline.svg"
                                    alt="notification"
                                />
                            </Link>
                            
                        </div>
                    </nav>
                    {/* Banner */}
                    <Banner />
                </>
            ) : null}

            {num === '2' || num === '3' ? (
                <aside>
                    <img
                        style={{width: '60px', height: '60px', position: 'fixed', right: 10, bottom: 10, cursor: 'pointer'}} 
                        onClick={() => window.scrollTo(0, 0)}
                        src="/arrow-up-circle.svg"
                        alt="scroll-top"
                        />
                </aside>
            ) : null}

            {invitement ? (
                <aside style={{width: '100%', position: 'fixed', bottom: 30, left: 'calc(50% - 159px)'}}>
                    <button onClick={() => shareBtnClicked()} id="kakao-link-btn-second" className="focus:outline-none" style={{padding: '10px 100px', border: '1px solid black', backgroundColor: '#eee', borderRadius: '10px'}}>연고링 초대장 보내기</button>
                </aside>
            ) : null}

            {isIntro ? (
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
                                <Link to="/start">
                                    <label className="text-black cursor-pointer px-5 py-2 rounded-lg font-bold border-2 bg-white hover:bg-white hover:text-black focus:outline-none">사전신청하기</label>
                                </Link>
                            </nav>
                        </div>
                    </Headroom>
                </header>
            ) : null}

            <main className="min-h-screen">
                {children}
            </main>

            <Footer_nav footerNone={footerNone}/>

            {/* footer */}
            <footer>
                <div></div>
            </footer>
        </div>
    )
}

export default Layout;