import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/UI/modal';
import Select from 'react-select';
import { AgeSettingOptions } from '../../../model/person';
import { Search } from 'semantic-ui-react'
import { jobs, adjectives } from '../../../model/person';
import TextFieldUI from '../../../components/UI/textFieldUI'
import KakaoShareButton from '../../../components/KakaoShareButton';
import {FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share';
import Banner from '../../../components/banner';
import LoadingIndicator from 'react-loading-indicator';
import CheckboxUI from '../../../components/UI/CheckboxUI';
import InterestSetting from '../../../components/interestSetting';
import * as actions from '../../../store/actions/index';

const SettingContents = ({ history, questionNum }) => {
    const [job, setJob] = useState('');
    const [adj, setAdj] = useState('');
    const [location, setLocation] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    
    const displayRef = useRef();
    const displayNameCheeckLoading = useSelector(store => store.user.displayNameUI.loading);
    const displayNameError = useSelector(store => store.user.displayNameUI.error);
    
    const articleRef = useRef();
    const [introText, setIntroText] = useState('');
    const [profileImgSrc, setProfileImgSrc] = useState('');
    const [Instagram, setInstagram] = useState('@');
    const [isChecked_1, setIsChecked_1] = useState(false);
    const [isChecked_2, setIsChecked_2] = useState(false);
    
    const [genderClicked, setGenderClicked] = useState(false);
    const [shareClicked, setShareClicked] = useState(false);
    
    const submitToServerLoading = useSelector(store => store.user.submitToServer.loading);
    const submitToServerError = useSelector(store => store.user.submitToServer.error);
    const genderInRedux = useSelector(store => store.user.gender);
    const ageInRedux = useSelector(store => store.user.age);
    const jobInRedux = useSelector(store => store.user.job);
    const adjInRedux = useSelector(store => store.user.adj);
    const locationInRedux = useSelector(store => store.user.location);
    const articleTextInRedux = useSelector(store => store.user.articleImgSrc);
    const articleImgSrcInRedux = useSelector(store => store.user.articleText);
    const displayName = useSelector(store => store.user.displayName);
    const interestArrInRedux = useSelector(store => store.user.interestArr);
    const introTextInRedux = useSelector(store => store.user.introText);
    const profileImgSrcInRedux = useSelector(store => store.user.profileImgSrc);
    const instagramIdInRedux = useSelector(store => store.user.instagramId);

    const dispatch = useDispatch();

    
    // /setting/1
    const WomanBtnClickedHandler = useCallback((event) => {
        setGenderClicked(true);
        dispatch(actions.addGender('woman'))
    }, []);
    const ManBtnClickedHandler = useCallback((event) => {
        setGenderClicked(true);
        dispatch(actions.addGender('man'))
    }, []);

    const NonBinaryBtnClickedHandler = useCallback((event) => {
        setGenderClicked(true);
        dispatch(actions.addGender('non'))
        //저장
    }, []);
    
    // /setting/2
    const jobClickedHandler = useCallback((job) => {
        setJob(job);
        dispatch(actions.addJob(job));
        history.push('/setting/3'); 
        //저장
    }, []);
    
    // /setting/3
    const adjClickedHandler = useCallback((adjective) => {
        setAdj(adjective);
        dispatch(actions.addAdj(adjective));
        history.push('/setting/4'); 
        //저장
    }, []);
    
    // /setting/4
    const locationBtnHandler = useCallback((event) => {
        event.preventDefault();
        // set 하기전에, 잘 적었는지 위치 필터링 한번 해야함.
        const locationRegex = /^(서울|경기도|강원도|충청북도|충청남도|전라북도|전라남도|경상북도|경상남도|부산|제주|세종|대구|인천|광주|대전|울산)/;
        if(!location.match(locationRegex))
            return alert('올바른 지역을 입력해주세요.');

        dispatch(actions.addLocation(location));
        history.push('/setting/5'); 
    }, [location]);

    const locationTextChangeHandler = useCallback((event) => {
        setLocation(event.target.value);
    }, []);
    
    // /setting/5
    const uploadPhoto = useCallback((event) => {
        event.preventDefault();
        // file을 읽을 reader 객체 생성
        const reader = new FileReader();
        reader.onload = event => { // async하게 다 읽었으면 실행 
            setImgSrc(event.target.result);
        };
        const files = event.target.files;
        const __file = files[0];

        reader.readAsDataURL(__file);
    }, []);
    
    const uploadBtnHandler = useCallback((event) => {
        event.preventDefault();
        if(!imgSrc)
            return alert("사진을 선택해주세요.")

        dispatch(actions.addArticleImgSrc(imgSrc));
        history.push('/setting/6')
    }, [imgSrc]);
    
    // /setting/6
    const articleSubmitHandler = useCallback((event) => {
        event.preventDefault();
        const articleText = articleRef.current.value;
        if(articleText.length < 3)
            return alert("적어도 3자 이상은 작성해주세요.")
        dispatch(actions.addArticleText(articleText));
        history.push('/setting/7')
    }, []);

    // /setting/7
    const displayNameSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        const displayNameRegex = /^@/;
        console.log(displayRef.current.value)
        if(displayRef.current.value.length < 2)
            return alert('닉네임을 입력해주세요.');
        if(!displayRef.current.value.match(displayNameRegex)) {
            return alert("닉네임은 맨 앞은 @를 포함해야합니다.")}

        await dispatch(actions.displayName(displayRef.current.value));
    }, []);

    useEffect(() => {
        if(displayNameError === false)
            history.push('/setting/8')
    }, [displayNameError]);

    // /setting/8
    const interestSubmitHandler = useCallback((event) => {
        event.preventDefault();
        
        history.push('/setting/9')
    }, []);
    
    // /setting/9
    const introTextSubmitHandler = useCallback((event) => {
        event.preventDefault();
        if(introText.length < 3)
            return alert("3글자 이상 입력해주세요!");
        dispatch(actions.addIntroText(introText));
        history.push('/setting/10')
    }, [introText]);

    const introTextChangeHandler = useCallback((event) => {
        event.preventDefault();
        setIntroText(event.target.value);
    }, []);
    
    // /setting/10
    const uploadProfileImg = useCallback((event) => {
        event.preventDefault();
        // file을 읽을 reader 객체 생성
        const reader = new FileReader();
        reader.onload = event => { // async하게 다 읽었으면 실행 
            setProfileImgSrc(event.target.result);
        };
        const files = event.target.files;
        const __file = files[0];

        reader.readAsDataURL(__file);
    }, []);

    const uploadProfileHandler = useCallback((event) => {
        event.preventDefault();
        if(!profileImgSrc)
            return alert("사진을 선택해주세요.");

        dispatch(actions.addProfileImgSrc(profileImgSrc));
        // axios 서버로
        history.push('/setting/11');
    }, [profileImgSrc]);

    // /setting/11
    const checkboxChanged = useCallback((event) => {
        event.preventDefault();
        const text = event.target.innerText;
        if(text === "연고링 카카오톡 채널 친구추가 하셨나요?") 
            setIsChecked_1(!isChecked_1);
        else
            setIsChecked_2(!isChecked_2);
        
    }, [isChecked_1, isChecked_2]);

    // /setting/12
    const InstaChangeHandler = useCallback((event) => {
        event.preventDefault();
        setInstagram(event.target.value);
    }, []);

    const InstaSubmit = useCallback(async (event) => {
        event.preventDefault();
        if(!Instagram.match(/^@/))
            return alert("@로 시작해주세요!");
        if(Instagram.length === 1)
            return alert('아이디를 제대로 입력해주셔야 이벤트 당첨시 연락이 닿습니다!');
        
        await dispatch(actions.addInstagramId(Instagram));
        await dispatch(actions.submitToServer());
        
    }, [Instagram]);

    // /setting/13
    const shareBtnClickedHandler = useCallback(() => {
        setShareClicked(!shareClicked);
    }, [shareClicked]);
    
    // Submit to server
    useEffect(() => {
        if(submitToServerError === false) {
            console.log('error false')
            history.push('/setting/13');
        }
        else if(submitToServerError === true) {
            alert("일시적인 오류가 발생했습니다. 다시 시도해주세요.") // 서버 에러
            console.log('error true')
        }
    }, [submitToServerLoading])

    const submitToServer = useCallback(async () => {
        await dispatch(actions.submitToServer(
            genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, displayName, interestArrInRedux, introTextInRedux, profileImgSrcInRedux, instagramIdInRedux
        ));
        console.log(genderInRedux, ageInRedux, jobInRedux, adjInRedux, locationInRedux, articleImgSrcInRedux, articleTextInRedux, displayName, interestArrInRedux, introTextInRedux, profileImgSrcInRedux, instagramIdInRedux);
    }, [submitToServerError]);
    
    // console.log(submitToServerError)

    const questionNumber = Number(questionNum);
    let contents = null;
    if(questionNumber === 1) {
        contents = (
            <>
                <section className="px-8 mt-8">
                    <h1 style={{textAlign: 'left', marginBottom: '10px'}} className="text-2xl text-left">성별</h1>
                    <p style={{color: "#C5C1C1", textAlign: 'left', marginBottom: '20px'}}>성별을 선택해주세요. (필수)<br /> 직접기입에 성별과 관련없는 정보 기재 하지마세요.</p>
                    <button onClick={(e) => WomanBtnClickedHandler(e)} style={{width: '80%', backgroundColor: "#F7F7FA"}} className="text-left border-2 px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base ">여성</span></button>
                    <button onClick={(e) => ManBtnClickedHandler(e)} style={{width: '80%', backgroundColor: "#F7F7FA"}} className="text-left border-2 px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base ">남성</span></button>
                    <button onClick={(e) => NonBinaryBtnClickedHandler(e)} style={{width: '80%', backgroundColor: "#F7F7FA"}} className="text-left border-2 px-8 py-3 mt-5 focus:outline-none"><span style={{color: "#887F7F"}} className="text-base "> 논바이너리</span></button>
                </section>
                
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
                        <button onClick={() => history.push('/setting/2')} className="font-sans border-2 w-full rounded-3xl px-5 py-3 mt-10 bg-gray-400 text-white hover:text-white hover:bg-black focus:outline-none">확인</button>
                    </div>
                </Modal>
            </>
        )
    }else if(questionNumber === 2) {
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
    }else if(questionNumber === 3) {
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
    }else if(questionNumber === 4) {
        contents = (
            <section className="h-1/4 text-center px-3 mt-3">
                <div className="px-3 py-5 mb-3">
                    <h1 style={{textAlign: 'left'}} className="text-2xl text-left">거주지</h1>
                    <p style={{color: "#C5C1C1", textAlign: 'left'}}>거주지를 기입해주세요. (필수) <br /> 구까지만 해주세요.  EX. 서울특별시 성북구</p>
                </div>
                <div className="h-full flex flex-row justify-center items-center pt-20">
                    <p style={{marginBottom: 0}} className="mr-5">나는</p>
                    <TextFieldUI 
                        submitted={(e) => locationBtnHandler(e)} 
                        changeHandler={(e) => locationTextChangeHandler(e)}
                        label="사는곳" 
                        placeholder="서울특별시 성북구" 
                    />
                    <p className="text-lg ml-5">에 삽니다.</p>
                </div>
                <button onClick={(e) => locationBtnHandler(e)} className="mt-20 w-full border-2 rounded-3xl px-5 py-3 hover:text-white hover:bg-black focus:outline-none">확인</button>
            </section>
        )
    }else if(questionNumber === 5) {
        contents = (
            <section className="text-center px-3 my-3 mb-10">
                <div className="px-3 py-5 mb-3">
                    <h3 className="text-left">친구들에게 공유하고싶은 자신의 일상을 한가지만 사진과함께 적어보세요!</h3>
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
                    <button onClick={(e) => uploadBtnHandler(e)} className="mt-16 w-full rounded-xl px-5 py-3 bg-gray-400 text-white focus:outline-none">
                        <p style={{wordBreak: "keep-all"}}>업로드 하기</p>
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 6) {
        contents = (
            <section className="text-center px-5 my-5">
                <Banner />
                <textarea 
                    ref={articleRef}
                    placeholder="첫 번째 글을 작성해 보세요. 비방/욕설은 삼가해주세요."
                    style={{height: '250px', border: '1px solid #ccc'}}
                    className="my-10 px-3 py-5 w-full text-base placeholder-gray-300">
                </textarea>
                <button onClick={(e) => articleSubmitHandler(e)} className="mt-5 w-full border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 7) {
        contents = (
            <section className="text-center px-3 my-10">
                <h3 className="text-left text-2xl">닉네임(아이디)을 설정해주세요.</h3>
                <h5 className="text-left font-normal text-gray-400 mb-10">닉네임을 적어주세요. <br />언제든지 변경가능합니다.</h5>
                <form onSubmit={(e) => displayNameSubmitHandler(e)} autoComplete="off" noValidate>
                    <input 
                        type="text"
                        defaultValue="@"
                        className="w-3/4 bg-gray-200 px-5 py-5 rounded-xl mb-3"
                        autoFocus
                        ref={displayRef}
                    />
                    {displayNameError & !displayNameCheeckLoading ? <p style={{color: 'red', margin: 0}}>[중복]사용자 이름 {displayRef.current.value}은 사용하실 수 없습니다.</p> : null}
                    {displayNameCheeckLoading ? (
                        <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                            <LoadingIndicator 
                                color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                segmentWidth={2}
                            />
                        </div>
                    ) : null}
                    <button onClick={(e) => displayNameSubmitHandler(e)} className="mt-10 w-1/2 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                        설정하기
                    </button>
                </form>
            </section>
        )
    }else if(questionNumber === 8) {
        contents = (
            <section className="text-center px-3 my-5">
                <div className="px-3 py-5 mb-3">
                    <h3 className="text-left text-3xl font-light">{adj} {job} {displayName}님 <br />요즘 무엇에 관심있으신가요?</h3>
                    <h5 className="text-left font-normal my-5 text-gray-400">관심사를 5개 이상 골라주세요. <br />관심사가 많을 수록 만날 수 있는 친구가 많아져요.<br />당신을 해시태그 해보세요.</h5>
                </div>
                <InterestSetting history={history}/>
            </section>
        )
    }else if(questionNumber === 9) {
        contents = (
            <section className="text-center px-5 my-5">
                <div className="px-3 py-5 mb-3">
                    <h3 className="text-left text-3xl font-light">{adj} {job} {displayName}님의 한줄소개! </h3>
                    <h5 className="text-left font-normal text-gray-400 mb-10">친구들에게 보여질 한줄소개를 적어보세요.</h5>
                </div>
                <textarea 
                    placeholder="예) 안녕하세요. 저는 24살 연세대학교에 재학중인 뿅뿅뿅입니다. 저는 현재 스타트업에서 어플리케이션 기획을 하고있습니다. 커리어적으로는 인사이트를 공유하고싶어요! 취미로는 함께 카페에서 커피한잔 함께 마시는걸 즐겨요. 또 전시회 뮤지컬을 좋아합니다! 눈과 입이 즐거운걸 사랑하는 청춘입니다 핳핳"
                    onChange={(e) => introTextChangeHandler(e)}
                    style={{height: '250px', border: '1px solid #ccc'}}
                    className="my-3 px-5 py-5 w-full text-base rounded-xl placeholder-gray-300">
                </textarea>

                <button onClick={(e) => introTextSubmitHandler(e)} className="my-5 w-1/2 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 10) {
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
                    <button onClick={(e) => uploadProfileHandler(e)} className="mt-16 w-full rounded-xl px-5 py-3 bg-gray-400 text-white focus:outline-none">
                        업로드 하기
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 11) { // 이벤트 참가
        contents = (
            <section className="text-center px-10 my-10">
                <h2 className="text-left mb-5">이벤트 참가</h2>
                <section>
                    <p className="text-gray-400 text-left">
                        에어팟 이벤트 참가를 위해서는 밑의 항목들을 
                        진행해 주셔야 합니다. 
                        (이벤트 결과가 인스타그램과 카카오톡채널로 
                        공지가 됩니다 3.20)
                    </p>
                    <div className="ui checkbox w-full text-left my-2">
                        <CheckboxUI checked={isChecked_1} checkboxChanged={checkboxChanged} label="연고링 카카오톡 채널 친구추가 하셨나요?"/>
                        <a style={{display: 'block', margin: '10px 0 0 30px'}} href="https://www.naver.com/">친구추가 하러가기</a>
                    </div>
                    <div className="ui checkbox w-full text-left my-2">
                        <CheckboxUI checked={isChecked_2} checkboxChanged={checkboxChanged} label="연고링 인스타그램 팔로우 하셨나요?"/>
                        <a style={{display: 'block', margin: '10px 0 0 30px'}} href="https://www.naver.com/">팔로우 하러가기</a>
                    </div>
                    <img 
                        style={{width: '300px', height: '300px', margin: '50px auto 0', border: '1px solid #ccc', objectFit: 'cover'}}
                        src="/airpod.png"
                        alt="airpod"
                    />
                </section>
                <button onClick={(e) => isChecked_1 && isChecked_2 ? history.push('/setting/12') : alert('모두 체크해주세요.')} className="mt-5 w-full rounded-lg px-5 py-3 bg-gray-400 text-white focus:outline-none">
                    이벤트 참가
                </button>
                {submitToServerLoading ? (
                    <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                        <LoadingIndicator 
                            color={{red: 0, green: 0, blue: 0, alpha: 1}}
                            segmentWidth={2}
                        />
                    </div>
                ) : null}
                <button onClick={() => submitToServer()} style={{border: '1px solid black'}} className="mt-5 w-full rounded-lg px-5 py-3 bg-white text-black focus:outline-none">
                    사전신청만 하기
                </button>
            </section>
        )
    }else if(questionNumber === 12) { // 인스타 아이디
        contents = (
            <section className="text-center px-3 mt-5">
                <section className="px-5 py-5 ">
                    <h3 className="text-left mb-5 text-3xl font-bold ">인스타그램 아이디</h3>
                    <p className="text-gray-400 mb-10 text-base text-left">
                        이벤트에 참가해주셔서 감사합니다. <br/>
                        인스타그램 팔로우 확인을 위한 아이디를 알려주세요!
                        팔로우 확인 후 바로 처분예정
                    </p>
                    <input 
                        type="text"
                        className="w-full bg-gray-200 px-5 py-5 rounded-xl"
                        autoFocus
                        defaultValue="@"
                        placeholder="- 제외하고 입력해주세요."
                        onChange={(e) => InstaChangeHandler(e)}
                    />
                    {submitToServerLoading ? (
                        <div style={{height: '30px', left: 'calc(50% - 10px)'}} className="absolute ">
                            <LoadingIndicator 
                                color={{red: 0, green: 0, blue: 0, alpha: 1}}
                                segmentWidth={2}
                            />
                        </div>
                    ) : null}
                    <button onClick={(e) => InstaSubmit(e)} className="mt-10 w-full rounded-lg px-5 py-3 bg-gray-400 text-white focus:outline-none">
                        완료
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 13) { // 초대장
        contents = (
            <div className="h-full">
                <section style={{height: '150px'}} className="mt-5 flex flex-row items-center ">
                    <img
                        onClick={() => history.push('/')} 
                        style={{height: '70px', width: '70px', cursor: 'pointer'}}
                        src="https://2donny.github.io/yk-logo.png"
                        alt="yk-logo"
                        className="rounded-2xl mx-auto"
                    />
                </section>

                <section style={{height: '320px'}} className=" text-center pt-5">
                    <h1 className="mb-3 px-10">연고링 회원가입 및 사전신청을 해주셔서 대단히 감사합니다.</h1>
                    <p className="px-10 pt-5 text-lg text-gray-500">
                        정식 서비스는 3월 20일날 시작됩니다. (변경가능) 
                        사전신청 이벤트 결과는 연고링 인스타그램과 
                        연고링 카카오톡 플러스 채널로 공지가 됩니다. <br/>
                        <br/>
                        *초대장을 공유하시면 에어팟 당첨확률이 높아져요. 
                        공유하신 수 만큼 추첨 이름을 더 넣어드려요. :) 
                        초대장인증은 밑에 인증방에서 진행해주세요! 벌써 
                        10명이상 인증하신 분도 계시는걸요..? ^^  
                    </p>
                    <a href="https://www.naver.com/"><h3>초대장 공유 인증하기</h3></a>
                </section>

                <section style={{height: '240px', padding: '0 10px'}}>
                    <article style={{opacity: shareClicked ? 1 : 0, visibility: shareClicked ? 'visible' : 'hidden', transition: 'all .2s ease-in', marginBottom: '10px'}} className="mt-24 text-center">
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
                    </article>
                    <button onClick={() => shareBtnClickedHandler()} className="w-full border-2 rounded-2xl px-5 py-3 bg-black text-white focus:outline-none">초대장 공유하고 에어팟 당첨 확률 up하기 </button>
                    <button onClick={() => history.push('/my-profile')} className="w-full border-2 rounded-2xl px-5 py-3 mt-3 mb-10 bg-white text-black focus:outline-none">넘어가기 </button>
                </section>
            </div>
        )
    }else {
        history.push('/')
    }

    
    return (
        <div>
            {contents}
        </div>
    )
}
export default SettingContents; 