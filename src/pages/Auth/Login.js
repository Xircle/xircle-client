import React, { useCallback, useEffect, useRef, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';
import Spinner from 'react-spinner-material';
import { Link } from 'react-router-dom';

const Login = ({ history }) => {
    const [displayNameDescription, setDisplayNameDescription] = useState(null);
    const [passwordDescription, setPasswordNameDescription] = useState(null);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const isLoading = useSelector(store => store.auth.loading);
    const errCode = useSelector(store => store.auth.errCode); //만약 토큰이 있으면 AUTH_SUCCESS 이므로
    const isConfirmed = useSelector(store => store.auth.isConfirmed);
    
    const displayRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        if(isConfirmed === null) {
            return null;
        }else if(isConfirmed === true) {
            history.push('/my-profile');
        }else {
            return null;
        }
    }, [isConfirmed]);

    useEffect(() => {
        if(errCode === null) {
            return null;
        }else if(errCode === 455) {
            setDisplayNameDescription('존재하지 않는 별명입니다.');
        }else if(errCode === 456) {
            setPasswordNameDescription("비밀번호 불일치");
        }
    }, [errCode]);

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
    
    // 로그인 버튼 누를때
    const loginSubmitHandler = useCallback((e) => {
        e.preventDefault();
        
        dispatch(actions.loginSubmit(displayRef.current.value, passwordRef.current.value));
    }, []);

    return (
        <Layout headerNone footerNone={true}>
            <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                <Link to="/auth">
                    <img
                        style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                        src="/arrow-back-outline.svg"
                        alt="back"
                    />
                </Link>
                <a href='http://pf.kakao.com/_kDxhtK' style={{color: "#949393", cursor: 'pointer', marginRight: 30}}> 문의하기 </a>
            </nav>

            <section className="mb-10">
                <section style={{padding: '10px 30px'}} className="text-center mt-5">
                    <h1 style={{textAlign: 'left', marginBottom: '5px', fontSize: '24px'}} className="text-2xl text-left">로그인</h1>
                    <p style={{fontSize: '15px', color: "#C5C1C1", textAlign: 'left', margin: '20px auto', whiteSpace: 'pre'}}> XIRCLE을 이용해 주셔서 감사합니다. <br/> 연고링은 베타테스트단계로 <br/> 서울대 고려대 연세대 서강대 한양대 성균관대<br/> 학생들로만 진행중입니다.</p>
                </section>
                <section className="px-10 mb-5">
                    <section className="text-center my-10">
                        <form onSubmit={(e) => loginSubmitHandler(e)} autoComplete="off" noValidate>
                            <div className="flex flex-col"> 
                                <input 
                                    type="text"
                                    ref={displayRef}
                                    placeholder="@닉네임을 적어주세요"
                                    defaultValue="@"
                                    className="bg-gray-100 px-5 py-5"
                                    autoFocus
                                    onChange={(e) => displayNameChangeHandler(e)}
                                />
                                {displayNameDescription ? <p style={{color: 'red', textAlign: 'left', fontSize: 12, margin: '5px 0'}}>{displayNameDescription}</p> : <p style={{height: 17, margin: '5px 0'}}></p>}
                                {errCode === 452 ? <p style={{color: 'red', margin: 0}}>[중복]사용자 이름 {displayRef.current.value}은 사용하실 수 없습니다.</p> : null}
                                <input 
                                    type="password"
                                    ref={passwordRef}
                                    placeholder="비밀번호를 적어주세요."
                                    className="bg-gray-100 px-5 py-5"
                                    onChange={(e) => passwordChangeHandler(e)}
                                />
                                {passwordDescription ? <p style={{color: 'red', textAlign: 'left', fontSize: 12, margin: '5px 0'}}>{passwordDescription}</p> : <p style={{height: 17, margin: '5px 0'}}></p>}
                            </div>
                            
                            {isLoading ? (
                                <div style={{height: '40px', position: 'relative'}}>
                                    <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, 0)'}}>
                                        <Spinner 
                                            size={5}
                                            color={"#aaa"}
                                        />
                                        <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>로그인 중입니다..</p>
                                    </div>
                                </div>
                            ) : <div style={{height: '40px'}}></div>}
                            <button disabled={isBtnDisabled} onClick={(e) => loginSubmitHandler(e)} style={{width: '100%', fontSize: 16, padding: "15px 0", margin: '40px 0 20px'}} className=" rounded-lg text-white bg-gray-400 focus:outline-none">
                                다음
                            </button>
                        </form>
                        <p onClick={(e) => history.push('/find-auth')} style={{color: "#949393", cursor: 'pointer'}}>잊어버리셨나요?</p>
                    </section>
                </section>
            </section>
        </Layout>
    )
}

export default Login;