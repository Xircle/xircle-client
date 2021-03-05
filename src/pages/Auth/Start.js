import React, { useCallback, useEffect, useRef, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';
import LoadingIndicator from 'react-loading-indicator';

const Login = ({ history }) => {
    const [displayNameDescription, setDisplayNameDescription] = useState(null);
    const [passwordDescription, setPasswordNameDescription] = useState(null);
    const [phoneNumberDescription, setPhoneNumberNameDescription] = useState(null);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const isLoading = useSelector(store => store.auth.loading);
    const isConfirmed = useSelector(store => store.auth.isConfirmed);
    
    // const displayRef = useRef();
    // const displayNameCheeckLoading = useSelector(store => store.user.displayNameUI.loading);
    // const displayNameError = useSelector(store => store.user.displayNameUI.error);

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
                setDisplayNameDescription(' ');
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
            setPasswordNameDescription(' ');
        }
    }, []);

    const phoneNumberChangeHandler = useCallback((event) => {
        const phoneText = event.target.value;
        if(phoneText.length !== 11) {
            setPhoneNumberNameDescription('전화번호를 올바르게 입력해주세요.');
        }else {
            setPhoneNumberNameDescription(' ');
            setIsBtnDisabled(false);
        }
    }, []);
    
    // 수정
    const loginSubmitHandler = useCallback((e) => {
        e.preventDefault();
        
        history.push('/setting/1')
        // dispatch(actions.loginSubmit(displayRef.current.value));
    }, []);

    return (
        <Layout headerNone footerNone={true}>
            <div style={{height: '60px'}} className="flex flex-row items-center justify-between ">
            </div>

            <section className="mb-10">
                <section style={{padding: '10px 30px'}} className="text-center mt-5">
                    <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}} className="text-2xl text-left">회원가입 시작</h1>
                    <p style={{fontSize: '15px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto', whiteSpace: 'preline'}}> ※ 전화번호는 XIRCLE 관련 중요 공지사항을 보낼때 이외에 절대 사용하지 않습니다.</p>
                </section>
                <section className="px-10 mb-5">
                    <section className="text-center my-10">
                        <form onSubmit={(e) => loginSubmitHandler(e)} autoComplete="off" noValidate>
                            <div className="flex flex-col"> 
                                <input 
                                    type="text"
                                    placeholder="@사용자 이름(자유)"
                                    className="bg-gray-100 px-5 py-5"
                                    autoFocus
                                    onChange={(e) => displayNameChangeHandler(e)}
                                />
                                {displayNameDescription ? <p style={{color: 'red', margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>{displayNameDescription}</p> : <p style={{color: "#C5C1C1", margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>@사용자이름에는 영어 대소문자, 숫자,밑줄 및 마침표만 사용해주세요.</p>}
                                <input 
                                    type="password"
                                    placeholder="비밀번호"
                                    className="bg-gray-100 px-5 py-5"
                                    onChange={(e) => passwordChangeHandler(e)}
                                />
                                {passwordDescription ? <p style={{color: 'red', margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>{passwordDescription}</p> : <p style={{color: "#C5C1C1", margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>띄어쓰기 없는 6-10자리 영어 대소문자와 숫자 조합으로 입력해주세요.</p>}
                                <input 
                                    type="text"
                                    placeholder="전화번호를 입력."
                                    className="bg-gray-100 px-5 py-5 mt-5"
                                    onChange={(e) => phoneNumberChangeHandler(e)}
                                />
                                {phoneNumberDescription ? <p style={{color: 'red', margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>{phoneNumberDescription}</p> : <p style={{color: "#C5C1C1", margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>-없이 입력해주세요.</p>}
                                
                            </div>
                            {/* {displayNameCheeckLoading ? (
                                <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                                    <LoadingIndicator 
                                        color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                        segmentWidth={2}
                                    />
                                </div>
                            ) : null} */}
                            <button disabled={isBtnDisabled} onClick={(e) => loginSubmitHandler(e)} style={{width: '100%', fontSize: 16, padding: "15px 0", margin: '40px 0 20px'}} className=" rounded-lg text-white bg-gray-400 focus:outline-none">
                                다음
                            </button>
                        </form>
                    </section>
                </section>
            </section>
        </Layout>
    )
}

export default Login;