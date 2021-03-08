import React, { useCallback, useEffect, useRef, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';
import LoadingIndicator from 'react-loading-indicator';
import ValidationButton from '../../components/UI/validationButton';

const FindAuth = ({ history }) => {
    return (
        <Layout headerNone footerNone={true}>
            <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                <img
                    onClick={() => history.goBack()} 
                    style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                    src="/arrow-back-outline.svg"
                    alt="back"
                />
                <a href='http://pf.kakao.com/_kDxhtK' style={{color: "#949393", cursor: 'pointer', marginRight: 30}}> 문의하기 </a>
            </nav>

            <section className="mb-10">
                <section style={{padding: '10px 30px'}} className="text-center mt-5">
                    <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}} className="text-2xl text-left">닉네임/비밀번호 찾기</h1>
                    <p style={{fontSize: '15px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto'}}>가입하신 학교 이메일을 적어주세요. <br/> 이메일로 기존 닉네임과 비밀번호를 발송해드립니다.</p>
                </section>
                <section className="px-10 mb-5">
                    <section className="text-center my-10">
                        <ValidationButton history={history} type="find"/>
                    </section>
                </section>
            </section>
        </Layout>
    )
}

export default FindAuth;