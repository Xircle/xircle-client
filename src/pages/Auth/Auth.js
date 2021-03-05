import React, { useCallback, useEffect, useState }  from 'react';
import Layout from '../../components/layout';
import ValidationButton from '../../components/UI/validationButton';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import LoadingIndicator from 'react-loading-indicator';

const Auth = ({ history }) => {
    const isLoading = useSelector(store => store.auth.loading);
    const isEmailSent = useSelector(store => store.auth.isEmailSent); //만약 토큰이 있으면 AUTH_SUCCESS 이므로
    const isConfirmed = useSelector(store => store.auth.isConfirmed);
    const email = useSelector(store => store.auth.email); 
    const univ = useSelector(store => store.auth.univ); 
    const dispatch = useDispatch();

    let description = null;
    if(isLoading === false) { //메일이 보내진거임. null에서 false 됐으니까
        description = (
            <p style={{fontSize: '15px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto'}}>
                <strong style={{color: "#4A87FF"}}>{email}</strong> 메일로 전송되었습니다. 인증 메일을 확인하시고 돌아오셔서 아래의 버튼을 눌러주세요. <br/>이메일을 다시 입력하시려면 새로고침 해주세요!
            </p>
        )
    }else {
        description = (
            <p style={{fontSize: '14px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto'}}>
                이메일을 인증해주세요. <br/>연고링은 베타테스트단계로  <br/>서울대 고려대 연세대 서강대 한양대 성균관대 <br/> 학생들로만 진행중입니다. 
            </p>
        )
    }
    
    const sendAgain = useCallback((event) => {
        event.preventDefault();
        dispatch(actions.auth(email, univ));
    }, [email]);

    const confirmAuth = useCallback((event) => {
        event.preventDefault();
        
        // dispatch(actions.authConfirm(email));
    }, [email]);

    useEffect(() => {
            // if(isConfirmed === true)
        //     history.push('/setting/1')
        // else if(isConfirmed === false)
        //     alert("메일에서 인증하기 버튼을 먼저 눌러주세요.");
        // else
        //     return null
    }, [isConfirmed]);
    
    return (
        <Layout headerNone footerNone={true}>
            <div style={{height: '60px'}} className="flex flex-row items-center justify-between "></div>
            <section className="mb-10">
                <section style={{padding: '10px 30px'}} className="text-center mt-5">
                    <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}} className="text-2xl text-left">{isEmailSent ? '인증메일 발송안내' : '이메일 인증'}</h1>
                    {description}
                </section>
                <section className="px-10 mb-5">
                    {isEmailSent ? (
                        <>
                            {isLoading ? (
                            <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                                <LoadingIndicator 
                                    color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                    segmentWidth={2}
                                />
                            </div>
                            ) : null}
                            <button onClick={(e) => confirmAuth(e)} className="font-sans w-full rounded-lg px-5 py-3 mt-10 bg-black text-white  focus:outline-none">
                                인증 후 클릭
                            </button>
                            <button onClick={(e) => sendAgain(e)} style={{color: "#949393"}} className="font-sans w-full border-2 rounded-lg px-5 py-3 mt-3 bg-white focus:outline-none ">
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


