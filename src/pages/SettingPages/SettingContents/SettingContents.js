import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/UI/modal';
import Select from 'react-select';
import { AgeSettingOptions } from '../../../model/person';
import { jobs, adjectives } from '../../../model/person';
import KakaoShareButton from '../../../components/KakaoShareButton';
import { FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share';
import LoadingIndicator from 'react-loading-indicator';
import RadioUI from '../../../components/UI/RadioUI';
import InterestSetting from '../../../components/interestSetting';
import * as actions from '../../../store/actions/index';
import KakaoMap from '../../../components/kakaoMap';
import Spinner from 'react-spinner-material';

const SettingContents = ({ history, questionNum }) => {
    const [isUnivPublic, setIsUnivPublic] = useState(null);
    const [isGraduateUniv, setIsGraduateUniv] = useState(null);
    const [job, setJob] = useState('');
    const [adj, setAdj] = useState('');
   
    const [profileImgFile, setProfileImgFile] = useState();
    
    const [profileImgSrc, setProfileImgSrc] = useState('');
    const [publicOrNotClicked, setPublicOrNotClicked] = useState(true);
    const [graduateOrNotClicked, setGraduateOrNotClicked] = useState(true);
    const [genderClicked, setGenderClicked] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    
    const isLoading = useSelector(store => store.user.loading);
    const hasError = useSelector(store => store.user.error);
    const errCode = useSelector(store => store.user.errCode);
    const emailInRedux = useSelector(store => store.auth.email);
    const univInRedux = useSelector(store => store.auth.univ);
    const phoneNumberInRedux = useSelector(store => store.auth.phoneNumber);
    const displayNameInRedux = useSelector(store => store.auth.displayName);
    const __pwdInRedux = useSelector(store => store.auth.__pwd);
    const isPublicInRedux = useSelector(store => store.user.isPublic);
    const isGraduateInRedux = useSelector(store => store.user.isGraduate);
    const genderInRedux = useSelector(store => store.user.gender);
    const ageInRedux = useSelector(store => store.user.age);
    const jobInRedux = useSelector(store => store.user.job);
    const adjInRedux = useSelector(store => store.user.adj);
    const locationInRedux = useSelector(store => store.user.location);
    const latitudeInRedux = useSelector(store => store.user.lat);
    const longitudeInRedux = useSelector(store => store.user.lng);
    const interestArrInRedux = useSelector(store => store.user.interestArr);
    const introTextInRedux = useSelector(store => store.user.introText);
    
    const dispatch = useDispatch();
    
    // 모든 페이지에서 리다이렉션 고려
    useEffect(() => {
        const currentPath = window.location.pathname;
        switch(currentPath) {
            case '/setting/1':
                if(!emailInRedux) 
                    return window.location.replace('auth');
                break;
            case '/setting/2':
                if(!locationInRedux) 
                    return window.location.replace('auth');
                break;
            case '/setting/3':
                if(!isPublicInRedux || !isGraduateInRedux || !genderInRedux || !ageInRedux) 
                    return window.location.replace('auth');
                break;
            case '/setting/4':
                if(!jobInRedux) 
                    return window.location.replace('auth');
                break;
            case '/setting/5':
                if(!adjInRedux) 
                    return window.location.replace('auth');
                break;
            case '/setting/6':
                if(!interestArrInRedux) 
                    return window.location.replace('auth');
                break;
            default:
                return null;
        }
    }, []);

    // 모든 서버로의 로딩 + /pre/user 할때 에러코드 리다이렉션.
    useEffect(() => {
        const currentPath = window.location.pathname;
        if(currentPath === '/setting/6') {
            if(hasError) {
                switch (errCode) {
                    case 410:
                        return history.push('/auth');
                    case 423 || 424 || 429 || 436 || 437:
                        return history.push('/start');
                    case 440 || 441 || 442 || 443:
                        return history.push('/setting/1');
                    case 413 || 414 || 415 || 416 || 432 || 433:
                        return history.push('/setting/2');
                    case 417 || 418:
                        return history.push('/setting/3');
                    case 419 || 420:
                        return history.push('/setting/4');
                    case 427:
                        return history.push('/setting/5');
                    case 431:
                        return history.push('/setting/6');
                    default:
                        return console.log('error')
                }
            }
            else if(hasError === false) 
                return history.push('/setting/7')
        }
    }, [isLoading]);

    // /setting/2
    const UnivPublicChangeHandler = useCallback((e, { value }) => {
        if(value === 'public')
            setIsUnivPublic(true);
        else
            setIsUnivPublic(false);
    }, []);

    const UnivGraduateChangeHandler = useCallback((e, { value }) => {
        if(value === 'graduate') 
            setIsGraduateUniv(true);
        else
            setIsGraduateUniv(false);

        setGraduateOrNotClicked(false);
    }, []);

    const radioSubmitHandler = useCallback(() => {
        dispatch(actions.addIsPublic(isUnivPublic))
        dispatch(actions.addIsGraduate(isGraduateUniv))
        
        setPublicOrNotClicked(false);
    }, [isUnivPublic, isGraduateUniv]);
    
    const WomanBtnClickedHandler = useCallback(() => {
        setGenderClicked(true);
        dispatch(actions.addGender('여'))
    }, []);
    const ManBtnClickedHandler = useCallback(() => {
        setGenderClicked(true);
        dispatch(actions.addGender('남'))
    }, []);
    const NonBinaryBtnClickedHandler = useCallback(() => {
        setGenderClicked(true);
        dispatch(actions.addGender('NB'))
        //저장
    }, []);
    
    // /setting/3
    const jobClickedHandler = useCallback((job) => {
        setJob(job);
        dispatch(actions.addJob(job));
        history.push('/setting/4'); 
        //저장
    }, []);
    
    // /setting/4
    const adjClickedHandler = useCallback((adjective) => {
        setAdj(adjective);
        dispatch(actions.addAdj(adjective));
        history.push('/setting/5'); 
        //저장
    }, []);
    
    // /setting/6
    const uploadProfileImg = useCallback((event) => {
        event.preventDefault();
        if(!event.target.files)
            return null;
        // file을 읽을 reader 객체 생성
        const files = event.target.files;
        const __file = files[0];
        const __size = files[0].size;

        if(__size > 10000000) { // 10MB 이상이면 용량 제한
            return alert("사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. ")
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(__file);
        fileReader.onload = e => { // async하게 다 읽었으면 실행 
            setProfileImgSrc(e.target.result);
        };

        console.log(__file);
        setProfileImgFile(__file);
    }, []);

    const uploadProfileHandler = useCallback((event) => {
        if(!profileImgSrc) return alert("사진을 선택해주세요.");

        const submit2ServerFormData = new FormData();
        const data = {
            gender: genderInRedux,
            age: ageInRedux,
            adj: adjInRedux,
            job: jobInRedux,
            location: locationInRedux,
            displayName: displayNameInRedux,
            introText: introTextInRedux,
            interestArr: interestArrInRedux,
            phoneNumber: phoneNumberInRedux,
            isPublic: isPublicInRedux,
            introText: "하이",
            isGraduate: isGraduateInRedux,
            password: __pwdInRedux,
            email: emailInRedux,
            latitude: latitudeInRedux,
            longitude: longitudeInRedux,
        }
        submit2ServerFormData.set('data', JSON.stringify(data));
        submit2ServerFormData.set('profileImgSrc', profileImgFile);
        dispatch(actions.submitToServer(submit2ServerFormData));
    }, [phoneNumberInRedux, latitudeInRedux, longitudeInRedux, __pwdInRedux, isPublicInRedux, isGraduateInRedux, emailInRedux, genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, displayNameInRedux, interestArrInRedux, profileImgSrc]);

    // /setting/7
    const shareBtnClickedHandler = useCallback(() => {
        setShareClicked(!shareClicked);
    }, [shareClicked]);

    const questionNumber = Number(questionNum);
    let contents = null;
    if(questionNumber === 1) {
        contents = (
            <section className="h-1/4 text-center px-3 mt-3">
                <div className="px-3 py-5 mb-3">
                    <h1 style={{textAlign: 'left'}} className="text-2xl text-left">지금 어디있나요?</h1>
                    <p style={{color: "#C5C1C1", textAlign: 'left'}}>회원님의 도시 정보까지만 표시합니다. <br/> 프라이버시에 대해 걱정 마세요!  <br/> 프로필 수정에서 공개 비공개 설정이 가능해요.</p>
                </div>
                <KakaoMap history={history} />
            </section>
        )
    }else if(questionNumber === 2) {
        contents = (
            <>
                <section className="px-8 mt-8">
                    <h1 style={{textAlign: 'left', marginBottom: '10px'}} className="text-2xl text-left">성별</h1>
                    <p style={{color: "#C5C1C1", textAlign: 'left', marginBottom: '20px'}}>성별을 선택해주세요. <br /> 직접기입에 성별과 관련없는 정보 기재 하지마세요.</p>
                    <button onClick={() => WomanBtnClickedHandler()} style={{width: '80%', borderRadius: 4, border: '1px solid lightgray',  backgroundColor: "#fff"}} className="text-left px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base ">여성</span></button>
                    <button onClick={() => ManBtnClickedHandler()} style={{width: '80%', borderRadius: 4, border: '1px solid lightgray', backgroundColor: "#fff"}} className="text-left px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base ">남성</span></button>
                    <button onClick={() => NonBinaryBtnClickedHandler()} style={{width: '80%', borderRadius: 4, border: '1px solid lightgray', backgroundColor: "#fff"}} className="text-left px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base "> 논바이너리</span></button>
                </section>
                
                {graduateOrNotClicked ? (
                    <Modal show={graduateOrNotClicked}>
                        <div className="mb-5">
                            <h1 className="text-xl mb-5">회원님은 {univInRedux} 학생이시군요!</h1>
                            <span style={{fontSize: '12px', color: '#5c5c5c'}}>재학중이신가요?  졸업을 하셨나요? </span>
                        </div>
                        <RadioUI subject="graduateOrNot" changeHandler={UnivGraduateChangeHandler}/>
                    </Modal>
                ) : (
                    <Modal show={publicOrNotClicked}>
                        <div className="mb-5">
                            <h1 className="text-xl mb-5">회원님은 {univInRedux} 이시군요!</h1>
                            <span style={{fontSize: '12px', color: '#5c5c5c', whiteSpace: 'pre-line'}}>학교를 공개하시겠어요? <br/> 공개여부는 언제든지 변경 가능해요.</span>
                        </div>
                        <RadioUI subject="privateOrNot" isFirstValue={isUnivPublic} changeHandler={UnivPublicChangeHandler}/>
                        <p style={{color: "#cdcdcd", fontSize: 12, margin: '15px 0'}}>공개하면 더 많은 네트워킹이 가능해요 :)</p>
                        <button onClick={() => radioSubmitHandler()} style={{width: '100%', margin: '10px 0'}} className="font-sans border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">확인</button>
                        <button onClick={() => setGraduateOrNotClicked(true)} style={{width: '100%'}} className="font-sans border-2 rounded-3xl px-5 py-3 bg-white focus:outline-none">이전</button>
                    </Modal>
                )}
                <Modal show={genderClicked} clicked={() => setGenderClicked(false)}>
                    <div className="mb-5">
                        <h1 className=" text-xl mb-5">회원님은 몇 살이신가요?</h1>
                        <span style={{ fontSize: '14px', color: '#5c5c5c'}}>걱정마세요! 나이는 초, 중, 후반으로 표시됩니다. 나이는 변경이 어려우니 잘 선택해주세요.</span>
                    </div>
                    <Select 
                        isSearchable={false}
                        blurInputOnSelect
                        placeholder="나이를 선택해주세요."
                        options={AgeSettingOptions}
                        onChange={(e) => dispatch(actions.addAge(e.value))}
                    />
                    <div className="flex flex-row justify-evenly">
                        <button onClick={() => {if(ageInRedux) history.push('/setting/3')}} className="font-sans border-2 w-full rounded-3xl px-5 py-3 mt-10 bg-gray-400 text-white hover:text-white hover:bg-black focus:outline-none">확인</button>
                    </div>
                </Modal>
            </>
        )
    }else if(questionNumber === 3) {
        contents = (
            <section className="px-3 mt-3">
                <div className="px-3 py-5 mb-3">
                    <h1 style={{textAlign: 'left'}} className="text-2xl text-left">회원님은 어떤 사람인가요?</h1>
                    <p style={{color: "#C5C1C1", textAlign: 'left', lineHeight: 1.5}}>회원님을 설명 해주세요. <br /> 선택지에 없나요? 직접 추가해보세요.</p>
                </div>
                <input
                    placeholder="선택지에 없다면 직접 추가!"
                    value=""
                    style={{width: 220, outline: 'none', heiht: 45, marginLeft: 10, padding: '15px 20px', border: '0.5px solid #ccc', borderRadius: 26}}
                />
                <section className="my-5 px-2">
                    {jobs.map((job, id) => (
                        <article onClick={() => jobClickedHandler(job.value)} style={{border: '1px solid #ccc'}} className=" cursor-pointer text-left mt-5 py-7 px-10 rounded-xl" key={id}>
                            <span>{job.value}</span>
                        </article>
                    ))}
                </section>
            </section>
        )
    }else if(questionNumber === 4) {
        contents = (
            <section className="text-center px-3 mt-3">
                <div className="px-3 py-5 mb-3">
                    <h1 style={{textAlign: 'left'}} className="text-2xl text-left">회원님은 어떤 사람인가요?</h1>
                    <p style={{color: "#C5C1C1", textAlign: 'left'}}>회원님을 설명 해주세요. <br />어떤 사람인지 궁금해요.</p>
                </div>
                <div className="flex flex-row items-center">
                    <input
                        placeholder="선택지에 없다면 직접 추가!"
                        value=""
                        style={{width: 220, outline: 'none', heiht: 45, marginLeft: 10, padding: '15px 20px', border: '0.5px solid #ccc', borderRadius: 26}}
                    />
                    <p style={{marginLeft: '10px'}}>{jobInRedux || job}</p>
                </div>
                <section className="my-3 px-2">
                    {adjectives.map((adj, id) => (
                        <article onClick={() => adjClickedHandler(adj.value)} style={{border: '1px solid #ccc'}} className=" cursor-pointer text-left mt-5 py-7 px-10 border-2 rounded-xl" key={id}>
                            <span >{adj.value}</span>
                        </article>
                    ))}
                </section>
            </section>
        )
    }else if(questionNumber === 5) {
        contents = (
            <section className="text-center px-3 my-5">
                <div className="px-3 py-5 mb-3">
                    <h3 style={{whiteSpace: 'pre-line'}} className="text-left text-3xl font-light">{adjInRedux || adj} {jobInRedux || job} {displayNameInRedux}님 요즘 무엇에 관심있으신가요?</h3>
                    <h5 className="text-left font-normal my-5 text-gray-400">관심사를 2개 이상 골라주세요. <br />관심사가 많을 수록 만날 수 있는 친구가 많아져요.<br />당신을 @태그 해보세요.</h5>
                    <p style={{color: "#8D8D8D", fontSize: 10, textAlign: 'left'}}>※런칭 후 추가 예정</p>
                </div>
                <InterestSetting history={history}/>
            </section>
        )
    }else if(questionNumber === 6) {
        contents = (
            <section className="text-center px-3 mb-10">
                 <div className="px-3 py-5 mb-3">
                    <p style={{fontSize: 24, fontWeight: 'bold', margin: '20px 0 10px'}} className="text-left">프로필사진</p>
                    <p style={{textAlign: 'left', color: "#C5C1C1"}}>[마지막 단계] <br/>자유로운 프로필 사진을 업로드 해주세요 </p>
                </div>
                <section className="mt-5">
                    <div style={{position: 'relative'}}>
                        <img 
                            style={{width: 300, height: 300, margin: '0 auto', borderRadius: 150, objectFit: 'cover'}} 
                            src={profileImgSrc ? profileImgSrc : "/camera.svg"} 
                        />
                        {!profileImgSrc ? <p style={{color: "#C4C4C4", fontSize: 17, fontWeight: 'bold', position: 'absolute', top: '60%', left: '50%', width: '100%', transform: 'translate(-50%, 0)', whiteSpace: 'pre-line'}}>Click!</p> : null}
                        <input 
                            style={{position: 'absolute', display: 'block', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 300, height: 300, borderRadius: 150, cursor: 'pointer'}} 
                            type="file" 
                            accept="image/x-png,image/png,image/svg,image/jpeg,image/jpg,image/gif"
                            onChange={(e) => uploadProfileImg(e)} 
                        />
                    </div>
                    {isLoading ? (
                        <>
                            <div style={{height: 40, position: 'relative'}}>
                                <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: 10, transform: 'translate(-50%, 0)'}}>
                                    <Spinner 
                                        color={"#aaa"}
                                    />
                                    <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>업로드 중입니다..</p>
                                </div>
                            </div>
                        </>
                    ) : <div style={{height: 40}}></div>}
                    <p style={{margin: '40px 0 10px 5px', fontSize: 12, color: "#8D8D8D", textAlign: 'left'}}>최대 용량은 10MB입니다.</p>
                    <button onClick={(e) => uploadProfileHandler(e)} style={{marginTop: 20}} className="w-full rounded-xl px-5 py-3 bg-gray-400 text-white focus:outline-none">
                        업로드 하기
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 7) {
        contents = (
            <div className="min-h-screen flex flex-col justify-center">
                <section style={{marginTop: 70}}>
                    <section style={{height: '100px'}} className="mt-5 flex flex-row justify-center items-center ">
                        <img 
                            style={{width: 100, height:100}}
                            src="/Logo/xircleLogo.png"
                            alt="logo"
                        />
                    </section>
                    <section style={{height: '200px'}} className=" text-center pt-5">
                        <h1 style={{fontSize: 20}} className="mb-3 px-10">Xircle 회원가입 및 사전신청을 해주셔서 대단히 감사합니다.</h1>
                        <p style={{fontSize: 14, lineHeight: 1.4}} className="px-10 pt-5 text-lg text-gray-500">
                            <strong style={{color: "#007FFF"}}>현재는 친구탐색과 게시글 작성까지만 <br/> 가능하며 정식런칭은 5월중으로 시작합니다!</strong> 정식 서비스 시작시 적어주신 문자로 연락을 드리겠습니다. 감사합니다.
                        </p>
                    </section>
                </section>
                <section style={{width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'center'}}>
                    <section style={{width: '80%', height: '100%', margin: '0 auto'}}>
                        <section style={{opacity: shareClicked ? 1 : 0, visibility: shareClicked ? 'visible' : 'hidden', transition: 'all .2s ease-in', marginBottom: '10px'}} className="mt-5 text-center">
                            <KakaoShareButton />
                            <FacebookShareButton url="https://xircle.org">
                                <FacebookIcon round/>
                            </FacebookShareButton>
                            <TwitterShareButton url="https://xircle.org">
                                <TwitterIcon round/>
                            </TwitterShareButton>
                            <LineShareButton url="https://xircle.org">
                                <LineIcon round/>
                            </LineShareButton>
                        </section>
                    </section>
                    <button 
                        onClick={() => shareBtnClickedHandler()}  
                        style={{ padding: '20px 10px', color: "#8C94A4", backgroundColor: '#F7F7FA', borderRadius: 60, border: '1px solid #8C94A4', width: '90%'}} 
                    > XIRCLE에 친구 초대하기 </button>
                    <button 
                        onClick={() => {history.push('/my-profile'); dispatch(actions.getUser(localStorage.getItem('tk'), localStorage.getItem('_UID')))}} 
                        style={{padding: '20px 10px', color: "#8C94A4", backgroundColor: '#F7F7FA', borderRadius: 60, border: '1px solid #8C94A4', width: '90%'}} 
                        className="w-full mt-3 mb-10"
                    > 내 프로필 보기 
                    </button>
                </section>
            </div>
        )
    }else {
        history.push('/')
    }

    
    return (
        <>
            {contents}
        </>
    )
}
export default SettingContents; 