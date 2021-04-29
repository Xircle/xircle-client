/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Layout from '../components/layout';

type SecureProps = {
    history: any
}

function Secure({ history }: SecureProps) {
    return (
        <div className="w-full overflow-x-hidden">
            <Layout footerNone>
                <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                    <img
                        onClick={() => history.goBack()} 
                        style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                        src="/arrow-back-outline.svg"
                        alt="back"
                    />
                </nav>
                <section className="mb-10">
                    <section style={{padding: '10px 30px'}} className="text-center mt-5">
                        <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}}>개인정보</h1>
                        <p style={{fontSize: '10px', color: "#858585", textAlign: 'left', margin: '20px auto', whiteSpace: 'pre-line'}}>XIRCLE은 이용자의 사전 동의 없이는 이용자의 개인정보를 함부로 공개하지 않으며, 수집된 정보는 아래와 같이 이용하고 있습니다. 이용자가 제공한 모든 정보는 아래의 목적에 필요한 용도 이외로는  사용되지 않으며 이용 목적이 변경될 시에는 이를 알리고 동의를 구할 것입니다.</p>
                    </section>
                    <div style={{padding: '0 30px'}}>
                        <section 
                            css={css`
                                height: 300px;
                                margin: 10px auto;
                                padding: 20px;
                                background-color: #F7F7FA;
                                overflow-y: auto;
                            `}
                        >
                            <span className="text-xs text-gray-400">
                                [정보통신망 이용 촉진 및 정보보호 등에 관한 법률 제30조의 2] 에 따라 써클서비스 회원의 개인 정보 이용내역을 다음과 같이 안내해 드립니다.
                                <br/>
                                <br/>
                                개인 정보 수집, 이용 현황
                                <br/>
                                <br/>
                                필수항목 : 아이디, 비밀번호, 이름, 휴대폰 번호, 이메일, 재학중인 대학교 이메일, 암호화된 이용자 확인값, IP주소, 쿠키, 서비스 이용기록, 방문기록 등
                                선택항목 : 이메일 수신여부, 문자수신여부
                                <br/>
                                <br/>

                                가. 회원가입 및 본인확인 - 아이디, 비밀번호, 이름, 휴대폰 번호, 이메일, 재학중인 대학교 이메일 - 회원제 서비스에 따른 본인확인 및 회원관리
                                나. 서비스 부정확인 - 이름, 휴대폰 번호, 접속 단말기 종류 - 서비스 부정 이용 방지를 위한 정보 확인
                                <br/>
                                <br/>

                                정보 보관 기한 : 회원 탈퇴 시까지<br/>
                                &nbsp; *단, 이름과 휴대폰 번호의 경우, 무분별한 탈퇴 및 재가입을 통한 서비스 품질 유지를 위해 탈퇴 후 6개월간 보관 <br/>
                                &nbsp; 써클은 안정적인 유저들의 활동을 보호하기 위해 휴면 서비스를 제공하고 있습니다. 휴면신청을 하면 써클 내부에서 모든 정보를 숨기고, 저희 써클의 서버 내에서만 존재합니다. 휴면 후 3개월이 지나면 자동으로 탈퇴 처리가 됩니다.
                                <br/>
                                <br/>

                                2. 개인정보 제3자 제공
                                써클은 회원들의 개인 정보를 고지한 범위 내에서만 사용하며, 회원님이 사전동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 개인 정보를 외부에 절대로 공개하지 않습니다. 하지만, 다음과 같은 경우에는 예외로 합니다.<br/>
                                - 회원이 사전에 동의한 경우<br/>
                                - 법령의 규정에 의거하거나, 범죄 행위 등으로 인한 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br/>
                            </span>
                        </section>
                    </div>
                    <div style={{width: '90%', margin: '0 auto'}}>
                        <button onClick={() => history.goBack()} className="w-full rounded-lg px-5 py-3 mt-10 bg-gray-400 text-white focus:text-white focus:bg-black focus:outline-none">
                            알겠습니다.
                        </button>
                    </div>
                </section>
            </Layout>
        </div>
    )
}

export default Secure;