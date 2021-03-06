import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/UI/modal';
import Select from 'react-select';
import { AgeSettingOptions } from '../../../model/person';
import { Search } from 'semantic-ui-react'
import { jobs, adjectives } from '../../../model/person';
import KakaoShareButton from '../../../components/KakaoShareButton';
import { FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share';
import Banner from '../../../components/banner';
import LoadingIndicator from 'react-loading-indicator';
import RadioUI from '../../../components/UI/RadioUI';
import InterestSetting from '../../../components/interestSetting';
import * as actions from '../../../store/actions/index';
import KakaoMap from '../../../components/kakaoMap';

const SettingContents = ({ history, questionNum }) => {
    const [isUnivPublic, setIsUnivPublic] = useState(null);
    const [isGraduateUniv, setGraduateUniv] = useState(null);
    const [job, setJob] = useState('');
    const [adj, setAdj] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    
    const articleRef = useRef();
    const articleTagRef = useRef();
    const introRef = useRef();
    const resume = useRef();
    const workPlace = useRef();

    const [defaultHashTag, setDefaultHashTag] = useState('');
    const [profileImgSrc, setProfileImgSrc] = useState('');
    const [articleImg_formData, setArticleImgSrcFormData] = useState(null);
    const [profileImg_formData, setProfileImgSrcFormData] = useState(null);
    
    const [publicOrNotClicked, setPublicOrNotClicked] = useState(true);
    const [graduateOrNotClicked, setGraduateOrNotClicked] = useState(true);
    const [genderClicked, setGenderClicked] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    
    const submitToServerLoading = useSelector(store => store.user.submitToServer.loading);
    const submitToServerError = useSelector(store => store.user.submitToServer.error);
    const submitImgSrcToAWSLoading = useSelector(store => store.user.submitImgSrc.loading);
    const submitImgSrcToAWSError = useSelector(store => store.user.submitImgSrc.error);

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
    const articleTagInRedux = useSelector(store => store.user.articleTag);
    const articleImgSrcInRedux = useSelector(store => store.user.articleImgSrc);
    const introTextInRedux = useSelector(store => store.user.introText);
    const profileImgSrcInRedux = useSelector(store => store.user.profileImgSrc);

    const dispatch = useDispatch();
    
    useEffect(() => {
        // 새로고침 시 하나라도 없어지면 /login 페이지로 라우팅
        // if(!emailInRedux || !genderInRedux || !ageInRedux || !jobInRedux || !adjInRedux || !locationInRedux || !articleTextInRedux || !articleImgSrcInRedux || !displayNameInRedux || !interestArrInRedux || !introTextInRedux || !profileImgSrcInRedux)
        //     window.location.assign('/login');
        
    }, []);

    // /setting/2
    const UnivPublicChangeHandler = useCallback((e, { value }) => {
        if(value === 'public')
            setIsUnivPublic(true);
        else
            setIsUnivPublic(false);
    }, []);

    const UnivGraduateChangeHandler = useCallback((e, { value }) => {
        console.log(value);
        if(value === 'graduate')
            setGraduateUniv(true);
        else
            setGraduateUniv(false);
    }, []);

    const radioSubmitHandler = useCallback(() => {
        console.log(isUnivPublic, isGraduateUniv);
        dispatch(actions.addIsPublic(isUnivPublic))
        dispatch(actions.addIsGraduate(isGraduateUniv))
        
        setPublicOrNotClicked(false);
    }, [isUnivPublic, isGraduateUniv]);
    
    const WomanBtnClickedHandler = useCallback(() => {
        setGenderClicked(true);
        dispatch(actions.addGender('woman'))
    }, []);
    const ManBtnClickedHandler = useCallback(() => {
        setGenderClicked(true);
        dispatch(actions.addGender('man'))
    }, []);
    const NonBinaryBtnClickedHandler = useCallback(() => {
        setGenderClicked(true);
        dispatch(actions.addGender('non'))
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
        console.log(__file);

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
        // /img 라우터로 formData 올려서 S3에 이미지 업로드하고, URL 받아야함.
        dispatch(actions.submitArticleImgToAWS(articleImg_formData, "article"));
    }, [imgSrc, articleImg_formData]);
    
    useEffect(() => {
        const currentPath = window.location.pathname;
        if(currentPath !== '/setting/6')
            return null;
        if(submitImgSrcToAWSError)
            return alert("서버에 일시적인 문제가 생겼습니다. 다시 시도해주세요.");
        else if(submitImgSrcToAWSError === false)
            history.push('/setting/7');
    }, [submitImgSrcToAWSLoading]);

    // /setting/7
    const articleHashTagClickHandler = useCallback((clickedHashTag) => {
        let newHashTag = null;
        if(defaultHashTag)
            newHashTag = defaultHashTag + ` ${clickedHashTag}`;
        else
            newHashTag = clickedHashTag;
        setDefaultHashTag(newHashTag);
    }, [defaultHashTag]);

    const articleSubmitHandler = useCallback((event) => {
        event.preventDefault();
        
        const articleText = articleRef.current.value;
        if(articleText.length < 3)
            return alert("적어도 3자 이상은 작성해주세요.")
        dispatch(actions.addArticleText(articleText));
        
        if(articleTagRef.current.value){
            const articleTagText = articleTagRef.current.value.trim();
            const TagArr = articleTagText.split(" ");
            const hashTagRegex = /^@/;

            let isSuccess = true;
            TagArr.forEach(tag => {
                if(!tag.match(hashTagRegex)){
                    alert("해시태그의 맨 앞은 @를 포함해야합니다.")
                    isSuccess = false;
                    return null;
                }
            });
            if(!isSuccess) 
                return null;
            // 성공했으면 @ 빼서 리덕스에 디스패치
            const hashTagArr = TagArr.map(tag => {
                return tag.replace('@', '');
            });
            dispatch(actions.addArticleTag(hashTagArr));
        }
        history.push('/setting/8')
    }, []);


    // setting/8
    const introTextSubmitHandler = useCallback((event) => {
        event.preventDefault();
        const introText = introRef.current.value;
        console.log(introText)
        if(introText.length < 3)
            return alert("3글자 이상 입력해주세요!");
        dispatch(actions.addIntroText(introText));
        history.push('/setting/9')
    }, []);
    
    // /setting/9
    const uploadProfileImg = useCallback((event) => {
        event.preventDefault();
        // file을 읽을 reader 객체 생성
        const files = event.target.files;
        const __file = files[0];

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

        console.log(profileImg_formData);
        for (var pair of profileImg_formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        dispatch(actions.submitProfileImgToAWS(profileImg_formData, "profile"));
    }, [profileImgSrc, profileImg_formData]);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if(currentPath !== '/setting/9')
            return null;
        if(submitImgSrcToAWSError === true)
            return alert("서버에 일시적인 문제가 생겼습니다. 다시 시도해주세요.");
        else if(submitImgSrcToAWSError === false)
            history.push('/setting/10');
    }, [submitImgSrcToAWSLoading]);

    // /setting/10 || Submit to server
    useEffect(() => {
        if(submitToServerError === false) {
            history.push('/setting/11');
        }
        else if(submitToServerError === true) {
            history.push('/login');
        }
    }, [submitToServerLoading])

    const submitToServer = useCallback(() => {
        const resumeText = resume.current.value;
        const workPlaceText = workPlace.current.value;
        dispatch(actions.submitToServer(
            phoneNumberInRedux, latitudeInRedux, longitudeInRedux, __pwdInRedux, emailInRedux, isPublicInRedux, isGraduateInRedux, genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, articleTagInRedux, displayNameInRedux, interestArrInRedux, introTextInRedux, profileImgSrcInRedux, resumeText, workPlaceText
        ));
        
    }, [phoneNumberInRedux, latitudeInRedux, longitudeInRedux, __pwdInRedux, emailInRedux, isPublicInRedux, isGraduateInRedux, genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, articleTagInRedux, displayNameInRedux, interestArrInRedux, introTextInRedux, profileImgSrcInRedux]);
    
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
                    <h1 style={{textAlign: 'left'}} className="text-2xl text-left">위치 허용해주세요</h1>
                    <p style={{color: "#C5C1C1", textAlign: 'left'}}>고객님의 도시 정보까지만 표시하며 언제든지 <br/> 변경 가능해요. 프라이버시에 대해 걱정 하지 마세요!</p>
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
                
                {isGraduateUniv === null ? (
                    <Modal show={graduateOrNotClicked}>
                        <div className="mb-5">
                            <h1 className="text-xl mb-5">회원님은 {univInRedux} 이시군요!</h1>
                            <span style={{fontSize: '14px', color: '#5c5c5c'}}>재학중이신가요? 졸업을 하셨나요? </span>
                        </div>
                        <RadioUI subject="graduateOrNot" changeHandler={UnivGraduateChangeHandler}/>
                    </Modal>
                ) : (
                    <Modal show={publicOrNotClicked}>
                        <div className="mb-5">
                            <h1 className="text-xl mb-5">회원님은 {univInRedux} 이시군요!</h1>
                            <span style={{fontSize: '14px', color: '#5c5c5c'}}>학교를 공개하시겠습니까? 비공개 하시겠습니까?<br/> 공개여부는 언제든지 변경 가능합니다.</span>
                        </div>
                        <RadioUI subject="privateOrNot" isFirstValue={isUnivPublic} changeHandler={UnivPublicChangeHandler}/>
                        <p style={{color: "#cdcdcd", fontSize: 12, marginTop: 15}}>공개하면 더 많은 네트워킹이 가능해요 :)</p>
                        <button onClick={() => radioSubmitHandler()} className="font-sans border-2 w-full rounded-3xl px-5 py-3 bg-gray-400 text-white hover:text-white hover:bg-black focus:outline-none">확인</button>
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
                        size="big"
                        className="text-left ml-2"
                    />
                    <p style={{marginLeft: '10px'}}>{job ? job : null}</p>
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
                    <h3 className="text-left text-3xl font-light">{adj} {job} {displayNameInRedux}님 <br />요즘 무엇에 관심있으신가요?</h3>
                    <h5 className="text-left font-normal my-5 text-gray-400">관심사를 2개 이상 골라주세요. (필수) <br />관심사가 많을 수록 만날 수 있는 친구가 많아져요.<br />당신을 @@@ 해보세요.</h5>
                    <p style={{color: "#8D8D8D", fontSize: 10, textAlign: 'left'}}>※런칭 후 추가 예정</p>
                </div>
                <InterestSetting history={history}/>
            </section>
        )
    }else if(questionNumber === 6) {
        contents = (
            <section className="text-center px-3 my-3 mb-10">
                <div className="px-3 py-5 mb-3">
                    <h3 className="text-left">관심사에 맞는 자신의 이야기를 한가지만 사진과 함께 적어보세요! </h3>
                    <p style={{color: "#B3B3B3", textAlign: 'left'}}>ex.오늘 먹은 음식 / 오늘의 일기 </p>
                </div>
                <section className="mt-5 px-5">
                    <img 
                        style={{margin: '0 auto 10px', width: '350px', height: '350px', objectFit: 'contain'}} 
                        src={imgSrc ? imgSrc : "/camera.png"} 
                    />
                    <input
                        type="file" 
                        accept="image/x-png,image/jpeg,image/gif"
                        onChange={(e) => uploadPhoto(e)}
                        style={{marginLeft: '10px'}}
                    />
                    {submitImgSrcToAWSLoading ? (
                        <>
                            <div style={{height: '30px', left: '50%', transform: 'translate(-50%, 0)'}} className="absolute ">
                                <div className="flex flex-col items-center">
                                    <LoadingIndicator 
                                        color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                        segmentWidth={2}
                                    />
                                    <p style={{marginTop: 5}}>업로드 중입니다</p>
                                </div>
                            </div>
                        </>
                    ) : null}
                    <button onClick={(e) => uploadBtnHandler(e)} className="mt-16 w-full rounded-xl px-5 py-3 bg-gray-400 text-white focus:outline-none">
                        <p style={{wordBreak: "keep-all"}}>업로드 하기</p>
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 7) {
        contents = (
            <section className="text-center px-5 my-5">
                <Banner />
                <textarea 
                    name="articleText"
                    id="articleText"
                    ref={articleRef}
                    placeholder="첫 번째 글을 작성해 보세요. 비방/욕설은 삼가해주세요."
                    style={{height: '250px', backgroundColor: "#F7F7FA", border: '1px solid #ccc'}}
                    className="mt-10 px-3 py-5 w-full text-base placeholder-gray-300">
                </textarea>
                <textarea
                    id="articleTag"
                    ref={articleTagRef}
                    placeholder="@태그하기 (선택사항)"
                    defaultValue={defaultHashTag}
                    style={{height: '50px', color: "#4700FF", backgroundColor: "#F7F7FA", border: '1px solid #ccc'}}
                    className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
                </textarea>
                <section className="flex flex-row flex-wrap">
                    {interestArrInRedux.map((interest, id) => (
                        <div key={id} style={{width: 70, margin: '5px', padding: '3px', border: '1px solid #D9D9D9', borderRadius: '30px', cursor: 'pointer'}}>
                            <p onClick={() => articleHashTagClickHandler(`@${interest}`)} style={{fontSize: 12, color: "#8D8D8D"}}>@{interest}</p>
                        </div>
                    ))}
                </section>
                {/* <p style={{marginBottom: 20, textAlign: 'center', color: "#bbb"}}> XIRCLE에서는 @를 붙이면 해시태그가 적용됩니다! </p> */}
                <button onClick={(e) => articleSubmitHandler(e)} className="mt-5 w-full border-2 rounded-xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 8) {
        contents = (
            <section className="text-center px-5 my-5">
                <div className="px-3 py-5 mb-3">
                    <h3 className="text-left text-3xl font-light">{adj} {job} {displayNameInRedux}님의 한줄소개! </h3>
                    <h5 className="text-left font-normal text-gray-400 my-10">친구들에게 보여질 한줄소개를 적어보세요.</h5>
                </div>
                <textarea 
                    placeholder="ex. 안녕하세요. 저는 스타트업에 관심이 많은 대학생입니다. ㅎㅎ"
                    ref={introRef}
                    autoFocus
                    style={{height: 250, border: '1px solid #ccc', backgroundColor: "#F7F7FA"}}
                    className="my-3 px-3 py-5 w-full text-base rounded-xl placeholder-gray-300"
                />
                <button onClick={(e) => introTextSubmitHandler(e)} style={{width: '100%'}} className="my-5 rounded-lg px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 9) {
        contents = (
            <section className="text-center px-3 mb-10">
                 <div className="px-3 py-5 mb-3">
                    <h3 className="text-left">[마지막] 프로필 사진을 올려주세요.</h3>
                    <p>얼굴 사진이 아니어도 됩니다. 본인을 가장 잘 드러낼 수  있는 사진 하나를 선택해주세요 ;) </p>
                </div>
                <section className="mt-5 px-5">
                    <img 
                        style={{margin: '0 auto 10px', width: '350px', height: "350px", objectFit: 'contain'}} 
                        src={profileImgSrc ? profileImgSrc : "/camera.png"} 
                        alt="camera"
                    />
                    <input
                        type="file" 
                        accept="image/x-png,image/jpeg,image/gif"
                        onChange={(e) => uploadProfileImg(e)}
                    />
                    {submitImgSrcToAWSLoading ? (
                        <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                            <LoadingIndicator 
                                color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                segmentWidth={2}
                            />
                        </div>
                    ) : null} 
                    <button onClick={(e) => uploadProfileHandler(e)} className="mt-16 w-full rounded-xl px-5 py-3 bg-gray-400 text-white focus:outline-none">
                        업로드 하기
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 10) { 
        contents = (
            <section className="text-center px-10 my-10">
                <h2 className="text-left mb-3">선택 사항</h2>
                <section>
                    <p className="text-gray-400 text-left">
                        친구들에게 알려줄 정보가 더 있나요? <br/>
                        자유롭게 적어주세요 :) 
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
                        ref={resume}
                        placeholder="인사이더스 1기 / 연고대창업학회 13기"
                        style={{height: '60px', backgroundColor: "#F7F7FA", border: '1px solid #ccc'}}
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
                        ref={workPlace}
                        placeholder="삼성 / SKT / 카카오 / 네이버"
                        style={{height: '60px', backgroundColor: "#F7F7FA", border: '1px solid #ccc'}}
                        className="mt-3 px-3 py-5 w-full text-base placeholder-gray-300">
                    </textarea>
                </section>
                <p style={{color: "#7C7C7C"}}>※ 추후 프로필 수정에서 추가 가능합니다</p>
                {submitToServerLoading ? (
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
            <div className="min-h-screen h-full relative">
                <section style={{height: '120px'}} className="mt-5 flex flex-row justify-center items-center ">
                    <p style={{fontSize: 36, fontWeight: 300}}>XIRCLE</p>
                </section>
                <section style={{height: '220px'}} className=" text-center pt-5">
                    <h1 style={{fontSize: 20}} className="mb-3 px-10">연고링 회원가입 및 사전신청을 해주셔서 대단히 감사합니다.</h1>
                    <p style={{fontSize: 14}} className="px-10 pt-5 text-lg text-gray-500">
                    정식 서비스는 3월 21일날 시작됩니다. <br/>
                    초대장을 보내면 더 많은 친구들과 네트워킹이 가능해요!  
                    </p>
                </section>
                <section className="text-center">
                    <p>공지 및 문의</p>
                    <div className="flex flex-col">
                        <a style={{color: "#8A8888"}} href="https://www.instagram.com/ykring_official/">XIRCLE 인스타그램</a>
                        <a style={{color: "#8A8888"}} href="http://pf.kakao.com/_kDxhtK">XIRCLE 카카오톡 채널</a>
                    </div>
                </section>
                <section style={{transform: 'translate(-50%, 0)'}} className="absolute w-4/5 bottom-0 left-1/2">
                    <section style={{opacity: shareClicked ? 1 : 0, visibility: shareClicked ? 'visible' : 'hidden', transition: 'all .2s ease-in', marginBottom: '10px'}} className="mt-24 text-center">
                        <KakaoShareButton />
                        <FacebookShareButton url="https://2donny.github.io/">
                            <FacebookIcon round/>
                        </FacebookShareButton>
                        <TwitterShareButton url="https://2donny.github.io/">
                            <TwitterIcon round/>
                        </TwitterShareButton>
                        <LineShareButton url="https://2donny.github.io/">
                            <LineIcon round/>
                        </LineShareButton>
                    </section>
                    <button 
                        onClick={() => shareBtnClickedHandler()}  
                        style={{ backgroundColor: '#F7F7FA', border: '1px solid #8D8D8D'}} 
                        className="w-full rounded-lg py-3 text-black focus:outline-none"
                    > XIRCLE 초대장 보내기 </button>
                    <button 
                        onClick={() => history.push('/my-profile')} 
                        style={{backgroundColor: '#F7F7FA', border: '1px solid #8D8D8D'}} 
                        className="w-full rounded-lg py-3 mt-3 mb-10 text-black focus:outline-none"
                    > 넘어가기 </button>
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