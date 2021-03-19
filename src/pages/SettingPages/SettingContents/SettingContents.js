import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/UI/modal';
import Select from 'react-select';
import { AgeSettingOptions } from '../../../model/person';
import { Search } from 'semantic-ui-react'
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
    const [imgSrc, setImgSrc] = useState(null);
    
    const articleRef = useRef();
    const articleInterestArr = useRef();
    const articleTagRef = useRef();
    
    const introRef = useRef();
    const resumeRef = useRef();
    const workPlaceRef = useRef();

    const [defaultArticleHashTag, setDefaultArticleHashTag] = useState('');
    const [profileImgSrc, setProfileImgSrc] = useState('');
    const [articleImg_formData, setArticleImgSrcFormData] = useState(null);
    const [profileImg_formData, setProfileImgSrcFormData] = useState(null);
    
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
    const articleTextInRedux = useSelector(store => store.user.articleText);
    const articleInterestArrInRedux = useSelector(store => store.user.articleInterestArr);
    const articleTagInRedux = useSelector(store => store.user.articleTag);
    const articleImgSrcInRedux = useSelector(store => store.user.articleImgSrc);
    const introTextInRedux = useSelector(store => store.user.introText);
    const profileImgSrcInRedux = useSelector(store => store.user.profileImgSrc);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        const currentPath = window.location.pathname;
        // switch(currentPath) {
        //     case '/setting/1':
        //         if(!emailInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/2':
        //         if(!locationInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/3':
        //         if(!isPublicInRedux || !isGraduateInRedux || !genderInRedux || !ageInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/4':
        //         if(!jobInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/5':
        //         if(!adjInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/6':
        //         if(!interestArrInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/7':
        //         if(!articleImgSrcInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/8':
        //         if(!articleTextInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/9':
        //         if(!introTextInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/10':
        //         if(!profileImgSrcInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     case '/setting/11':
        //         if(!emailInRedux) 
        //             return window.location.replace('auth');
        //         break;
        //     default:
        //         return null;
        // }
        return () => {
            setDefaultArticleHashTag('');
        }
    }, []);

    // 모든 서버로의 로딩 + /pre/user 할때 에러코드 리다이렉션.
    useEffect(() => {
        const currentPath = window.location.pathname;
        switch (currentPath) {
            case '/setting/6':
                if(hasError) {
                    console.log('cors 에러');
                    return alert("네트워크 오류입니다. 사진 용량을 낮춰주세요.");
                }
                else if(hasError === false) 
                    return history.push('/setting/7')
            case '/setting/8':
                if(hasError)
                    return alert("서버에 일시적인 문제가 생겼습니다. 다시 시도해주세요.");
                else if(hasError === false) 
                    return history.push('/setting/9')
            case '/setting/10':
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
                        case 438:
                            return history.push('/setting/6');
                        case 439:
                            return history.push('/setting/7');
                        case 431:
                            return history.push('/setting/8');
                        case 438:
                            return history.push('/setting/6');
                        case 439:
                            return history.push('/setting/7');
                        case 431:
                            return history.push('/setting/8');
                        case 421 || 422:
                            return history.push('/setting/9');
                        case 439:
                            return history.push('/setting/10');
                        case 431:
                            return history.push('/setting/8');
                    
                        default:
                            break;
                    }
                    return history.push('/auth');
                }
                else if(hasError === false) 
                    return history.push('/setting/11')

            default:
                break;
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
    const uploadPhoto = useCallback((event) => {
        event.preventDefault();
        // file을 읽을 reader 객체 생성
        const files = event.target.files;
        const __file = files[0];
        const __size = files[0].size;

        if(__size > 10000000) { // 10MB 이상이면 용량 제한
            return alert("사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. ")
        } 
        // 미리보기용
        const fileReader = new FileReader();
        fileReader.readAsDataURL(__file);
        fileReader.onload = e => {
            setImgSrc(e.target.result);
        }
        // 서버 제출용
        const formData = new FormData();
        formData.append("img", __file);

        setArticleImgSrcFormData(formData);
    }, []);
    
    const uploadBtnHandler = useCallback((event) => {
        event.preventDefault();
        if(!imgSrc)
            return alert("사진을 선택해주세요.")
        // /img 라우터로 formData 올려서 S3에 이미지 업로드하고, URL받기 위한 액션.
        dispatch(actions.submitImgToAWS(articleImg_formData, "article"));
    }, [imgSrc, articleImg_formData]);
    
    // /setting/7
    const articleHashTagClickHandler = useCallback((clickedHashTag) => {
        const newHashTag = '@' + clickedHashTag;

        setDefaultArticleHashTag(newHashTag);
    }, [defaultArticleHashTag]);

    const articleSubmitHandler = useCallback((event) => {
        event.preventDefault();
        // 1) articleText
        const articleText = articleRef.current.value;
        if(articleText.length < 3)
            return alert("적어도 3자 이상은 작성해주세요.")
        if(defaultArticleHashTag.length < 1) 
            return alert("게시물 관심사를 적어도 하나 선택해주세요.");
        
        // 2) (필수) interestArr @ 빼서 저장
        const articleInterestArray = defaultArticleHashTag.split(" ");
        const articleInterestArr = articleInterestArray.map(el => {
            return el.replace('@', '');
        });

        if(articleTagRef.current.value) { // articleTagRef => "@hello @hi @무야호"
            const articleTagText = articleTagRef.current.value.trim();
            let articleTagArr = articleTagText.split(" ");  // articleTagArr = ["@hello", "@hi", "@무야호"]
            const hashTagRegex = /^@[a-zA-Z0-9]+$/;

            let isSuccess = true;
            articleTagArr.forEach(tag => {
                if(!tag.match(hashTagRegex)) {
                    alert("해시태그의 맨 앞은 @를 포함해야합니다.")
                    isSuccess = false;
                    return null;
                }
            });
            if(!isSuccess) 
                return null;

            // 3) 성공했으면 @ 빼서 저장 ['hello', 'hi', '무야호']
            articleTagArr = articleTagArr.map(tag => {
                return tag.replace('@', '');
            });
            dispatch(actions.addArticleContents(articleText, articleInterestArr, articleTagArr));
        }else { // articleTag 사용안했을 때도 고려
            dispatch(actions.addArticleContents(articleText, articleInterestArr, []));
        }
        history.push('/setting/8')
    }, [defaultArticleHashTag]);

    // /setting/8
    const uploadProfileImg = useCallback((event) => {
        event.preventDefault();
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

        const formData = new FormData();
        formData.append("img", __file);
        setProfileImgSrcFormData(formData);
    }, []);

    const uploadProfileHandler = useCallback((event) => {
        event.preventDefault();
        if(!profileImgSrc)
            return alert("사진을 선택해주세요.");

        dispatch(actions.submitImgToAWS(profileImg_formData, "profile"));
    }, [profileImgSrc, profileImg_formData]);

    // setting/9
    const introTextSubmitHandler = useCallback((event) => {
        event.preventDefault();
        const introText = introRef.current.value;
        if(introText.length < 3)
            return alert("3글자 이상 입력해주세요!");
        dispatch(actions.addIntroText(introText));
        history.push('/setting/10')
    }, []);

    // /setting/10
    const submitToServer = useCallback(() => {
        const resumeText = resumeRef.current.value;
        const workPlaceText = workPlaceRef.current.value;
        dispatch(actions.submitToServer(
            phoneNumberInRedux, latitudeInRedux, longitudeInRedux, __pwdInRedux, isPublicInRedux, isGraduateInRedux, emailInRedux, genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, articleInterestArrInRedux, articleTagInRedux, displayNameInRedux, interestArrInRedux, introTextInRedux, profileImgSrcInRedux, resumeText, workPlaceText
        ));
        
    }, [phoneNumberInRedux, latitudeInRedux, longitudeInRedux, __pwdInRedux, isPublicInRedux, isGraduateInRedux, emailInRedux, genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, articleInterestArrInRedux, articleTagInRedux, displayNameInRedux, interestArrInRedux, introTextInRedux, profileImgSrcInRedux]);
    
    // /setting/11
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
                    <p style={{color: "#C5C1C1", textAlign: 'left', marginBottom: '20px'}}>성별을 선택해주세요. (필수)<br /> 직접기입에 성별과 관련없는 정보 기재 하지마세요.</p>
                    <button onClick={() => WomanBtnClickedHandler()} style={{width: '80%', backgroundColor: "#F7F7FA"}} className="text-left border-2 px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base ">여성</span></button>
                    <button onClick={() => ManBtnClickedHandler()} style={{width: '80%', backgroundColor: "#F7F7FA"}} className="text-left border-2 px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base ">남성</span></button>
                    <button onClick={() => NonBinaryBtnClickedHandler()} style={{width: '80%', backgroundColor: "#F7F7FA"}} className="text-left border-2 px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base "> 논바이너리</span></button>
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
                            <span style={{fontSize: '12px', color: '#5c5c5c', whiteSpace: 'pre-line'}}>학교를 공개하시겠습니까? 비공개 하시겠습니까? <br/> 공개여부는 언제든지 변경 가능합니다.</span>
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
                        <span style={{ fontSize: '14px', color: '#5c5c5c'}}>걱정마세요! 나이는 20대 초, 중, 후반으로 표시됩니다.</span>
                    </div>
                    <Select 
                        isSearchable={false}
                        blurInputOnSelect
                        placeholder="나이를 선택해주세요."
                        options={AgeSettingOptions}
                        onChange={(e) => dispatch(actions.addAge(e.value))}
                    />
                    <div className="flex flex-row justify-evenly">
                        <button onClick={() => history.push('/setting/3')} className="font-sans border-2 w-full rounded-3xl px-5 py-3 mt-10 bg-gray-400 text-white hover:text-white hover:bg-black focus:outline-none">확인</button>
                    </div>
                </Modal>
            </>
        )
    }else if(questionNumber === 3) {
        contents = (
            <section className="text-center px-3 mt-3">
                <div className="px-3 py-5 mb-3">
                    <h1 style={{textAlign: 'left'}} className="text-2xl text-left">회원님은 어떤 사람인가요?</h1>
                    <p style={{color: "#C5C1C1", textAlign: 'left'}}>회원님을 설명 해주세요. (필수) <br />어떤 사람인지 궁금해요.</p>
                </div>
                <Search
                    placeholder={"선택지에 없다면 직접 추가!"}
                    size="big"
                    className="text-left ml-2"
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
                    <p style={{color: "#C5C1C1", textAlign: 'left'}}>회원님을 설명 해주세요. (필수) <br />어떤 사람인지 궁금해요.</p>
                </div>
                <div className="flex flex-row items-center">
                    <Search
                        placeholder={"선택지에 없다면 직접 추가!"}
                        size="big"
                        className="text-left ml-2 text-sm"
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
                    <h5 className="text-left font-normal my-5 text-gray-400">관심사를 2개 이상 골라주세요. (필수) <br />관심사가 많을 수록 만날 수 있는 친구가 많아져요.<br />당신을 @@@ 해보세요.</h5>
                    <p style={{color: "#8D8D8D", fontSize: 10, textAlign: 'left'}}>※런칭 후 추가 예정</p>
                </div>
                <InterestSetting history={history}/>
            </section>
        )
    }else if(questionNumber === 6) {
        contents = (
            <section className="min-h-screen text-center px-3 my-3 mb-10">
                <div className="px-3 py-5 mb-3">
                    <p style={{fontSize: 18, fontWeight: 'bold', marginBottom: 18}} className="text-left">관심사에 맞는 회원님의 활동을 기록해보세요.</p>
                    <p style={{color: "#B3B3B3", textAlign: 'left'}}>ex.오늘 먹은 음식 / 오늘 한 스터디 </p>
                </div>
                <section className="mt-5">
                    <div style={{position: 'relative'}}>
                        <img 
                            style={{width: 300, height: 300, margin: '0 auto', borderRadius: 180, objectFit: 'cover'}} 
                            src={imgSrc ? imgSrc : "/camera.svg"} 
                        />
                        {!articleImg_formData ? <p style={{color: "#C4C4C4", fontSize: 16, position: 'absolute', top: '60%', left: '50%', width: '100%', transform: 'translate(-50%, 0)', fontWeight: 'bold', whiteSpace: 'pre-line'}}>Click!</p> : null}
                        <input 
                            style={{position: 'absolute', display: 'block', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 300, height: 300, borderRadius: 150, cursor: 'pointer'}} 
                            type="file" 
                            accept="image/x-png,image/jpeg,image/gif"
                            onChange={(e) => uploadPhoto(e)} 
                        />
                    </div>
                    {isLoading ? (
                        <>
                            <div style={{height: 40, position: 'relative'}}>
                                <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: 10, transform: 'translate(-50%, 0)'}}>
                                    <Spinner 
                                        size={5}
                                        color={"#aaa"}
                                    />
                                    <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>업로드 중입니다..</p>
                                </div>
                            </div>
                        </>
                    ) : <div style={{height: 40}}></div>}
                    <p style={{margin: '40px 0 0 5px', fontSize: 12, color: "#8D8D8D", textAlign: 'left'}}>용량 제한 10MB 까지 올릴 수 있습니다.</p>
                    <button onClick={(e) => uploadBtnHandler(e)} className="mt-5 w-full rounded-xl px-5 py-3 bg-gray-400 text-white focus:outline-none">
                        <p style={{wordBreak: "keep-all"}}>업로드 하기</p>
                    </button>
                    
                </section>
            </section>
        )
    }else if(questionNumber === 7) {
        contents = (
            <section className="text-center px-5 my-5">
                <img 
                    src="/setting/airpod_banner.svg"
                    alt="banner"
                    width='100%'
                    height='100%'
                />  
                <textarea 
                    name="articleText"
                    id="articleText"
                    ref={articleRef}
                    placeholder="첫 번째 글을 작성해 보세요. 비방/욕설은 삼가해주세요."
                    style={{height: '250px', backgroundColor: "#F7F7FA"}}
                    className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
                </textarea>
                <textarea
                    id="articleTag"
                    ref={articleInterestArr}
                    placeholder="게시글 관심사 설정(필수사항) "
                    value={defaultArticleHashTag}
                    style={{height: '50px', color: "#4700FF", backgroundColor: "#F7F7FA"}}
                    className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
                </textarea>
                <section className="flex flex-row flex-wrap">
                    {interestArrInRedux.map((interest, id) => (
                        <div key={id} style={{width: 75, margin: '5px 2px 0', padding: '3px', border: '1px solid #D9D9D9', borderRadius: '30px', cursor: 'pointer'}}>
                            <p onClick={() => articleHashTagClickHandler(`${interest}`)} style={{fontSize: 12, color: "#8D8D8D"}}>@{interest}</p>
                        </div>
                    ))}
                </section>
                <textarea
                    id="articleTag"
                    placeholder="@태그하기 (선택사항)"
                    ref={articleTagRef}
                    style={{height: '50px', color: "#4700FF", backgroundColor: "#F7F7FA"}}
                    className="mt-3 px-3 py-5 w-full text-base placeholder-gray-300">
                </textarea>
                <button onClick={(e) => articleSubmitHandler(e)} className="mt-5 w-full border-2 rounded-xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 8) {
        contents = (
            <section className="text-center px-3 mb-10">
                 <div className="px-3 py-5 mb-3">
                    <p style={{fontSize: 24, fontWeight: 'bold', margin: '20px 0 10px'}} className="text-left">프로필사진</p>
                    <p style={{textAlign: 'left', color: "#C5C1C1"}}>자유로운 프로필 사진을 업로드 해주세요 </p>
                </div>
                <section className="mt-5">
                    <div style={{position: 'relative'}}>
                        <img 
                            style={{width: 300, height: 300, margin: '0 auto', borderRadius: 150, objectFit: 'cover'}} 
                            src={profileImgSrc ? profileImgSrc : "/camera.svg"} 
                        />
                        {!profileImgSrc ? <p style={{color: "#C4C4C4", fontSize: 12, position: 'absolute', top: '60%', left: '50%', width: '100%', transform: 'translate(-50%, 0)', whiteSpace: 'pre-line'}}><p style={{margin: 0, fontSize: 17, fontWeight: 'bold'}}>Click!</p><br/> 사전신청기간에는 수정이 불가하니,<br/> 프로필 사진은 조금 더 신중하게 선택해주세요!</p> : null}
                        <input 
                            style={{position: 'absolute', display: 'block', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 300, height: 300, borderRadius: 150, cursor: 'pointer'}} 
                            type="file" 
                            accept="image/x-png,image/jpeg,image/gif"
                            onChange={(e) => uploadProfileImg(e)} 
                        />
                    </div>
                    {isLoading ? (
                        <>
                            <div style={{height: 40, position: 'relative'}}>
                                <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: 10, transform: 'translate(-50%, 0)'}}>
                                    <Spinner 
                                        size={5}
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
    }else if(questionNumber === 9) {
        contents = (
            <section className="text-center px-5 my-5">
                <div className="px-3 py-5 mb-3">
                    <h3 className="text-left text-3xl font-bold">{adjInRedux || adj} {jobInRedux || job} {displayNameInRedux}님의 프로필 소개 </h3>
                    <h5 className="text-left font-normal text-gray-400 my-5">회원님의 프로필 소개를 적어보세요.</h5>
                </div>
                <textarea 
                    placeholder="나를 자유롭게 표현해봐요! "
                    ref={introRef}
                    autoFocus
                    style={{height: 250, backgroundColor: "#F7F7FA"}}
                    className="my-3 px-3 py-5 w-full text-base rounded-xl placeholder-gray-300 focus:outline-none"
                />
                <button onClick={(e) => introTextSubmitHandler(e)} style={{width: '100%'}} className="my-5 rounded-lg px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 10) { 
        contents = (
            <section className="text-center px-10 my-10">
                <h2 style={{fontSize: 24, fontWeight: 'bold'}} className="text-left mb-3">포트폴리오 (선택사항)</h2>
                <section>
                    <p className="text-gray-400 text-left">
                        회원님의 활동이력을 기록하세요.
                    </p>
                </section>
                
                <section style={{margin: "25px 0 15px"}}>
                    <div className="flex flex-row">
                        <p style={{marginBottom: 0, marginRight: 5}} className="text-left"> 활동 이력 </p>
                        <img 
                            src="/activity.svg"
                            alts="activity"
                        />
                    </div>
                    <textarea 
                        ref={resumeRef}
                        placeholder="가입한 동아리 / 학회활동 / 이전 직장 등등"
                        style={{height: '60px', backgroundColor: "#F7F7FA"}}
                        className="mt-3 px-3 py-5 w-full text-base placeholder-gray-300">
                    </textarea>
                </section>
                <section style={{margin: "10px 0"}}>
                    <div className="flex flex-row">
                        <p style={{marginBottom: 0, marginRight: 5}} className="text-left"> 근무 직장 </p>
                        <img 
                            src="/company.svg"
                            alts="company"
                        />
                    </div>
                    
                    <textarea 
                        ref={workPlaceRef}
                        placeholder="삼성 / 현대 / SKT / 카카오초콜렛 / 네이버"
                        style={{height: '60px', backgroundColor: "#F7F7FA"}}
                        className="mt-3 px-3 py-5 w-full text-base placeholder-gray-300">
                    </textarea>
                </section>
                <p style={{color: "#7C7C7C"}}>※ 추후 프로필 수정에서 추가 가능합니다</p>
                {isLoading ? (
                    <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                        <LoadingIndicator 
                            color={{red: 0, green: 0, blue: 0, alpha: 1}}
                            segmentWidth={2}
                        />
                    </div>
                ) : null}
                <button onClick={() => submitToServer()} style={{border: '1px solid black'}} className="mt-20 w-full rounded-lg px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 11) { // 초대장
        contents = (
            <div style={{position: 'relatve'}} className="h-full flex flex-col justify-centerrelative">
                <section style={{marginTop: 100}}>
                    <section style={{height: '100px'}} className="mt-5 flex flex-row justify-center items-center ">
                        <p style={{fontSize: 48, fontWeight: 800}}>XIRCLE</p>
                    </section>
                    <section style={{height: '220px'}} className=" text-center pt-5">
                        <h1 style={{fontSize: 20}} className="mb-3 px-10">Xircle 회원가입 및 사전신청을 해주셔서 대단히 감사합니다.</h1>
                        <p style={{fontSize: 14, lineHeight: 1.4}} className="px-10 pt-5 text-lg text-gray-500">
                        정식 서비스는 4월 16일날 시작됩니다. <br/>
                        초대장을 보내면 더 많은 친구들과 네트워킹이 가능해요!  
                        </p>
                    </section>
                </section>
                <section style={{position: 'absolute', width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'center', bottom: 10}}>
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
                        style={{ backgroundColor: '#F7F7FA', border: '1px solid #8D8D8D', width: '90%'}} 
                        className="rounded-lg py-3 text-black focus:outline-none"
                    > XIRCLE 초대장 보내기 </button>
                    <button 
                        onClick={() => history.push('/my-profile')} 
                        style={{backgroundColor: '#F7F7FA', border: '1px solid #8D8D8D', width: '90%'}} 
                        className="w-full rounded-lg py-3 mt-3 mb-10 text-black focus:outline-none"
                    > 넘어가기 
                    </button>
                </section>
            </div>
        )
    } else {
        history.push('/')
    }

    
    return (
        <>
            {contents}
        </>
    )
}
export default SettingContents; 