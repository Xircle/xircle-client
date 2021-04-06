import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../components/layout';
import queryString from 'query-string';
import * as actions from '../../../store/actions/index';
import { interest2Object } from '../../../components/interest2Object';
import airpod_event_1 from '../../../images/my-profile/airpod_event_1.svg'
import airpod_event_2 from '../../../images/my-profile/airpod_event_2.svg'
import airpod_event_3 from '../../../images/my-profile/airpod_event_3.svg'
import ageGenerator from '../../../components/ageGenerator';
import Spinner from 'react-spinner-material';
import Modal from '../../../components/UI/modal';
import { createKakaoButton } from '../../../components/KakaoShareButton';
import { Placeholder, Card } from 'semantic-ui-react';

let articleDispatchingCnt = [
    null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]
const selectedTab = {
    backgroundColor: 'black',
    color: 'white',
    marginRight: 5,
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

const FriendProfile = ({ history, location }) => {
    const { userId, isPublic, isGraduate, displayNameInFriend, gender, univInFriend, age, job, adj, interestArr, introText, profileImgSrc, resume, workPlace } 
        = useSelector(store => store.friend);
    const locationInRedux = useSelector(store => store.friend.location);

    const [pageNum, setPageNum] = useState(2);
    const [selectedInterest, setSelectedInterest] = useState(null); //관심사 네비게이션에서 선택된 관심사. (1, 스타트업) (2, 동네친구) ..등등
    // const [myProfileImgSrc, setMyProfileImgSrc] = useState(profileImgSrc);
    const [anyThingClicked, setAnyThingClicked] = useState(false);
    const [naviContents, setNaviContents] = useState(null);
    const [articleClickedArr, setArticleClicked] = useState([false, null]);

    const tokenInUser = useSelector(store => store.user.token);
    const tokenInAuth = useSelector(store => store.auth.token);
    
    const token = tokenInUser || tokenInAuth;
    const articleObjInFriend = useSelector(store => store.friend.articleObjInFriend);
    const isLoading = useSelector(store => store.friend.loading);
    const articleIsLoading = useSelector(store => store.friend.articleIsLoading);
    const dispatch = useDispatch();
    
    const newArr = interest2Object(interestArr);
    useEffect(() => {
        const tokenInRedux = token;
        if(!tokenInRedux) { // 토큰이 없는 상태라면(refreshing) /my-profile로 리다이렉션
            history.push('/my-profile');
        }else {
            if(userId) return null;  // 리덕스에 friend 데이터가 있으면, 친구탐색에서 넘어왔으면 http 통신 금지
            if(queryString.parse(location.search).search === 'true') return null;
            dispatch(actions.getFriend(tokenInRedux));
            setSelectedInterest('x');
            setArticleClicked([false, null]);
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
        }else if(selectedInterest === '스타트업') { // @스타트업 관심사 누를 때
            articleDispatchingCnt[1]++;
            if(articleDispatchingCnt[1] === 1) { // 최초 한번만 http 통신하기
                if(articleObjInFriend.스타트업) // 이미 한번이라도 게시글을 확인했으면, 디스패칭 안함
                    return null;
                dispatch(actions.getFriendArticle("스타트업", token, userId));
            }

            let foundArr = [];
            if(articleObjInFriend.스타트업) { // fetch된 후
                foundArr = articleObjInFriend.스타트업; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/스타트업/${id}`);
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
                if(articleObjInFriend.술_맛집탐방) // 이미 한번이라도 게시글을 확인했으면, 디스패칭 안함
                    return null;
                dispatch(actions.getFriendArticle("술_맛집탐방", token, userId));
            }

            let foundArr = [];
            if(articleObjInFriend.술_맛집탐방) { // fetch된 후
                foundArr = articleObjInFriend.술_맛집탐방; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/술_맛집탐방/${id}`);
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
                if(articleObjInFriend.동네친구) // 이미 한번이라도 게시글을 확인했으면, 디스패칭 안함
                    return null;
                dispatch(actions.getFriendArticle("동네친구", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.동네친구) { // fetch된 후
                foundArr = articleObjInFriend.동네친구; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/동네친구/${id}`);
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
                if(articleObjInFriend.코딩) 
                    return null;
                dispatch(actions.getFriendArticle("코딩", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.코딩) { // fetch된 후
                foundArr = articleObjInFriend.코딩; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/코딩/${id}`);
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
                if(articleObjInFriend.애견인) 
                    return null;
                dispatch(actions.getFriendArticle("애견인", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.애견인) { // fetch된 후
                foundArr = articleObjInFriend.애견인; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/애견인/${id}`);
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
                if(articleObjInFriend.패션) 
                    return null;
                dispatch(actions.getFriendArticle("패션", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.패션) { // fetch된 후
                foundArr = articleObjInFriend.패션; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/패션/${id}`);
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
                if(articleObjInFriend.예술) 
                    return null;
                dispatch(actions.getFriendArticle("예술", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.예술) { // fetch된 후
                foundArr = articleObjInFriend.예술; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/예술/${id}`);
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
                if(articleObjInFriend.게임) 
                    return null;
                dispatch(actions.getFriendArticle("게임", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.게임) { // fetch된 후
                foundArr = articleObjInFriend.게임; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/게임/${id}`);
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
                if(articleObjInFriend.헬스) 
                    return null;
                dispatch(actions.getFriendArticle("헬스", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.헬스) { // fetch된 후
                foundArr = articleObjInFriend.헬스; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/헬스/${id}`);
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
                if(articleObjInFriend.취업준비) 
                    return null;
                dispatch(actions.getFriendArticle("취업준비", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.취업준비) { // fetch된 후
                foundArr = articleObjInFriend.취업준비; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/취업준비/${id}`);
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
                if(articleObjInFriend.수험생) 
                    return null;
                dispatch(actions.getFriendArticle("수험생", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.수험생) { // fetch된 후
                foundArr = articleObjInFriend.수험생; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/수험생/${id}`);
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
                if(articleObjInFriend.대학원) 
                    return null;
                dispatch(actions.getFriendArticle("대학원", token, userId));
            }
            let foundArr = [];
            if(articleObjInFriend.대학원) { // fetch된 후
                foundArr = articleObjInFriend.대학원; // [ {interest: '스타트업', articleImgSrc: 'www.api.xircle~', articleContent: "안녕하세요~"} ]
                if(foundArr.length === 0)
                    return null;
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
                                    history.push(`/friend/article/대학원/${id}`);
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
    }, [selectedInterest, articleIsLoading, isLoading, articleObjInFriend, articleClickedArr]);

    let pageContents = null;
    if(pageNum === 2) {
        const secretAge = ageGenerator(age);
        const selectedEl = newArr.find(el => el.interest === selectedInterest);
        let selectedCnt;
        if(selectedEl)
            selectedCnt = selectedEl.count;
        pageContents = (
            <>
                {/* Profile Container */}
                {isLoading ? (
                    <div className="px-3 py-3 mx-3" style={{height: 472, position: 'relative'}}>
                        <div className="flex flex-col items-center" >
                            <Placeholder style={{ height: 198, width: 198, borderRadius: 100 }}>
                                <Placeholder.Image />
                            </Placeholder>
                            <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>친구 프로필 로딩중...</p>
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
                            {/* <input className="focus:outline-none" style={{position: 'absolute', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 228, height: 228, borderRadius: 114, cursor: 'pointer'}} type="file" onChange={(e) => profileImgChangeHandler(e)} /> */}
                            <img
                                onClick={() => { dispatch(actions.getFriend(token)); setSelectedInterest('x'); setArticleClicked(false); articleDispatchingCnt = [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; }}
                                style={{position: 'absolute', right: '6%', top: '50%', cursor: 'pointer'}} 
                                src="/profile/arrow_right_outline.svg"
                                alt="arrow"
                            />
                        </div>

                        {/* 닉네임, 개인정보 */}
                        <div className="mt-3">
                            <div className="text-center">
                                <span style={{color: "#8D8D8D", fontSize: 11}} className="text-sm cursor-pointer" onClick={() => history.push('/developer-profile')}>XIRCLE 개발자 프로필 구경하기</span>
                                <h3 style={{fontSize: 20, fontWeight: '600', margin: '5px 0'}}>{adj} {job} <span style={{fontSize: 18, fontWeight: 'lighter'}}>{displayNameInFriend}</span></h3>
                            </div>
                            <div className={`flex flex-row justify-center`}>
                                {isPublic ? <div style={{height: 25, borderRadius: 3, backgroundColor: isGraduate ? 'rgb(204, 246, 255)' : "#DAD4FF", margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{univInFriend} {isGraduate ? "졸업" : "재학중"}</p></div> : null}
                                <div style={{height: 25, borderRadius: 3, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{secretAge}</p></div>
                                <div style={{height: 25, borderRadius: 3, backgroundColor: '#F7F7FA', margin: '0 2px'}}><p style={{fontSize: '8px', color: '#616060', fontWeight: 'normal', padding: '7px'}}>{gender}</p></div>
                            </div>
                        </div>

                        {/* 장, 활동이력, 한줄소개 */}
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
                            {locationInRedux ? (
                            <li className="flex flex-row items-start my-3">
                                <img 
                                    style={{width: 15, height: 15, marginTop: 1}}
                                    src="/profile/location.svg"
                                    alt="location"
                                />
                                <p style={{margin: "0px 5px 0 10px", color: "#7C7C7C"}} className="my-0">{locationInRedux}</p>
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

                {/* Album Container */}
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
    }
    return (
        <Layout history={history} invitement>
            
            {isLoading ? (
                <header style={{margin: "20px 0 35px 0"}}>
                    <section className="flex flex-row items-center justify-around">
                        <div style={{width: 87}}></div>
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
            <header style={{margin: "20px 0 35px 0"}}>
                <section className="flex flex-row items-center justify-around">
                    <button 
                        className="px-5 py-3 rounded-3xl focus:outline-none"
                        onClick={() => history.push('my-profile')}
                    > 내 프로필
                    </button>
                    <button 
                        style={pageNum === 2 ? selectedTab : notSelectedTab}
                        className="px-5 py-2 rounded-3xl focus:outline-none"
                        onClick={() => setPageNum(2)}
                    > <p style={{fontSize: 18, fontWeight: 300}}>{displayNameInFriend}</p>
                    </button>
                    <button 
                        style={pageNum === 3 ? selectedTab : notSelectedTab}
                        className="px-5 rounded-3xl focus:outline-none"
                        onClick={() => setAnyThingClicked(true)}
                    >
                        <img 
                            style={{width: 45, height: 45}}
                            src="/profile/message.svg"
                            alt="message"
                        />
                    </button>
                </section>
            </header>
            )}
            <Modal show={anyThingClicked} clicked={() => setAnyThingClicked(false)}>
                <div style={{padding: '40px 0'}}>
                    <p>메시지는 개발 중 입니다. <br/> 4월 15일 런칭 이후에 <br/> 친구에게 메시지를 보내보세요!</p>
                </div>
            </Modal>

            {pageContents}
        </Layout>
    )
}

export default FriendProfile;