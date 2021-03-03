import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

const Secure = ({ history }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }, []);
    return (
        <div className="w-full overflow-x-hidden">
            <Layout headerNone footerNone={true}>
                
                {/* main */}
                {isLoading ? (
                    <div className="w-full h-screen flex flex-col justify-center items-center">
                        <img 
                            style={{height: '150px', width: '150px', marginBottom: '10px'}}
                            src="/yk-logo.png"
                            alt="yk-logo"
                            className="rounded-2xl mx-auto"
                        />
                        <p>로딩중입니다..</p>
                    </div>
                ) : (
                    <>
                        <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                            <img
                                onClick={() => history.goBack()} 
                                style={{width: '25px', height: '25px', cursor: 'pointer'}}
                                src="/arrow-back-outline.svg"
                                alt="back"
                            />
                        </nav>
                        <section className="mb-10">
                            <section style={{padding: '10px 30px'}} className="text-center mt-5">
                                <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}}>개인정보</h1>
                                <p style={{fontSize: '10px', color: "#858585", textAlign: 'left', margin: '20px auto'}}>연고링은 이용자의 사전 동의 없이는 이용자의 개인정보를 함부로 공개하지 않으며, 수집된 정보는 아래와 같이 이용하고 있습니다.<br /> 이용자가 제공한 모든 정보는 아래의 목적에 필요한 용도 이외로는 <br /> 사용되지 않으며 이용 목적이 변경될 시에는 이를 알리고 동의를 구할 것입니다.</p>
                            </section>
                            <div style={{padding: '0 30px'}}>
                                <section style={{height: '300px', width: '100%', margin: '10px auto',  padding: '20px', backgroundColor: "#F7F7FA"}} className=" overflow-y-scroll">
                                    <span className="text-xs text-gray-400"><strong>1. 개인정보의 수집 및 이용 목적</strong> <br/> 가. 서비스 제공에 관한 업무 이행 - 컨텐츠 제공, 범죄 행위 사실 증명 위한 채팅방 내용 기록 <br/> 나. 회원관리 - 회원제 서비스 이용 및 제한적 본인 확인제에 따른 본인확인, 개인식별, 가입의사 확인, 가입 및 가입횟수 제한, 불만처리 등 민원처리, 공지사항 전달 <br/>
                                        <br />
                                        <strong>2. 수집하는 개인정보의 항목</strong> <br />
                                        [개인회원 가입]<br/>
                                        필수항목 :  아이디, 비밀번호, 이름, 핸드폰번호, 이메일, 재학중인 대학교 이메일, 
                                        암호화된 이용자 확인값(CI)<br/>
                                        선택항목 :  이메일 수신여부, 문자수신여부<br/>
                                        <br/>
                                        [자동수집] <br/>
                                        IP주소, 쿠키, 서비스 이용기록, 방문기록 등
                                        <br />
                                        <br />
                                        <strong>3. 개인정보의 보유 및 이용기간</strong> <br/>
                                        연고링은 원칙적으로 보유기간의 경과, 개인정보의 수집 및 이용목적의 달성 등 그 
                                        개인정보가 불필요하게 되었을 때에는 지체 없이 파기합니다. 다만, 다른 법령에 따라 
                                        보존하여야 하는 경우에는 그러하지 않을 수 있습니다. 불필요하게 되었을 때에는 지체
                                        없이 해당 개인정보를 파기합니다.
                                        <br />
                                        <br />
                                        회원정보<br/>
                                        - 탈퇴 시점 이후 일년간 보관(탈퇴회원과 관련된 법적 저촉 가능성, 무분별한 
                                        탈퇴 및 재가입으로 인한 서버의 부담 등)
                                    </span>
                                </section>
                            </div>
                            <div style={{width: '300px', margin: '0 auto'}}>
                                <button onClick={() => history.push('/phone-number')} className="w-full rounded-3xl px-5 py-3 mt-10 bg-gray-400 text-white focus:text-white focus:bg-black focus:outline-none">
                                    알겠습니다.
                                </button>

                            </div>
                        </section>
                    </>
                )}
                
            </Layout>
        </div>
    )
}

export default Secure;