import React, { useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layout';
import * as actions from '../../../store/actions/index';
import Modal from '../../../components/UI/modal';
import { interest2Object } from '../../../components/interest2Object';
import airpod_event_1 from '../../../images/my-profile/airpod_event_1.svg'
import airpod_event_2 from '../../../images/my-profile/airpod_event_2.svg'
import airpod_event_3 from '../../../images/my-profile/airpod_event_3.svg'
import ageGenerator from '../../../components/ageGenerator';
import Spinner from 'react-spinner-material';
import { createKakaoButton } from '../../../components/KakaoShareButton';
import { Placeholder, Card } from 'semantic-ui-react';

let articleDispatchingCnt = [
    null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]
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
    const { isPublic, isGraduate, isLocationPublic, displayNameInUser, gender, univInUser, age, job, adj, location, interestArr, introText, profileImgSrc, resume, workPlace } = useSelector(store => store.user);
    const { displayName, univ } = useSelector(store => store.auth);
    
    const [pageNum, setPageNum] = useState(2);
    const [selectedInterest, setSelectedInterest] = useState(null); //관심사 네비게이션에서 선택된 관심사. (1, 스타트업) (2, 동네친구) ..등등
    const [newArr, setNewArr] = useState(interest2Object(interestArr));
    const [naviContents, setNaviContents] = useState(null);
    const [articleClickedArr, setArticleClicked] = useState([false, null]);
    
    const tokenInUser = useSelector(store => store.user.token);
    const tokenInAuth = useSelector(store => store.auth.token);
    const token = tokenInUser || tokenInAuth;
    const articleArrInProfile = useSelector(store => store.user.articleObjInMyProfile);
    const isLoading = useSelector(store => store.user.loading);
    const articleIsLoading = useSelector(store => store.user.articleIsLoading);
    const hasError = useSelector(store => store.user.error);
    const dispatch = useDispatch();
    
    // interestArr의 activity가 삭제될때마다 새롭게 렌더링
    useEffect(() => {
        setNewArr(interest2Object(interestArr));
    }, [interestArr]);

    useEffect(() => {
        // 하나라도 없으면 
        const storedToken = localStorage.getItem('tk');
        const tokenInRedux = token;
        if(storedToken) {
            if(!profileImgSrc) // /pre/user로 오면 무조건 다시 로딩
                return dispatch(actions.getUser(storedToken));
            if(interestArr.length !== 0) { // 이게 하나라도 있으면 전부 다 있다고 가정
                return null;
            }
            if(tokenInRedux) { // (/pre/user로 온 유저) 리덕스에 토큰이 있으면 서버로 보낼 때, 그 토큰으로 보내기
                return dispatch(actions.getUser(tokenInRedux));
            } 
            else { // 리덕스에 토큰이 없으면, 로컬스토리지 토큰으로 보내기.
                return dispatch(actions.getUser(storedToken));
            } 
        }else {
            alert("로그인 해주세요.");
            window.location.href = "auth";
        }
    }, []);

    useEffect(() => {
        // interestNum : 클릭한 관심사 인덱스
        if(selectedInterest === 'x' || selectedInterest === null) {
            if(articleClickedArr[0])
                setArticleClicked([false, null]);
            const myInterestCnt = newArr.length;
            setNaviContents(
                <ul className="flex flex-row justify-evenly flex-wrap">
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        id="airpod_event"
                        style={{
                            margin: 5, backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 111,
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => createKakaoButton("#airpod_event")}
                    >
                        <img style={{width: '100%'}} src="/profile/invitement.svg" alt="invitement" />
                    </li>
                    {newArr.map((el, idx) => (
                    <li
                        key={idx}
                        style={{ height: heightGenerator(idx).height, transform: `translate(0, ${heightGenerator(idx).translateY})`,  width: '45%', margin: 5, backgroundColor: "#fff", borderRadius: 15, backgroundSize: 'cover', 
                        backgroundImage: `url(${el.url})` 
                    }} 
                        className="cursor-pointer"
                        onClick={() => setSelectedInterest(el.interest)}
                    >
                        <div className="relative h-full text-white flex flex-col justify-center items-center">
                            {/* @ 버튼 */}
                            <div style={{position: 'absolute', top:5, right: 5}}>
                                <div style={{position: 'relative', width: 35, height: 35, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                                    <p style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>@</p>
                                </div>
                            </div>

                            {/* @스타트업 */}
                            <p style={{fontSize: 18, marginTop: 10}} className="mb-1 relative">{el.interest}</p>

                            {/* 사람 7명 || 활동 1개 */}
                            <div className="flex items-center">
                                <img 
                                    style={{width: 10, height: 10, margin: '0px 3px'}}
                                    src="/person_outline.svg"
                                    alt="person"
                                />
                                <p style={{fontSize: 10, margin: '0 5px 0 0'}}>{el.count}</p>
                                <p style={{fontSize: 10, margin: '3px 7px'}}>활동 {el.activity}개</p>
                            </div>
                        </div>
                    </li>
                    ))}
                    <li 
                        style={{
                            margin: 5, backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 121, transform: `translate(0, ${heightGenerator(myInterestCnt).translateY})`
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <img style={{width: '100%'}} src="/profile/airpod.svg" alt="airpod" />
                    </li>
                    <li 
                        style={{
                            margin: 5, backgroundColor: "#F7F7FA",
                            width: '45%'
                        }} 
                    >
                    </li>
                </ul>
            )
        }else if(selectedInterest === '스타트업') { 
            articleDispatchingCnt[1]++;
            if(articleDispatchingCnt[1] === 1) { 
                dispatch(actions.getInterestArticle("스타트업", token));
            }

            let foundArr = [];
            if(articleArrInProfile.스타트업) { // fetch된 후
                foundArr = articleArrInProfile.스타트업; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/스타트업/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_3})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>
                </ul>
                )
            );
        }else if(selectedInterest === '술/맛집탐방') { // @술/맛집탐방 관심사 누를 때
            articleDispatchingCnt[2]++;
            if(articleDispatchingCnt[2] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("술_맛집탐방", token));
            }

            let foundArr = [];
            if(articleArrInProfile.술_맛집탐방) { // fetch된 후
                foundArr = articleArrInProfile.술_맛집탐방; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/술_맛집탐방/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_1})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>
                </ul>
                )
            );
        }else if(selectedInterest === '동네친구') { // @동네친구 관심사 누를 때
            articleDispatchingCnt[3]++;
            if(articleDispatchingCnt[3] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("동네친구", token));
            }
            let foundArr = [];
            if(articleArrInProfile.동네친구) { // fetch된 후, 있거나 전부 삭제되서 길이가 0인경우 없어진 경우
                foundArr = articleArrInProfile.동네친구; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/동네친구/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_1})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>
                </ul>
                )
            );
        }else if(selectedInterest === '코딩') { // @코딩 관심사 누를 때
            articleDispatchingCnt[4]++;
            if(articleDispatchingCnt[4] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("코딩", token));
            }
            let foundArr = [];
            if(articleArrInProfile.코딩) { // fetch된 후
                foundArr = articleArrInProfile.코딩; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/코딩/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_3})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }else if(selectedInterest === '애견인') { // @애견인 관심사 누를 때
            articleDispatchingCnt[5]++;
            if(articleDispatchingCnt[5] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("애견인", token));
            }
            let foundArr = [];
            if(articleArrInProfile.애견인) { // fetch된 후
                foundArr = articleArrInProfile.애견인; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/애견인/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_2})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }else if(selectedInterest === '패션') { // @패션 관심사 누를 때
            articleDispatchingCnt[6]++;
            if(articleDispatchingCnt[6] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("패션", token));
            }
            let foundArr = [];
            if(articleArrInProfile.패션) { // fetch된 후
                foundArr = articleArrInProfile.패션; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/패션/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_3})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }else if(selectedInterest === '예술') { // @예술 관심사 누를 때
            articleDispatchingCnt[7]++;
            if(articleDispatchingCnt[7] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("예술", token));
            }
            let foundArr = [];
            if(articleArrInProfile.예술) { // fetch된 후
                foundArr = articleArrInProfile.예술; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/예술/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_2})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }else if(selectedInterest === '게임') { // @게임 관심사 누를 때
            articleDispatchingCnt[8]++;
            if(articleDispatchingCnt[8] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("게임", token));
            }
            let foundArr = [];
            if(articleArrInProfile.게임) { // fetch된 후
                foundArr = articleArrInProfile.게임; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/게임/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_3})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }else if(selectedInterest === '헬스') { // @헬스 관심사 누를 때
            articleDispatchingCnt[9]++;
            if(articleDispatchingCnt[9] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("헬스", token));
            }
            let foundArr = [];
            if(articleArrInProfile.헬스) { // fetch된 후
                foundArr = articleArrInProfile.헬스; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/헬스/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_1})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }else if(selectedInterest === '취업준비') { // @취업준비 관심사 누를 때
            articleDispatchingCnt[10]++;
            if(articleDispatchingCnt[10] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("취업준비", token));
            }
            let foundArr = [];
            if(articleArrInProfile.취업준비) { // fetch된 후
                foundArr = articleArrInProfile.취업준비; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/취업준비/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_2})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }else if(selectedInterest === '수험생') { // @수험생 관심사 누를 때
            articleDispatchingCnt[11]++;
            if(articleDispatchingCnt[11] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("수험생", token));
            }
            let foundArr = [];
            if(articleArrInProfile.수험생) { // fetch된 후
                foundArr = articleArrInProfile.수험생; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/수험생/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_3})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }else if(selectedInterest === '대학원') { // @대학원 관심사 누를 때
            articleDispatchingCnt[12]++;
            if(articleDispatchingCnt[12] === 1) { // 최초 한번만 http 통신하기
                dispatch(actions.getInterestArticle("대학원", token));
            }
            let foundArr = [];
            if(articleArrInProfile.대학원) { // fetch된 후
                foundArr = articleArrInProfile.대학원; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleTitle: "안녕하세요~"} ]
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
                    {foundArr.map((article, id) => (
                        <li 
                            key={id} 
                            style={{width: '45%', margin: '10px 2px 2px 2px', height: 310, position: 'relative', cursor: 'pointer'}}
                            onClick={() => {
                                if(articleClickedArr[1] === id) {
                                    history.push(`/my/article/대학원/${id}`);
                                }
                                setArticleClicked([!articleClickedArr[0], id]);
                        }}>
                            <div 
                                style={{
                                    backgroundImage: `url(${article.articleImgSrc})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', color: '#000', backgroundColor: "#fff", borderRadius: 15, objectFit: 'cover',
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: articleClickedArr[1] === id ? 0.1 : 1
                                }} 
                            >
                            </div>
                            <div style={{zIndex: 10, opacity: articleClickedArr[1] === id ? 1 : 0, padding: '0 20px'}} className="h-full flex flex-row justify-center items-center relative">
                                <p style={{color: "#000", fontSize: 12, fontWeight: 300, fontFamily: 'sans-serif', lineHeight: '20px'}}>{article.articleTitle}</p>
                                <p style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10, fontWeight: 300, color: "#8D8D8D"}}>자세히보기</p>
                            </div>
                        </li>
                    ))}
                    {/* 에어팟 광고 마지막 추가*/}
                    <li 
                        style={{
                            margin: '10px 2px 2px 2px', backgroundColor: "#fff", borderRadius: 15, overflow: 'hidden',
                            width: '45%', height: 310
                        }} 
                        className="cursor-pointer relative"
                        onClick={() => history.push('event')}
                    >
                        <div 
                            style={{
                                backgroundImage: `url(${airpod_event_1})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', height: '100%', borderRadius: 15, objectFit: 'cover',
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
                            }} 
                        />
                    </li>  
                </ul>
                )
            );
        }
    }, [selectedInterest, articleIsLoading, isLoading, articleArrInProfile, articleClickedArr]);

    let pageContents = null;
    if(pageNum === 1) {
       console.log('hi');
    } else if(pageNum === 2) {
        const secretAge = ageGenerator(age);
        const selectedEl = newArr.find(el => el.interest === selectedInterest);
        let selectedCnt;
        if(selectedEl)
            selectedCnt = selectedEl.count;
        pageContents = (
            <>
                {/* Profile coverer */}
                {isLoading ? (
                    <div className="px-3 py-3 mx-3" style={{height: 472, position: 'relative'}}>
                        <div className="flex flex-col items-center" >
                            <Placeholder style={{ height: 198, width: 198, borderRadius: 100 }}>
                                <Placeholder.Image />
                            </Placeholder>
                            <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>프로필 로딩중...</p>
                            <Placeholder style={{ height: '100%', width: '80%'}}>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                        </div>
                    </div>
                ) : (
                    <section style={{height: '100%'}} className="px-3 py-3 mx-3">
                    {/* 프로필 사진 */}
                        <div className="relative">
                            <img 
                                style={{width: 198, height: 198, borderRadius: 114, backgroundColor: 'white', margin: '0 auto', objectFit: 'cover'}}
                                src={profileImgSrc}
                            />
                            <input className="focus:outline-none" style={{position: 'absolute', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 198, height: 198, borderRadius: 114, cursor: 'pointer'}} onClick={() => history.push("/my-profile/edit")} />
                            <div onClick={() => history.push('/my-profile/edit')} className="flex flex-row justify-center items-center" style={{width: 40, height: 40, position: 'absolute', bottom: 15, right: '20%', borderRadius: 20, backgroundColor: "#fff", boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.08)',  cursor: 'pointer'}}>
                                <img 
                                    src="/profile/setting.svg"
                                    alt="setting"
                                    style={{width: 18, height: 18}}
                                />
                            </div>
                            <img
                                onClick={() => history.push('friend-profile')}
                                style={{position: 'absolute', right: '6%', top: '50%', cursor: 'pointer'}} 
                                src="/profile/arrow_right_outline.svg"
                                alt="arrow"
                            />
                        </div>

                        {/* 닉네임, 개인정보 */}
                        <div className="mt-3">
                            <div className="text-center">
                                <span style={{color: "#8D8D8D", fontSize: 11}} className="text-sm cursor-pointer" onClick={() => history.push('/developer-profile')}>XIRCLE 개발자 프로필 구경하기</span>
                                <h3 style={{fontSize: 20, fontWeight: '600', margin: '5px 0'}}>{adj} {job} <span style={{fontSize: 18, fontWeight: 'lighter'}}>{displayName || displayNameInUser}</span></h3>
                            </div>
                            <div className={`flex flex-row justify-center`}>
                                {isPublic ? <div style={{height: 25, borderRadius: 3, backgroundColor: isGraduate ? 'rgb(204, 246, 255)' : "#DAD4FF", margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{univ || univInUser} {isGraduate ? "졸업" : "재학중"}</p></div> : null}
                                {/* <div style={{height: 25, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{location}</p></div> */}
                                <div style={{height: 25, borderRadius: 3, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{secretAge}</p></div>
                                <div style={{height: 25, borderRadius: 3, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{gender}</p></div>
                            </div>
                        </div>

                        {/* 직장, 활동이력, 한줄소개 */}
                        <ul style={{marginTop: 30}}>
                            {workPlace ? (
                            <li className="flex flex-row items-center">
                                <img 
                                    style={{width: 15, height: 15}}
                                    src="/profile/company.svg"
                                    alt="company"
                                />
                                <p style={{margin: "0px 5px 0 10px"}} className="font-extrabold my-0">{workPlace}</p><span>재직중</span>
                            </li>
                            ) : null}
                            {resume ? (
                            <li className="flex flex-row items-center my-3">
                                <img 
                                    style={{width: 15, height: 15}}
                                    src="/profile/grobal.svg"
                                    alt="grobal"
                                />
                                <p style={{margin: "0px 5px 0 10px"}} className="my-0">{resume}</p>
                            </li>
                            ) : null}
                            {location && isLocationPublic ? (
                            <li className="flex flex-row items-center my-3">
                                <img 
                                    style={{width: 15, height: 15}}
                                    src="/profile/location.svg"
                                    alt="location"
                                />
                                <p style={{margin: "0px 5px 0 10px", color: "#7C7C7C"}} className="my-0">{location}</p>
                            </li>
                            ) : null}
                            
                            <li className="flex flex-row mb-2">
                                <p style={{margin: '10px 0'}}>{introText}</p>
                            </li>
                        </ul>
                    </section>
                )}

                {/* Album Navigation */}
                {isLoading ? null : (
                <section style={{marginTop: 20}} className="flex flex-row items-center justify-start">
                    <button 
                        style={selectedInterest === 'x' || selectedInterest === null ? selectedTab : notSelectedTab}
                        className="px-5 py-3 mx-3 rounded-3xl focus:outline-none"
                        onClick={() => setSelectedInterest('x')}
                    >
                        <p style={{margin: '0px 5px'}}>interest</p>
                    </button>
                    
                    {/* 클릭한 관심사 네비게이션  */}
                    <button 
                        style={selectedInterest !== 'x' && selectedInterest !== null ? selectedTab : notSelectedTab}
                        className="px-3 py-3 rounded-3xl focus:outline-none"
                    > 
                        {selectedInterest === null ? null : ( // 최초에는 글자가 안보임
                        // 최초가 아닐 때
                        <div className="flex flex-row items-center">
                            {selectedInterest !== 'x' ? ( // 최초가 아니고, interest 이외가 선택됐을 때
                            <div style={{color: 'white', position: 'relative', width: 18, height: 18, borderRadius: 9, backgroundColor: "#aaa"}}>
                                <p style={{ textAlign: 'center'}}>@</p>
                            </div>
                            ) : <div style={{width: 18}}></div>}
                            <p style={{margin: '0px 5px'}}>{selectedInterest === 'x' ? null : selectedInterest}</p>
                            {selectedInterest !== 'x' ? (
                            <div className="flex items-center">
                                <img 
                                    style={{width: 10, height: 10, margin: '0px 3px'}}
                                    src="/person_outline.svg"
                                    alt="person"
                                />
                                <p style={{fontSize: 12}}>{selectedCnt}</p>
                            </div>
                            ) : <div style={{width: 10}}></div>}
                            
                        </div>
                        )}
                    </button>
                </section>
                )}

                {/* Album coverer */}
                {isLoading ? (
                    <>
                        <Card.Group style={{padding: '0 20px'}} itemsPerRow={2}>
                            <Card>
                                <Card.Content>
                                    <Placeholder>
                                    <Placeholder.Image square />
                                    </Placeholder>
                                </Card.Content>
                            </Card>
                                <Card>
                                <Card.Content>
                                    <Placeholder>
                                    <Placeholder.Image square />
                                    </Placeholder>
                                </Card.Content>
                            </Card>
                        </Card.Group>
                    </>
                ) : (
                    <section style={{minHeight: '500px', height: '100%', padding: '20px 0', margin: '10px 0', backgroundColor: "#F7F7FA"}}>
                        {naviContents}
                    </section>
                )}
            </>
        )
    }else if(pageNum === 3) {
        console.log('page 3')
    }else {
        alert('존재하지 않는 페이지입니다.')
    }
    return (
        <Layout history={history} invitement>
            
            {isLoading ? (
                <header style={{margin: "20px 0 35px 0"}}>
                    <section className="flex flex-row items-center justify-around mt-1">
                        <div style={{width: 70}}></div>
                        <button 
                            style={selectedTab}
                            className="px-5 py-3 rounded-3xl focus:outline-none"
                        ><p style={{fontSize: 12, fontWeight: 300}}>대학생들의 새로운 네트워크 </p>
                        </button>
                        <button 
                            style={notSelectedTab}
                            className="px-5 py-3 rounded-3xl focus:outline-none"
                        >
                            Xircle
                        </button>
                    </section>
                </header>
            ): (
            pageNum === 3 ? (
                <img 
                    onClick={() => setPageNum(2)}
                    
                    src="/event/waytouse.jpg"
                    alt="사용방법"
                />
            ) : (
            <header style={{margin: "20px 0 35px 0"}}>
                <section className="flex flex-row items-center justify-around mt-1">
                    <div 
                        className="px-5 rounded-3xl focus:outline-none"
                        style={{width: 87, cursor: 'pointer'}}
                    >
                        <p style={{fontSize: 14, textAlign: 'center', fontWeight: 600}}>Xircle</p>
                    </div>
                    <button 
                        style={pageNum === 2 ? selectedTab : notSelectedTab}
                        className="px-5 py-2 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(2)}
                    ><p style={{fontSize: 18, fontWeight: 300}}>{displayName || displayNameInUser}</p>
                    </button>
                    <button 
                        className="px-5 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(3)}
                    >
                        <img
                            src="/profile/waytouse.svg"
                            style={{width: 45, height: 45}}
                        />
                    </button>
                </section>
            </header>
            ))}

            {pageContents}
        </Layout>
    )
}

export default MyProfile;