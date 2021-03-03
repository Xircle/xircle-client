import React from 'react';
import Layout from '../../components/layout';

const airpodEvent = ({ history }) => {
    return (
        <Layout footerNone>
            <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                <img
                    onClick={() => history.goBack()} 
                    style={{width: '25px', height: '25px', cursor: 'pointer'}}
                    src="/arrow-back-outline.svg"
                    alt="back"
                />
            </nav>
            <section className="px-8 mt-8">
                <h1 style={{textAlign: 'left', marginBottom: '10px', fontSize: 24}} className="text-left">이벤트 참가</h1>
                <p style={{color: "#C5C1C1", textAlign: 'left', marginBottom: '13px'}}>이벤트 결과가 XIRCLE 인스타그램과 카카오톡채널로 공지가 됩니다 ( 3.20 )</p>
                <div className="flex flex-row justify-evenly my-3">
                    <a style={{color: "#8A8888"}} href="https://www.instagram.com/ykring_official/">XIRCLE 인스타그램  </a>
                    <a style={{color: "#8A8888"}} href="http://pf.kakao.com/_kDxhtK">  XIRCLE 카카오톡 채널</a>
                </div>
                <div style={{width: '100%', height: '40vh', backgroundColor: '#ccc'}}>

                </div>
                <section style={{transform: 'translate(-50%, 0)', width: '80%'}} className="absolute bottom-0 left-1/2">
                    <button 
                        onClick={() => history.push('/my-profile')}
                        style={{ backgroundColor: '#F7F7FA', border: '1px solid #8D8D8D'}} 
                        className="w-full rounded-lg py-3 text-black focus:outline-none"
                    > 내 프로필 캡쳐하기 </button>
                    <button 
                        onClick={() => history.push('/my-profile')}
                        style={{backgroundColor: '#F7F7FA', border: '1px solid #8D8D8D'}} 
                        className="w-full rounded-lg py-3 mt-3 mb-5 text-black focus:outline-none"
                    > 개발자 프로필 캡쳐하기 </button>
                </section>
            </section>
        </Layout>
    )
}

export default airpodEvent;