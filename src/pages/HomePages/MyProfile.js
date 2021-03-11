import React, { useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout';
import * as actions from '../../store/actions/index';
import Modal from '../../components/UI/modal';
import interest2UrlNumber from '../../components/interest2UrlNumber';
import airpod from '../../images/my-profile/airpod.svg';
import ageGenerator from '../../components/ageGenerator';
import Spinner from 'react-spinner-material';

let articleDispatchingCnt = 0;

const selectedTab = {
    backgroundColor: 'black',
    color: 'white',
};
const notSelectedTab = {
    backgroundColor: 'white',
    color: "#8D8D8D"
};
const heightGenerator = (idx) => {
    // heigth : 164px
    if(idx === 2 || idx === 5 || idx === 7 || idx === 10 || idx === 11) {
        if(idx === 5 || idx === 7 )
            return {
                height: 164,
                translateY: '-50px'
            }
        else if(idx === 10 || idx === 11)
            return {
                height: 164,
                translateY: '-100px'
            }
        else
            return {
                height: 164,
                translateY: '0px',
            }
    }else { // heigth : 111px
        if(idx === 3 || idx === 8 || idx === 9  ) {
            return {
                height: 111,
                translateY: '-50px',
            }
        }
        return {
            height: 111,
            translateY: '0px',
        }
    }
};

const MyProfile = ({ history }) => {
    const { isPublic, isGraduate, displayNameInUser, gender, univInUser, age, job, adj, location, interestArr, articleImgSrc, articleTag, introText, profileImgSrc, resume, workPlace } = useSelector(store => store.user);
    const { displayName, univ } = useSelector(store => store.auth);
    
    const [pageNum, setPageNum] = useState(2);
    const [interestNum, setInterestNum] = useState(null); //관심사 네비게이션에서 선택된 관심사. (1, 스타트업) (2, 동네친구) ..등등
    const [myProfileImgSrc, setMyProfileImgSrc] = useState(profileImgSrc);
    const [anyThingClicked, setAnyThingClicked] = useState(false);
    const [naviContents, setNaviContents] = useState(null);
    const [naviTitle, setNaviTitle] = useState(null);
    

    const tokenInUser = useSelector(store => store.user.token);
    const articleArrInProfile = useSelector(store => store.user.articleInProfile);
    const isLoading = useSelector(store => store.user.loading);
    const articleIsLoading = useSelector(store => store.user.articleIsLoading);
    const hasError = useSelector(store => store.user.error);
    const dispatch = useDispatch();
    
    const newArr = interest2UrlNumber(interestArr);
    
    useEffect(() => {
        // 하나라도 없으면 
        const storedToken = localStorage.getItem('tk');
        if(storedToken) {
            dispatch(actions.getUser(storedToken));
        }else {
            alert("로그인 해주세요.");
            window.location.href = "auth";
        }
    }, []);

    useEffect(() => {
        // interestNum : 클릭한 관심사 인덱스
        if(interestNum === 0 || interestNum === null) {
            console.log('get it')
            setNaviContents(
                <ul className="flex flex-row justify-evenly flex-wrap">
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: 5, backgroundColor: "#fff", borderRadius: 15, 
                            backgroundColor: '#000', overflow: 'hidden',
                            width: '45%', height: 111, color: '#fff'
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => setAnyThingClicked(true)}
                    >
                        <div style={{height: '80%'}} className="h-full flex flex-col justify-center items-center">
                            <p style={{margin: 0, fontSize: 12, margin: '2px 0', fontWeight: 'lighter'}}>친구도 사귀고 에어팟도 받고</p>
                            <p style={{margin: 0, fontSize: 12, margin: '2px 0', fontWeight: 'bold', textAlign: 'center'}}>에어팟 프로 0원 이벤트</p>
                            <p style={{margin: 0, fontSize: 6, margin: '2px 0', fontWeight: 'lighter', textAlign: 'center'}}>바로가기</p>
                            <div style={{ height: 40, width: 40, position: 'absolute', bottom: -5, left: '50%', transform: 'translate(-50%, 0)', backgroundSize: 'cover', backgroundImage: `url(${airpod})` }}></div>
                        </div>
                        <div 
                            onClick={() => setAnyThingClicked(true)} 
                            className="relative h-full text-white flex justify-center items-center"
                        >
                            <p className="mb-1 relative"></p>
                        </div>
                    </li>
                    {newArr.map((interest, idx) => (
                    <li
                        key={idx}
                        style={{ height: heightGenerator(idx).height, transform: `translate(0, ${heightGenerator(idx).translateY})`,  width: '45%', margin: 5, backgroundColor: "#fff", borderRadius: 15, backgroundSize: 'cover', backgroundImage: `url(${interest.url})` }} 
                        className="cursor-pointer"
                        onClick={() => setInterestNum(idx+1)}
                    >
                        <div className="relative h-full text-white flex flex-col justify-center items-center">
                            {/* @ 버튼 */}
                            <div style={{position: 'absolute', top:5, right: 5}}>
                                <div style={{position: 'relative', width: 35, height: 35, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                                    <p style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>@</p>
                                </div>
                            </div>

                            {/* @스타트업 */}
                            <p style={{fontSize: 18, marginTop: 10}} className="mb-1 relative">{interest.interest}</p>

                            {/* 사람 7명 || 활동 1개 */}
                            <div className="flex items-center">
                                <img 
                                    style={{width: 10, height: 10, margin: '0px 3px'}}
                                    src="/person_outline.svg"
                                    alt="person"
                                />
                                <p style={{fontSize: 10, margin: '0 5px 0 0'}}>{interest.count}</p>
                                <p style={{fontSize: 10, margin: '3px 7px'}}>활동 {interest.activity}개</p>
                            </div>
                            
                        </div>
                    </li>
                    ))}
                </ul>
            )
        }else if(interestNum === 1) { // @스타트업 관심사 누를 때
            articleDispatchingCnt++;
            if(articleDispatchingCnt === 1) { // 최초 한번만 http 통신하기
                console.log('dispatching!!');
                console.log('isLoading : ', articleIsLoading)
                dispatch(actions.getInterestArticle("startUp", tokenInUser, articleArrInProfile));
            }
            let foundObj = {};
            let fetchedArticleImgSrc = "";
            let fetchedArticleContent = "";
            if(articleIsLoading === false) { // fetch된 후에 정의
                foundObj = articleArrInProfile.find(el => el.interest === 'startUp');
                console.log(foundObj);
                fetchedArticleImgSrc = foundObj.articleImgSrc;
                fetchedArticleContent = foundObj.articleContent;
            }
            setNaviContents(
                articleIsLoading ? (
                    <div style={{height: 100, position: 'relative'}}>
                        <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: 10, transform: 'translate(-50%, 0)'}}>
                            <Spinner 
                                color={"#aaa"}
                            />
                            <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>게시글 로딩중...</p>
                        </div>
                    </div>
                ) : (
                <ul className="flex flex-row justify-evenly flex-wrap">
                    {/* 1개의 게시글 */}
                    <li 
                        style={{
                            margin: 5, backgroundColor: "#fff", borderRadius: 15, 
                            backgroundColor: '#000', overflow: 'hidden', backgroundImage: `url(${fetchedArticleImgSrc})`,
                            width: '45%', height: 281, color: '#fff'
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => console.log('hi')}
                    >
                        {fetchedArticleContent}
                    </li>
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: 5, backgroundColor: "#fff", borderRadius: 15, 
                            backgroundColor: '#000', overflow: 'hidden',
                            width: '45%', height: 111, color: '#fff'
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => setAnyThingClicked(true)}
                    >
                        <div style={{height: '80%'}} className="h-full flex flex-col justify-center items-center">
                            <p style={{margin: 0, fontSize: 12, margin: '2px 0', fontWeight: 'lighter'}}>친구도 사귀고 에어팟도 받고</p>
                            <p style={{margin: 0, fontSize: 12, margin: '2px 0', fontWeight: 'bold', textAlign: 'center'}}>에어팟 프로 0원 이벤트</p>
                            <p style={{margin: 0, fontSize: 6, margin: '2px 0', fontWeight: 'lighter', textAlign: 'center'}}>바로가기</p>
                            <div style={{ height: 40, width: 40, position: 'absolute', bottom: -5, left: '50%', transform: 'translate(-50%, 0)', backgroundSize: 'cover', backgroundImage: `url(${airpod})` }}></div>
                        </div>
                        <div 
                            onClick={() => setAnyThingClicked(true)} 
                            className="relative h-full text-white flex justify-center items-center"
                        >
                            <p className="mb-1 relative"></p>
                        </div>
                    </li>
                </ul>
                )
            );
            setNaviTitle("스타트업");
        }else if(interestNum === 2) { // @술/맛집탐방 관심사 누를 때
            setNaviContents(
                <h1>@술/맛집탐방</h1>
            )
            setNaviTitle("술/맛집탐방");
        }else if(interestNum === 3) { // @동네친구 관심사 누를 때
            setNaviContents(
                <h1>@동네친구</h1>
            )
            setNaviTitle("동네친구");
        }else if(interestNum === 4) { // @코딩 관심사 누를 때
            setNaviContents(
                <h1>@코딩</h1>
            )
            setNaviTitle("코딩");
        }else if(interestNum === 5) { // @애견인 관심사 누를 때
            setNaviContents(
                <h1>@애견인</h1>
            );
            setNaviTitle("애견인");
        }else if(interestNum === 6) { // @패션 관심사 누를 때
            setNaviContents(
                <h1>@패션</h1>
            );
            setNaviTitle("패션");
        }else if(interestNum === 7) { // @예술 관심사 누를 때
            setNaviContents(
                <h1>@예술</h1>
            );
            setNaviTitle("예술");
        }else if(interestNum === 8) { // @게임 관심사 누를 때
            setNaviContents(
                <h1>@게임</h1>
            );
            setNaviTitle("게임");
        }else if(interestNum === 9) { // @헬스 관심사 누를 때
            setNaviContents(
                <h1>@헬스</h1>
            )
            setNaviTitle("헬스");
        }else if(interestNum === 10) { // @취업준비 관심사 누를 때
            setNaviContents(
                <h1>@취업준비</h1>
            )
            setNaviTitle("취업준비");
        }else if(interestNum === 11) { // @로스쿨 관심사 누를 때
            setNaviContents(
                <h1>@로스쿨</h1>
            );
            setNaviTitle("로스쿨");
        }else if(interestNum === 12) { // @대학원 관심사 누를 때
            setNaviContents(
                <h1>@대학원</h1>
            );
            setNaviTitle("대학원");
        }
    }, [interestNum, articleIsLoading, isLoading]);


    // 프로필이미지 업데이트
    const updateProfile = useCallback((event) => {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = event => { 
            dispatch(actions.updateProfileImgToServer(event.target.result))
        };
        const files = event.target.files;
        const __file = files[0];

        reader.readAsDataURL(__file);
    }, []);

    const profileImgChangeHandler = useCallback((event) => {
        const files = event.target.files;
        const __file = files[0];

        const fileReader = new FileReader();
        fileReader.readAsDataURL(__file);
        fileReader.onload = e => { // async하게 다 읽었악면 실행 
            setMyProfileImgSrc(e.target.result);
        };

        // const formData = new FormData();
        // formData.append("img", __file);
        // setProfileImgSrcFormData(formData);
    }, []);

    let pageContents = null;
    if(pageNum === 1) {
        pageContents = (
            <div style={{paddingTop: 10}} className="h-screen relative">
                <section>
                    <section onClick={() => setAnyThingClicked(true)} style={{position: 'absolute', left: '50%', top: '25%', transform: 'translate(-50%, 0)'}}>
                        <p style={{fontSize: 20, textAlign: 'center', whiteSpace: 'pre'}}>Xircle은 이런 가치를 제공합니다.</p>
                    </section>
                </section>
                
            </div>
        )
    } else if(pageNum === 2) {
        const secretAge = ageGenerator(age);
        
        pageContents = (
            <>
                {/* Profile Container */}
                {isLoading ? (
                    <div style={{height: 472, position: 'relative'}}>
                        <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                            <Spinner 
                                color={"#aaa"}
                            />
                            <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>프로필 로딩중...</p>
                        </div>
                    </div>
                ) : (
                    <section style={{height: '100%'}} className="px-3 py-3 mx-3">
                    {/* 프로필 사진 */}
                        <div className="relative">
                            <img 
                                style={{width: 228, height: 228, borderRadius: 114, backgroundColor: 'white', margin: '0 auto', objectFit: 'cover'}}
                                src={profileImgSrc}
                            />
                            <input className="focus:outline-none" style={{position: 'absolute', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 228, height: 228, borderRadius: 114, cursor: 'pointer'}} type="file" onChange={(e) => profileImgChangeHandler(e)} />
                        </div>

                        {/* 닉네임, 개인정보 */}
                        <div className="mt-3">
                            <div className="text-center">
                                <p style={{color: "#8D8D8D", fontSize: 11}} className="text-sm cursor-pointer" onClick={() => history.push('/developer-profile')}>XIRCLE 개발자 프로필 구경하기</p>
                                <h3 style={{fontSize: 20, fontWeight: '600', margin: '5px 0'}}>{adj} {job} <span style={{fontSize: 18, fontWeight: 'lighter'}}>{displayName || displayNameInUser}</span></h3>
                            </div>
                            <div className={`flex flex-row justify-center`}>
                                <div style={{height: 25, backgroundColor: gender === '남' ? '#CCF6FF' : '#C6BDFF', margin: '0 2px 0 0'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{gender}</p></div>
                                {isPublic ? <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{univ || univInUser} {isGraduate ? "졸업" : "재학중"}</p></div> : null}
                                <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{location}</p></div>
                                <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{secretAge}</p></div>
                            </div>
                        </div>

                        {/* 직장, 한줄소개 */}
                        <ul className="mt-14">
                            {workPlace ? (
                            <li className="flex flex-row text-sm mb-2">
                                <img 
                                    style={{width: 15, height: 15}}
                                    src="/company.svg"
                                    alt="company"
                                />
                                <p className="font-extrabold mx-2 my-0">{workPlace}</p><span>재직중</span>
                            </li>
                            ) : null}
                            <li className="flex flex-row text-sm mb-2">
                                <p className="">{introText}</p>
                            </li>
                            <li className="flex flex-row items-center my-3 ">
                                <img 
                                    style={{width: 11, height: 11}}
                                    src="/activity.svg"
                                    alt="activity"
                                />
                                <p className="font-sans" style={{color: "#8D8D8D", fontSize: 13, marginLeft: 5}}>{resume}</p>
                            </li>
                        </ul>
                    </section>
                )}

                {/* Album Navigation */}
                {isLoading ? <div style={{height: 40}}></div> : (

                <section className="flex flex-row items-center justify-start mt-1">
                    <button 
                        style={interestNum === 0 || interestNum === null ? selectedTab : notSelectedTab}
                        className="px-5 py-3 mx-3 rounded-3xl focus:outline-none"
                        onClick={() => setInterestNum(0)}
                    >
                        <p style={{margin: '0px 5px'}}>interest</p>
                    </button>
                    
                    {/* 클릭한 관심사 네비게이션  */}
                    <button 
                        style={interestNum !== 0 && interestNum !== null ? selectedTab : notSelectedTab}
                        className="px-3 py-3 rounded-3xl focus:outline-none"
                    > 
                        {interestNum === null ? null : ( // 최초에는 글자가 안보임
                        // 최초가 아닐 때
                        <div className="flex flex-row items-center">
                            {interestNum !== 0 ? ( // 최초가 아니고, interest 이외가 선택됐을 때
                            <div style={{color: 'white', position: 'relative', width: 18, height: 18, borderRadius: 9, backgroundColor: "#aaa"}}>
                                <p style={{ textAlign: 'center'}}>@</p>
                            </div>
                            ) : <div style={{width: 18}}></div>}
                            <p style={{margin: '0px 5px'}}>{naviTitle}</p>
                            {interestNum !== 0 ? (
                            <div className="flex items-center">
                                <img 
                                    style={{width: 10, height: 10, margin: '0px 3px'}}
                                    src="/person_outline.svg"
                                    alt="person"
                                />
                                <p style={{fontSize: 12}}>{newArr[interestNum-1].count}</p>
                            </div>
                            ) : <div style={{width: 10}}></div>}
                            
                        </div>
                        )}
                    </button>
                </section>
                )}

                {/* Album Container */}
                {isLoading ? (
                    <>
                        <div style={{height: 100, position: 'relative'}}>
                            <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: 10, transform: 'translate(-50%, 0)'}}>
                                <Spinner 
                                    color={"#aaa"}
                                />
                                <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>사진 로딩중...</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <section style={{minHeight: '500px', height: '100%', padding: '20px 0', margin: '10px 0', backgroundColor: "#F7F7FA"}}>
                        {naviContents}
                    </section>
                )}
            </>
        )
    }else if(pageNum === 3) {
        pageContents = (
            <div style={{padding: 10}} className="h-screen">
                <p>서비스 준비중입니다.</p>
            </div>
        )
    }else {
        alert('존재하지 않는 페이지입니다.')
    }
    return (
        <Layout invitement footerNone>
            {/* 어쩔수 없이 main안에 header 넣어야함 */}
            {isLoading ? <div style={{height: 95}}></div> : (
            <header style={{margin: "20px 0 35px 0"}}>
                <section className="flex flex-row items-center justify-around mt-1">
                    <button 
                        style={pageNum === 1 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 m-0 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(1)}
                    >
                        <p style={{fontFamily: 'serif', fontWeight: 'bolder'}}>XIRCLE</p>
                    </button>
                    <button 
                        style={pageNum === 2 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(2)}
                    > {displayName || displayNameInUser}
                    </button>
                    <button 
                        style={pageNum === 3 ? selectedTab : notSelectedTab}
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(3)}
                    >
                        방명록
                    </button>
                </section>
            </header>
            )}

            <Modal show={anyThingClicked} clicked={() => setAnyThingClicked(false)}>
                <div className="mb-5">
                    <h1 className="text-xl mb-5">개발중입니다.</h1>
                </div>
            </Modal>
            
            {pageContents}
        </Layout>
    )
}

export default MyProfile;