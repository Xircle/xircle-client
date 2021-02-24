import React, { useCallback } from 'react'
import Footer_nav from './footer_nav';
import Banner from './banner';
import { Link } from 'react-router-dom';
import { createKakaoButton } from '../components/KakaoShareButton';

const Layout = ({ children, invitement, num, headerNone, footerNone }) => {
    const shareBtnClicked = useCallback(() => {
        createKakaoButton('#kakao-link-btn-second');
    }, []);
    return (
        <div 
            id="layout"
            className="flex flex-col mx-auto bg-white md:w-full"
        >
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
            ) : (
                null
            )}
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
            <main className="h-full min-h-screen">
                {children}
            </main>

            {/* footer */}
            <Footer_nav footerNone={footerNone}/>
        </div>
    )
}

export default Layout;