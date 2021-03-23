import React, { useCallback, useEffect, useRef, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';
import LoadingIndicator from 'react-loading-indicator';

const Login = ({ history }) => {
    const [displayName, setDisplayName] = useState('');
    const [pwd, setPwd] = useState('');
    const [phoneNum, setPhoneNum] = useState('');

    const [displayNameDescription, setDisplayNameDescription] = useState(null);
    const [passwordDescription, setPasswordNameDescription] = useState(null);
    const [phoneNumberDescription, setPhoneNumberNameDescription] = useState(null);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const displayRef = useRef();
    const passwordRef = useRef();
    const phoneNumberRef = useRef();

    const isLoading = useSelector(store => store.auth.loading);
    const errCodeInRedux = useSelector(store => store.auth.errCode);
    const email = useSelector(store => store.auth.email);
    
    const dispatch = useDispatch();

    useEffect(() => {
        // Goback when refreshing
        // if(!email)
        //     window.location.replace('auth');
    }, []);
    useEffect(() => {
        if(errCodeInRedux === null) {
            return null;
        }else if(errCodeInRedux === 0) {
            history.push('/setting/1')
        }else if(errCodeInRedux === 452) {
            setDisplayNameDescription(`[중복] ${displayRef.current.value}은 사용하실 수 없습니다.`);
        }else {
            alert("네트워크 혹은 서버에 일시적인 오류가 있습니다. 잠시 후에 다시 시도해주세요.")
        }
    }, [errCodeInRedux]);

    const displayNameChangeHandler = useCallback((event) => {
        event.preventDefault();
        const displayNameText = event.target.value;
        setDisplayName(displayNameText);

        const displayNameRegex = /^@[a-zA-Z0-9._]+$/;

        if(!displayNameText.includes('@')) {
            setDisplayNameDescription('닉네임 맨앞에 @를 포함해주세요');
            setIsBtnDisabled(true);
        }else {
            if(!displayNameText.match(displayNameRegex)) {
                setDisplayNameDescription('영어 대소문자 숫자, 밑줄 및 마침표만 가능합니다!');
                setIsBtnDisabled(true);
            }else {
                if(displayNameText.length < 4 || displayNameText.length > 14) {
                    setDisplayNameDescription('닉네임은 3자리 이상 14자리 이하로 해주세요.');
                    setIsBtnDisabled(true);
                }else {
                    setDisplayNameDescription(' ');
                    if(phoneNumberDescription === ' ' && passwordDescription === ' ')
                        setIsBtnDisabled(false);
                }
            }
        }
    }, [displayName, pwd, phoneNum]);

    const passwordChangeHandler = useCallback((event) => {
        event.preventDefault();

        const passwordRegex = /^[a-zA-Z0-9]+$/;
        const passwordText = event.target.value;
        setPwd(passwordText);
        if(passwordText.length < 6 || passwordText.length > 10) {
            setPasswordNameDescription('비밀번호는 6자리 이상 10자리 이하입니다.');
            setIsBtnDisabled(true);
        }else {
            if(!passwordText.match(passwordRegex)) {
                setPasswordNameDescription('영어 대소문자 숫자만 가능합니다!');
                setIsBtnDisabled(true);
            }else {
                setPasswordNameDescription(' ');
                if(phoneNumberDescription === ' ' && displayNameDescription === ' ')
                    setIsBtnDisabled(false);
            }
        }
    }, [displayName, pwd, phoneNum]);

    const phoneNumberChangeHandler = useCallback((event) => {
        const phoneText = event.target.value;
        const phoneRegex = /^[0-9]+$/;
        setPhoneNum(phoneText);
        if(phoneText.length !== 11) {
            setPhoneNumberNameDescription('전화번호를 올바르게 입력해주세요.');
            setIsBtnDisabled(true);
        }else {
            if(!phoneText.match(phoneRegex)) {
                setPhoneNumberNameDescription('숫자만 입력해주세요.')
                setIsBtnDisabled(true);
            }else {
                setPhoneNumberNameDescription(' ');
                if(displayNameDescription === ' ' && passwordDescription === ' ')
                    setIsBtnDisabled(false);
            }
        }
    }, [displayName, pwd, phoneNum]);
    
    // 수정
    const joinSubmitHandler = useCallback((e) => {
        e.preventDefault();
        
        const displayNameText = displayRef.current.value;
        const passwordText = passwordRef.current.value;
        const phoneNumberText = phoneNumberRef.current.value;

        dispatch(actions.joinSubmit(displayNameText, passwordText, phoneNumberText));
    }, []);

    return (
        <Layout headerNone footerNone>
            <div style={{height: '60px'}} className="flex flex-row items-center justify-between ">
            </div>

            <section className="mb-10">
                <section style={{padding: '10px 30px'}} className="text-center mt-5">
                    <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}} className="text-2xl text-left">회원가입 시작</h1>
                    <p style={{fontSize: '15px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto', whiteSpace: 'preline'}}> ※ 전화번호는 XIRCLE 관련 중요 공지사항을 보낼때 이외에 절대 사용하지 않습니다.</p>
                </section>
                <section className="px-10 mb-5">
                    <section className="text-center my-10">
                        <form onSubmit={(e) => joinSubmitHandler(e)} autoComplete="off" noValidate>
                            <div className="flex flex-col"> 
                                <input 
                                    type="text"
                                    placeholder="@사용자 이름(자유)"
                                    className="bg-gray-100 px-5 py-5"
                                    autoFocus
                                    defaultValue="@"
                                    ref={displayRef}
                                    onChange={(e) => displayNameChangeHandler(e)}
                                />
                                {displayNameDescription ? <p style={{color: 'red', margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>{displayNameDescription}</p> : <p style={{color: "#C5C1C1", margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>@사용자이름에는 영어 대소문자, 숫자,밑줄 및 마침표만 사용해주세요.</p>}
                                <input 
                                    type="password"
                                    placeholder="비밀번호"
                                    className="bg-gray-100 px-5 py-5"
                                    ref={passwordRef}
                                    onChange={(e) => passwordChangeHandler(e)}
                                />
                                {passwordDescription ? <p style={{color: 'red', margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>{passwordDescription}</p> : <p style={{color: "#C5C1C1", margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>띄어쓰기 없는 6-10자리 영어 대소문자와 숫자 조합으로 입력해주세요.</p>}
                                <input 
                                    type="text"
                                    placeholder="전화번호 입력"
                                    className="bg-gray-100 px-5 py-5 mt-5"
                                    ref={phoneNumberRef}
                                    onChange={(e) => phoneNumberChangeHandler(e)}
                                />
                                {phoneNumberDescription ? <p style={{color: 'red', margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>{phoneNumberDescription}</p> : <p style={{color: "#C5C1C1", margin: '10px 0 10px 5px', whiteSpace: 'pre', fontSize: 12, textAlign: 'left'}}>-없이 입력해주세요.</p>}
                                
                            </div>
                            {isLoading ? (
                                <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                                    <LoadingIndicator 
                                        color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                        segmentWidth={2}
                                    />
                                </div>
                            ) : null}
                            <button disabled={isBtnDisabled} onClick={(e) => joinSubmitHandler(e)} style={{width: '100%', fontSize: 16, padding: "15px 0", margin: '40px 0 20px'}} className=" rounded-lg text-white bg-gray-400 focus:outline-none">
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