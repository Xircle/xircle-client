import React, { useCallback, useEffect, useRef, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';
import LoadingIndicator from 'react-loading-indicator';

const Login = ({ history }) => {
    const [displayNameDescription, setDisplayNameDescription] = useState(null);
    const [passwordDescription, setPasswordNameDescription] = useState(null);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const isLoading = useSelector(store => store.auth.loading);
    const isEmailSent = useSelector(store => store.auth.isEmailSent); //만약 토큰이 있으면 AUTH_SUCCESS 이므로
    const isConfirmed = useSelector(store => store.auth.isConfirmed);
    
    const displayRef = useRef();
    const displayNameCheeckLoading = useSelector(store => store.user.displayNameUI.loading);
    const displayNameError = useSelector(store => store.user.displayNameUI.error);

    const dispatch = useDispatch();

    const displayNameChangeHandler = useCallback((event) => {
        event.preventDefault();
        const displayNameText = event.target.value;
        const displayNameRegex = /^@/;
        if(!displayNameText.match(displayNameRegex)) {
            setDisplayNameDescription('닉네임 맨앞에 @를 포함해주세요');
        }else {
            if(displayNameText.length < 4) {
                setDisplayNameDescription('닉네임은 3자리 이상으로 해주세요.');
            }
            else {
                setDisplayNameDescription(null);
            }
        }
    }, []);
    const passwordChangeHandler = useCallback((event) => {
        console.log(event.target.value)
        event.preventDefault();

        const passwordText = event.target.value;

        if(passwordText.length < 6 || passwordText.length > 10) {
            setPasswordNameDescription('비밀번호는 6자리 이상 10자리 이하입니다.');
            setIsBtnDisabled(true);
        }else {
            setPasswordNameDescription(null);
            if(displayNameDescription === null)
                setIsBtnDisabled(false);
        }
    }, []);
    
    // 수정
    const loginSubmitHandler = useCallback((e) => {
        e.preventDefault();
        if(displayNameError !== null) // 리덕스에 있는데도 다시 제출하는건, 중복됐다는 거니까 ERROR_INIT
            dispatch(actions.displayNameInit());
        
        // dispatch(actions.loginSubmit(displayRef.current.value));
    }, [displayNameError]);

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
                    <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}} className="text-2xl text-left">로그인</h1>
                    <p style={{fontSize: '15px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto', whiteSpace: 'pre'}}> XIRCLE을 이용해 주셔서 감사합니다. <br/> 연고링은 베타테스트단계로 <br/> 서울대 고려대 연세대 서강대 한양대 성균관대<br/> 학생들로만 진행중입니다.</p>
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
                            <button onClick={(e) => console.log(e)} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-10 bg-black text-white  focus:outline-none">
                                인증 후 클릭
                            </button>
                            <button onClick={(e) => console.log(e)} style={{color: "#949393"}} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-3 bg-white focus:outline-none ">
                                인증메일 재전송
                            </button>
                            <p style={{color: "#949393", margin: '30px', textAlign: 'center'}}>인증이 안되시나요?</p>
                        </>
                    ) : (
                        <section className="text-center my-10">
                            <form onSubmit={(e) => loginSubmitHandler(e)} autoComplete="off" noValidate>
                                <div className="flex flex-col"> 
                                    <input 
                                        type="text"
                                        placeholder="@닉네임을 적어주세요"
                                        className="bg-gray-100 px-5 py-5"
                                        autoFocus
                                        onChange={(e) => displayNameChangeHandler(e)}
                                    />
                                    {displayNameDescription ? <p style={{color: 'red', textAlign: 'left', fontSize: 12, margin: '5px 0'}}>{displayNameDescription}</p> : <p style={{height: 17, margin: '5px 0'}}></p>}
                                    <input 
                                        type="password"
                                        placeholder="비밀번호를 적어주세요."
                                        className="bg-gray-100 px-5 py-5"
                                        onChange={(e) => passwordChangeHandler(e)}
                                    />
                                    {passwordDescription ? <p style={{color: 'red', textAlign: 'left', fontSize: 12, margin: '5px 0'}}>{passwordDescription}</p> : <p style={{height: 17, margin: '5px 0'}}></p>}
                                </div>
                                {displayNameError & !displayNameCheeckLoading ? <p style={{color: 'red', margin: 0}}>[중복]사용자 이름 {displayRef.current.value}은 사용하실 수 없습니다.</p> : null}
                                {displayNameCheeckLoading ? (
                                    <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                                        <LoadingIndicator 
                                            color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                            segmentWidth={2}
                                        />
                                    </div>
                                ) : null}
                                <button disabled={isBtnDisabled} onClick={(e) => loginSubmitHandler(e)} style={{width: '100%', fontSize: 16, padding: "15px 0", margin: '40px 0 20px'}} className=" rounded-lg text-white bg-gray-400 focus:outline-none">
                                    다음
                                </button>
                            </form>
                            <p onClick={(e) => history.push('/find-auth')} style={{color: "#949393", cursor: 'pointer'}}>잊어버리셨나요?</p>
                        </section>
                    )}
                </section>
            </section>
        </Layout>
    )
}

export default Login;