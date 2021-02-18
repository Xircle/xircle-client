import React, { useCallback, useState } from 'react';
import Modal from '../../../components/UI/modal';
import Select from 'react-select';
import { AgeSettingOptions } from '../../../model/person';
import { Search } from 'semantic-ui-react'
import { jobs, adjectives } from '../../../model/person';
import TextFieldUI from '../../../components/UI/textFieldUI'
import axios from 'axios';

const SettingContents = ({ history, questionNum }) => {
    const [gender, setGender] = useState('');
    const [job, setJob] = useState('');
    const [adj, setAdj] = useState('');
    const [location, setLocation] = useState('');
    const [file, setFile] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [introText, setIntroText] = useState('');
    const [profileImgSrc, setProfileImgSrc] = useState('');
    const [profileImgFile, setProfileImgFile] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [genderClicked, setGenderClicked] = useState(false);


    const WomanBtnClickedHandler = useCallback((event) => {
        setGenderClicked(true);
        setGender('Woman')
        // 저장
    }, []);
    const ManBtnClickedHandler = useCallback((event) => {
        setGenderClicked(true);
        setGender('Man')
        //저장
    }, []);

    const jobClickedHandler = useCallback((job) => {
        console.log(job);
        setJob(job);
        history.push('/setting/3'); 
        //저장
    }, []);
    
    const adjClickedHandler = useCallback((adjective) => {
        console.log(adjective);
        setAdj(adjective);
        history.push('/setting/4'); 
        //저장
    }, []);

    const locationBtnHandler = useCallback((event) => {
        // set 하기전에, 잘 적었는지 위치 필터링 한번 해야함.

        history.push('/setting/5'); 
    }, []);

    const locationTextChangeHandler = useCallback((event) => {
        setLocation(event.target.value);
    }, []);
    
    const uploadPhoto = useCallback((event) => {
        event.preventDefault();
        // file을 읽을 reader 객체 생성
        const reader = new FileReader();
        reader.onload = event => { // async하게 다 읽었으면 실행 
            setImgSrc(event.target.result);
        };
        const files = event.target.files;
        const __file = files[0];
        setFile(__file);

        reader.readAsDataURL(__file);
    }, []);
    
    const uploadBtnHandler = useCallback((event) => {
        event.preventDefault();
        
        
        // axios 요청
        // const config = {
        //     headers: {
        //       "content-type": "multipart/form-data"
        //     }
        //   };
        // axios.post(`uploadAPI`, formData, config);

        history.push('/setting/6')
    }, []);
    
    // /setting/6
    const articleSubmitHandler = useCallback((event) => {
        event.preventDefault();
        history.push('/setting/7')
    }, []);

    // /setting/7
    const displayNameChangeHandler = useCallback((event) => {
        event.preventDefault();
        setDisplayName(event.target.value);
    }, []);
    
    const displayNameSubmitHandler = useCallback((event) => {
        event.preventDefault();
        history.push('/setting/8')
    }, []);

    // /setting/8
    const interestSubmitHandler = useCallback((event) => {
        event.preventDefault();
        history.push('/setting/9')
    }, []);
    
    // /setting/9
    const introTextSubmitHandler = useCallback((event) => {
        event.preventDefault();
        history.push('/setting/10')
    }, []);

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
        setProfileImgFile(__file);

        reader.readAsDataURL(__file);
    }, []);

    const uploadProfileHandler = useCallback((event) => {
        event.preventDefault();
        // axios 서버로
        history.push('/setting/11');
    }, []);

    // /setting/11
    const phoneNumberChangeHandler = useCallback((event) => {
        event.preventDefault();
        // axios 서버로
        setPhoneNumber(event.target.value);
    }, []);

    const phoneNumberSubmit = useCallback((event) => {
        event.preventDefault();
        // axios 서버로
        history.push('/setting/12');
    }, []);

    

    const questionNumber = Number(questionNum);
    let contents = null;
    if(questionNumber === 1) {
        contents = (
            <>
                <section className="text-center px-5 mt-5">
                    <p style={{textAlign: 'left'}} className="text-2xl text-left">나는?</p>
                    <button onClick={(e) => WomanBtnClickedHandler(e)} style={{width: '80%'}} className="font-sans block border-2 px-5 py-3 mt-5 focus:outline-none"><span className=" text-lg">🙋🏻‍♀️ 여자</span></button>
                    <button onClick={(e) => ManBtnClickedHandler(e)} style={{width: '80%'}} className="font-sans block border-2 px-5 py-3 mt-5 focus:outline-none"><span className="text-lg">🙋🏻 남자</span></button>
                </section>
                
                <Modal show={genderClicked} clicked={() => setGenderClicked(false)}>
                    <div className="mb-5">
                        <h1 className=" text-xl mb-5">회원님은 몇 살이신가요?</h1>
                        <span style={{ fontSize: '14px', color: '#5c5c5c'}}>걱정마세요! 나이는 20대 초, 중, 후반으로 표시됩니다.</span>
                    </div>
                    <Select 
                        blurInputOnSelect
                        placeholder="나이를 선택해주세요."
                        options={AgeSettingOptions}
                    />
                    <div className="flex flex-row justify-evenly">
                        <button onClick={() => setGenderClicked(false)} className="font-sans border-2 rounded-3xl px-5 py-3 mt-10 hover:text-white hover:bg-black focus:outline-none">취소</button>
                        <button onClick={() => history.push('/setting/2')} className="font-sans border-2 rounded-3xl px-5 py-3 mt-10 hover:text-white hover:bg-black focus:outline-none">확인</button>
                    </div>
                </Modal>
            </>
        )
    }else if(questionNumber === 2) {
        contents = (
            <section className="text-center px-3 mt-3">
                <p style={{textAlign: 'left'}} className="text-2xl text-left">회원님을 설명해주세요.</p>
                <Search
                    className="text-left w-full"
                />
                <section style={{maxHeight: '400px'}} className="mt-3 px-2 overflow-y-scroll">
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
                <p style={{textAlign: 'left'}} className="text-2xl text-left">회원님을 설명해주세요.</p>
                <div className="flex flex-row items-center">
                    <Search
                        className="text-left"
                    />
                    <h1 className="ml-3 text-xl my-auto font-medium">{job}</h1>
                </div>
                <section style={{maxHeight: '380px'}} className="mt-3 px-2 overflow-y-scroll">
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
                <div className="h-full flex flex-row justify-center items-center pt-20">
                    <p style={{marginBottom: 0}} className="text-lg mr-5">나는</p>
                    <TextFieldUI 
                        submitted={(e) => locationBtnHandler(e)} 
                        changeHandler={(e) => locationTextChangeHandler(e)}
                        label="사는곳" 
                        placeholder="서울특별시 강동구" 
                    />
                    <p className="text-lg ml-5">에 삽니다.</p>
                </div>
                <button onClick={(e) => locationBtnHandler(e)} className="mt-20 w-full border-2 rounded-3xl px-5 py-3 hover:text-white hover:bg-black focus:outline-none">확인</button>
            </section>
        )
    }else if(questionNumber === 5) {
        contents = (
            <section className=" h-1/6 text-center px-3 mt-3">
                <div className="h-full flex flex-row justify-center items-center pt-10">
                    <h3 className="text-left text-3xl font-light">친구들에게 공유하고싶은 자신의 일상을 한가지만 사진과함께 적어보세요! ex.오늘 입은 옷ㅎㅎ</h3>
                    
                </div>
                
                <section className="mt-3">
                    <img 
                        style={{margin: '0 auto 10px', width: '300px', height: "300px", objectFit: 'contain'}} 
                        src={imgSrc ? imgSrc : null} 
                    />
                    <input
                        type="file" 
                        accept="image/x-png,image/jpeg,image/gif"
                        onChange={(e) => uploadPhoto(e)}
                    />
                    <button onClick={(e) => uploadBtnHandler(e)} className="mt-5 w-1/3 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                        업로드 하기
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 6) {
        contents = (
            <section className=" h-1/6 text-center px-3 mt-10">
                
                <h3 className="text-2xl">[연고링 이벤트]</h3> <p> <strong className="text-xl">Airpod 2</strong>  절대 놓치지 마세요!!!</p>
                <textarea 
                    placeholder="친구들에게 공유할 글 작성해보세요. 해시태그"
                    style={{height: '250px', border: '1px solid gray'}}
                    className="my-3 px-3 py-5 w-full text-base placeholder-gray-400">
                </textarea>
                <button onClick={(e) => articleSubmitHandler(e)} className="mt-5 w-full border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 7) {
        contents = (
            <section className=" h-1/6 text-center px-3 mt-10">
                <h3 className="text-left text-3xl font-light">닉네임을 설정해주세요.</h3>
                <h5 className="text-left font-normal mb-10">새 계정에 사용할 사용자 이름을 선택하세요. 나중에 언제든지 변경할 수 있습니다.</h5>
                <input 
                    type="text"
                    className="w-3/4 bg-gray-200 px-5 py-5 rounded-xl"
                    autoFocus
                    onChange={(e) => displayNameChangeHandler(e)}
                />
                <button onClick={(e) => displayNameSubmitHandler(e)} className="mt-5 w-1/2 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 8) {
        contents = (
            <section className=" h-1/6 text-center px-3 mt-10">
                <h3 className="text-left text-3xl font-light">{adj} {job} {displayName}님 <br />요즘 무엇에 관심있으신가요?</h3>
                <h5 className="text-left font-normal mb-10">새 계정에 사용할 사용자 이름을 선택하세요. 나중에 언제든지 변경할 수 있습니다.</h5>
                
                <button onClick={(e) => interestSubmitHandler(e)} className="mt-5 w-1/2 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 9) {
        contents = (
            <section className=" h-1/6 text-center px-3 mt-10">
                <h3 className="text-left text-3xl font-light">{adj} {job} {displayName}님 <br />친구들에게 보여질 자신의 한줄소개를  간단히 적어주세요! </h3>
                <h5 className="text-left font-normal mb-10">새 계정에 사용할 사용자 이름을 선택하세요. 나중에 언제든지 변경할 수 있습니다.</h5>
                <textarea 
                    placeholder="예) 안녕하세요. 저는 24살 연세대학교에 재학중인 뿅뿅뿅입니다. 저는 현재 스타트업에서 어플리케이션 기획을 하고있습니다. 커리어적으로는 인사이트를 공유하고싶어요! 취미로는 함께 카페에서 커피한잔 함께 마시는걸 즐겨요. 또 전시회 뮤지컬을 좋아합니다! 눈과 입이 즐거운걸 사랑하는 청춘입니다 핳핳"
                    onChange={(e) => introTextChangeHandler(e)}
                    style={{height: '250px', border: '1px solid gray'}}
                    className="my-3 px-3 py-5 w-full text-base placeholder-gray-400">
                </textarea>

                <button onClick={(e) => introTextSubmitHandler(e)} className="mt-5 w-1/2 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                    다음
                </button>
            </section>
        )
    }else if(questionNumber === 10) {
        contents = (
            <section className=" h-1/6 text-center px-3 mt-10">
                <h5 className="text-left font-normal mb-10">마지막!! 회원님의 프로필 사진을 올려주세요!</h5>
                <p>얼굴 사진이 아니어도 됩니다. 본인을 가장 잘 드러낼 수  있는 사진 하나를 선택해주세요 ;) </p>
                
                <section className="mt-3">
                    <img 
                        style={{margin: '0 auto 10px', width: '300px', height: "300px", objectFit: 'contain'}} 
                        src={profileImgSrc ? profileImgSrc : null} 
                    />
                    <input
                        type="file" 
                        accept="image/x-png,image/jpeg,image/gif"
                        onChange={(e) => uploadProfileImg(e)}
                    />
                    <button onClick={(e) => uploadProfileHandler(e)} className="mt-5 w-1/3 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                        업로드 하기
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 11) {
        contents = (
            <section className=" h-1/6 text-center px-3 mt-10">
                <h5 className="text-left font-normal mb-10">이벤트 공지를 위한 전화번호</h5>
                <p>(이벤트 참가자 필수)</p>
                
                <section className="mt-3">
                    <input 
                        type="text"
                        className="w-3/4 bg-gray-200 px-5 py-5 rounded-xl"
                        autoFocus
                        onChange={(e) => phoneNumberChangeHandler(e)}
                    />
                    <button onClick={(e) => phoneNumberSubmit(e)} className="mt-5 w-1/3 border-2 rounded-3xl px-5 py-3 bg-black text-white focus:outline-none">
                        완료
                    </button>
                </section>
            </section>
        )
    }else if(questionNumber === 12) {
        contents = (
            <>
                <section style={{height: '30%'}} className="mt-5 flex flex-row items-center ">
                    <img 
                        style={{height: '70px', width: '70px'}}
                        src="https://2donny.github.io/ykring/yk-logo.png"
                        alt="yk-logo"
                        className="rounded-2xl mx-auto"
                    />
                </section>

                <section style={{height: '30%'}} className=" text-center px-5">
                    <h1 className="mb-3 px-10">연고링 회원가입및 사전신청을 해주셔서 대단히 감사합니다.</h1>
                    <p>
                        정식 서비스는 3월 20일날
                        시작됩니다. 
                        사전신청 이벤트 결과는 
                        연고링 카카오톡 플러스 채널로 공지가 
                        됩니다 . 
                        꼭 연고링 친구추가해주세요!
                        친구에게 연고링을 공유하면
                        공유한 친구 개수만큼 추첨번호 늘려준다. 
                    </p>
                </section>

                <section style={{height: '30%', padding: '0 10px'}}>
                    <button onClick={() => console.log('clicked')} className="font-sans w-full border-2 rounded-2xl px-5 py-3 mt-10 bg-black text-white hover:text-black hover:bg-white focus:outline-none">공유하고 에어팟 당첨 확률 up하기 </button>
                </section>
            </>
        )
    }

    
    return (
        <>
            {contents}
        </>
    )
}
export default SettingContents; 