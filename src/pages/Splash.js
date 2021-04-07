import React from 'react';
import Layout from '../components/layout';

const Splash = ({ history }) => {
    return (
        <Layout headerNone footerNone={true}>
            <section style={{minHeight: '100vh', position: 'relative', backgroundColor: '#000', overflow: 'hidden', padding: '30px 35px'}} className="flex flex-col justify-between">
                <section style={{zIndex: 20, padding: '2.5rem 0'}}>
                    <p style={{color: "#8C94A4", margin: '10px 0', fontSize: 16}}>Interest friends SNS</p>
                    <h1 style={{color: "#fff", margin: '10px 0', fontSize: 48, fontStyle: 'italic', letterSpacing: 0.37}}>XIRCLE</h1>
                    <p style={{color: "#fff", fontWeight: 700, fontSize: 24}}>new <br/> Networking club</p>
                </section>
                <section style={{position: 'absolute', left: 60, zIndex: 10, width: 521, height: 521, borderRadius: 260}}>
                    <div style={{height: '100%', width: '100%', position: 'relative', marginTop: 10}}>
                        <img
                            style={{width: 372, height: 551, position: 'relative'}}
                            src="/UI/global_web.svg"
                            alt="web"
                        />
                        <img 
                            style={{position: 'absolute', left: '45%', top: '50%', transform: 'translate(-50%, -50%)'}}
                            src="/UI/white_x.svg" 
                            alt="xircle"
                        />

                    </div>
                </section>
                <section style={{zIndex: 30}} className="flex flex-col">
                    <a onClick={() => history.push('/login')} style={{color: "#18A0FB", textAlign: 'center', margin: '20px 0'}}>로그인하기</a>
                    <button 
                        style={{color: "#8C94A4", backgroundColor: "#fff", fontSize: 15, width: '100%', borderRadius: 60, padding: '20px 50px'}}
                        onClick={() => history.push('/auth')}
                    >이메일 인증하기</button>
                    <button 
                        style={{color: "#8C94A4", fontSize: 17, backgroundColor: "rgba(255, 255, 255, 0.87)", width: '100%', fontSize: 15, whiteSpace: 'pre', margin: '15px 0', borderRadius: 60, padding: '20px 50px'}} 
                        onClick={() => window.location.href= 'http://pf.kakao.com/_kDxhtK'} 
                    > 학생증/포털 이미지로 인증하기</button>
                </section>

            </section>
        </Layout>
    )
}

export default Splash;