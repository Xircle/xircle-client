import React, { useCallback }  from 'react';
import Layout from '../components/layout';
import ValidationButton from '../components/UI/validationButton';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/actions/index';
import LoadingIndicator from 'react-loading-indicator';

const Login = ({ history }) => {
    const isLoading = useSelector(store => store.auth.loading);
    const tokenId = useSelector(store => store.auth.tokenId); //만약 토큰이 있으면 AUTH_SUCCESS 이므로
    const emailId = useSelector(store => store.auth.emailId); //만약 토큰이 있으면 AUTH_SUCCESS 이므로

    const dispatch = useDispatch();

    let description = null;
    if(isLoading === false) { //메일이 보내진거임. null에서 false 됐으니까
        description = (
            <p style={{fontSize: '15px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto'}}>
                <strong style={{color: "#4A87FF"}}>{emailId}</strong> 메일로 전송되었습니다. 인증메일을 확인바랍니다. 인증 메일을 확인하시고 돌아오셔서 아래의 버튼을 눌러주세요!
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
        dispatch(actions.auth(emailId));
    }, [emailId]);

    return (
        <Layout headerNone footerNone={true}>
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
                    <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}} className="text-2xl text-left">이메일 인증</h1>
                    {description}
                </section>
                <section className="px-10 mb-5">
                    {tokenId ? (
                        <>
                            {isLoading ? (
                            <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                                <LoadingIndicator 
                                    color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                    segmentWidth={2}
                                />
                            </div>
                            ) : null}
                            <button onClick={() => history.push('/setting/1')} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-10 bg-black text-white  focus:outline-none">
                                인증했다면 시작하기!
                            </button>
                            <button onClick={(e) => sendAgain(e)} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-3 bg-white text-black hover:bg-black hover:text-white focus:outline-none">
                                인증메일 재전송
                            </button>
                        </>
                    ) : (
                        <ValidationButton isSent={!isLoading}/>
                    )}
                </section>
            </section>
        </Layout>
    )
}

export default Login;


