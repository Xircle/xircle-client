import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer_nav from './footer_nav';
import { scrolltoTop } from '../components/scrolltoTop';
import Modal from '../components/UI/modal';
import * as actions from '../store/actions/index';

const Layout = ({ children, history, isIntro, invitement, num, footerNone, btnClicked, setBtnClicked }) => {
    const [headerColor, setHeaderColor] = useState('black');
    const [isWriteClicked, setIsWriteClicked] = useState(false);
    const [oldScroll, setOldScroll] = useState(window.pageYOffset);
    const [shouldNavHide, setShouldNavHide] = useState(false);

    const directRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const NavInterval = setInterval(() => {
            window.addEventListener('scroll', handleScroll)
        }, 200);

        if(isIntro)
            document.body.style.backgroundColor = 'black';
        else
            document.body.style.backgroundColor = '#E4E4E4';
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
        }else if(currPath === '/my-profile' || currPath === '/friend-profile') {
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
        <div id="layout" style={{backgroundColor: isIntro ? 'black' : "white"}} className="flex flex-col mx-auto md:w-full relative">
            {num === '3' || num === '4' ? (
                <aside>
                    <img
                        style={{width: '60px', height: '60px', zIndex: 999, position: 'fixed', right: 20, bottom: 30, cursor: 'pointer'}} 
                        onClick={() => setIsWriteClicked(true)}
                        src="/setting/write.svg"
                        alt="write"
                    />
                    {/* <img
                        style={{width: '60px', height: '60px', position: 'fixed', right: 10, bottom: 10, cursor: 'pointer'}} 
                        onClick={() => scrolltoTop()}
                        src="/arrow-up-circle.svg"
                        alt="scroll-top"
                    /> */}
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
            {isIntro && !btnClicked ? (
                <>
                    <header>
                        <div
                            id="introHeader"
                            style={{
                                position: 'fixed', 
                                zIndex: 200,
                                width: '100%',
                                backgroundColor: headerColor,
                                WebkitTransition: 'all .5s ease-in-out',
                                MozTransition: 'all .5s ease-in-out',
                                OTransition: 'all .5s ease-in-out',
                                transition: 'all .5s ease-in-out',
                            }}
                        >
                            <div className="flex flex-row items-center justify-between px-5 py-7">
                                <h3 style={{color: headerColor === 'black' ? 'white' : 'black'}} className="m-0 text-xl font-bold text-white">XIRCLE</h3>
                                <nav>
                                    <label onClick={() => scrolltoTop(setBtnClicked)} style={{border: '1px solid black'}} className="text-black cursor-pointer px-5 py-2 rounded-lg font-bold bg-white focus:outline-none">사전신청하기</label>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <div style={{height: 73, backgroundColor: 'black'}}></div>
                </>
            ) : isIntro ?  <header style={{height: 73, backgroundColor: 'black'}}></header> : null}

            <main className="min-h-screen w-full relative">
                <footer style={{position: 'fixed', zIndex: 999, left: '50%', bottom: -20, transition: '.5s ease', transform: shouldNavHide ? 'translate(-50%, 50px)' : 'translate(-50%, -50px)'}}>
                    <Footer_nav history={history} footerNone={footerNone}/>
                </footer>
                {children}
            </main>

            {/* footer */}
            {isIntro ? (
                <footer style={{height: '40vh', padding: '50px 20px 60px'}}>
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