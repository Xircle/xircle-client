import React, { useCallback, useEffect, useState, useRef }  from 'react';
import { RouteComponentProps } from 'react-router';
import Layout from '../../components/layout';
import ValidationButton from '../../components/UI/validationButton';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from 'react-spinner-material';
import universitySwitcher from '../../components/universitySwitcher';
import { RootState } from '../../index';

const Auth = ({ history }) => {
    const isLoading = useSelector((store) => store.auth.loading);
    const isEmailSent = useSelector(store => store.auth.isEmailSent); //만약 토큰이 있으면 AUTH_SUCCESS 이므로
    const errCodeInRedux = useSelector(store => store.auth.errCode);
    const emailInRedux = useSelector(store => store.auth.email); 
    const univInRedux = useSelector(store => store.auth.univ); 
    const dispatch = useDispatch();

    const passwordRef = useRef();

    let description = null;
    if(isLoading === false) { //메일이 보내진거임. null에서 false 됐으니까
        description = (
            <p style={{fontSize: '15px', color: "#C5C1C1", textAlign: 'left', whiteSpace: 'preline', margin: '20px auto'}}>
                <strong style={{color: "#4A87FF"}}>{emailInRedux}</strong> 메일로 인증번호가 전송되었습니다. 이메일로 받은 인증번호를 입력해주세요. 이메일을 다시 입력하시려면 새로고침 해주세요.
            </p>
        )
    }else {
        if(isEmailSent === null || isLoading === true) { //맨 처음에만 보이게
            description = (
                <p style={{fontSize: '14px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto'}}>
                    이메일을 인증해주세요. <br/>Xircle은 베타테스트단계로  <br/>서울대 고려대 연세대 서강대 한양대 성균관대 <br/> 학생들로만 진행중입니다. 
                </p>
            )
        }
    }

    const sendAgain = useCallback((event) => {
        event.preventDefault();
        dispatch(actions.auth(emailInRedux, univInRedux));
    }, [emailInRedux]);

    // POST /email
    const confirmAuth = useCallback((event) => {
        event.preventDefault();
        
        const index = emailInRedux.indexOf('@');
        const univ = emailInRedux.slice(index+1); // 영어
        const univKor = universitySwitcher(univ); //한국말

        
        const code = passwordRef.current.value;
        dispatch(actions.authConfirm(emailInRedux, code, univKor));
    }, [emailInRedux]);

    // POST /check/email 에서만 실행됨.
    useEffect(() => {
        if(errCodeInRedux === null) {
            return null;
        }else if(errCodeInRedux === 0) { // SUCCESS 시 실행
            history.push('/start')
        }else if(errCodeInRedux === 450) {
            alert("이미 가입된 이메일입니다. 로그인 해주세요.");
            history.push('/login')
        }else if(errCodeInRedux === 453) {
            alert("인증번호가 일치하지 않습니다. 보안상의 이유로 이전 인증번호는 더이상 유효하지 않으니 인증메일을 재전송해주세요.")
        }else if(errCodeInRedux === 500) {
            alert("네트워크에 일시적인 오류가 생겼습니다. 잠시 후 다시 시도해주세요.")
        }
    }, [errCodeInRedux]);
    
    return (
        <Layout headerNone footerNone={true}>
            <div style={{height: '60px', justifyContent: 'flex-end'}} className="flex flex-row items-center ">
                <span onClick={() => history.push('/login')} style={{color: "#2F51F0", fontSize: 16, fontWeight: 500,  margin: '20px 15px 0 0', textAlign: 'right', cursor: 'pointer'}}>로그인하기</span>
            </div>
            <section className="mb-10">
                <section style={{padding: '10px 30px'}} className="text-center mt-5">
                    <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}} className="text-2xl text-left">{isEmailSent ? '인증번호 입력' : '이메일 인증'}</h1>
                    {description}
                </section>
                <section className="px-10 mb-5">
                    {isEmailSent ? (
                        <>
                            <div style={{marginTop: 30}}>
                                <input 
                                    type="password"
                                    ref={passwordRef}
                                    style={{width: '90%'}}
                                    placeholder="인증번호입력"
                                    className="bg-gray-100 px-5 py-5"
                                />
                            </div>
                            {isLoading ? (
                            <div style={{height: '90px'}} className="relative">
                                <div style={{position: 'absolute', left: '50%', top: '30%', transform: 'translate(-50%, 0)'}}>
                                    <Spinner
                                        size={5}
                                        color={"#aaa"}
                                    />
                                </div>
                            </div> ) : <div style={{height: '90px'}}></div>}
                            <button onClick={(e) => confirmAuth(e)} style={{backgroundColor: "#979B9F"}} className="font-sans w-full rounded-lg px-5 py-3 text-white  focus:outline-none">
                                확인
                            </button>
                            <button onClick={(e) => sendAgain(e)} style={{color: "#949393", backgroundColor: "#F7F7FA"}} className="font-sans w-full border-2 rounded-lg px-5 py-3 mt-5 focus:outline-none ">
                                인증메일 재전송
                            </button>
                            <a href="http://pf.kakao.com/_kDxhtK" style={{color: "#949393", display: 'block', margin: '30px', textAlign: 'center'}}>인증이 안되시나요?</a>
                        </>
                    ) : (
                        <ValidationButton type="auth" history={history}/>
                    )}
                </section>
            </section>
        </Layout>
    )
}

export default Auth;


