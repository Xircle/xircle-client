import React, {useState, useCallback, useEffect, useRef} from 'react';
import Layout from '../../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Placeholder, Card } from 'semantic-ui-react';
import { scrolltoPostNum } from '../../../components/scrolltoTop';
import Spinner from 'react-spinner-material';
import Drawer from '../../../components/UI/Drawer';

const ArticleDetail = ({ history, match }) => { //postNum 최신부터 0 ~ n
    const [displayName, setDisplayName] = useState();
    const [who, _] = useState(match.params.who);
    const [interest, setInterest] = useState(match.params.interest);
    const [postNum, __] = useState(match.params.postNum);
    const [pageNum, setPageNum] = useState(0);
    const [settingClicked, setSettingClicked] = useState(false);
    const [settingType, setSettingType] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState();
    // User store
    const { myUserId, token, displayNameInUser, articleObjInMyProfile, job, adj, profileImgSrc } = useSelector(store => store.user);
    const hasMoreArticleInProfile = useSelector(store => store.user.hasMoreArticle);
    // Friend store
    const { userId, displayNameInFriend, articleObjInFriend } = useSelector(store => store.friend);
    const job_f = useSelector(store => store.friend.job);
    const adj_f = useSelector(store => store.friend.adj);
    const profileImgSrc_f = useSelector(store => store.friend.profileImgSrc);
    const hasMoreArticleInFriend = useSelector(store => store.friend.hasMoreArticle);

    
    const isLoading = useSelector(store => store.user.articleIsLoading); // 나의 detail article
    const isLoadingFriend = useSelector(store => store.friend.articleIsLoading); // 친구의 detail article

    const dispatch = useDispatch();

    // 리다이렉션 | 스크롤(pageNum)
    useEffect(() => {
        if(who === 'my') {
            if(!displayNameInUser)
                return window.location.href = '/my-profile';
            else {
                if(displayNameInUser.indexOf('@') !== -1) // @가 포함된다면
                    setDisplayName(displayNameInUser.replace('@', ''))
            }
            // scrollTo depeding on 'postNum'
            if(isLoading === false || (isLoading === null && articleObjInMyProfile[interest][0].postId)) {
                setTimeout(() => {
                    scrolltoPostNum(Number(postNum));
                }, 200);
            }
        }else { // '/friend/'
            if(!displayNameInFriend)
                return window.location.href = '/my-profile';
            else {
                if(displayNameInFriend.indexOf('@') !== -1)
                    setDisplayName(displayNameInFriend.replace('@', ''))
            }
            if(isLoadingFriend === false || (isLoadingFriend === null && articleObjInFriend[interest][0].postId)) {
                setTimeout(() => {
                    scrolltoPostNum(Number(postNum));
                }, 200);
            }
        }

        
    }, [isLoading, isLoadingFriend, articleObjInMyProfile, articleObjInFriend]);

    // 내 게시글 http 게시글 요청 | 재요청 방지
    useEffect(() => {
        // http 재요청 방지
        if(who === 'my') {
            if(articleObjInMyProfile[interest] && articleObjInMyProfile[interest][(pageNum)*8].postId)  //원소크기 => 0, 8, 16. 8개씩 증가하니까
                return null;
    
            if(hasMoreArticleInProfile) {
                dispatch(actions.getInterestArticleDetail(token, interest, pageNum, myUserId, 'my'));
            }
        }else { // friend 
            if(articleObjInFriend[interest] && articleObjInFriend[interest][(pageNum)*8].postId) 
                return null;
            
            if(hasMoreArticleInFriend)
                dispatch(actions.getInterestArticleDetail(token, interest, pageNum, userId, 'friend'));
        }
    }, [articleObjInMyProfile, articleObjInFriend, hasMoreArticleInProfile, hasMoreArticleInFriend, pageNum]);
   
    const observer = useRef()
    const lastArticleRef = useCallback(node => {
      if(isLoading || isLoadingFriend) 
        return null;
      if(observer.current) 
        observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && (hasMoreArticleInProfile || hasMoreArticleInFriend)) {
          setPageNum(prevPageNumber => prevPageNumber + 1)
        }
      })
      if(node)
        observer.current.observe(node);
    }, [isLoading, isLoadingFriend, hasMoreArticleInProfile, hasMoreArticleInFriend])

    const deletePostHandler = useCallback((postId) => {
        console.log('delete postId', postId);

        dispatch(actions.deleteMyArticle(token, postId));
    }, [token]);

    let contents;
    if(who === 'my') {
        contents = (
            <div style={{minHeight: '100vh', height: '110%'}}>
                {isLoading ? (
                    <div style={{maxheight: '100vh', backgroundColor: "#fff"}}>
                        <div style={{padding: 10}} className="flex px-5 py-5 flex-col items-center">
                            <Placeholder style={{width: '95%'}}>
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{ height: 491, width: '95%' }}>
                                <Placeholder.Image />
                            </Placeholder>
                            <Placeholder style={{width: '95%'}}>
                                <Placeholder.Line length='short' />
                                <Placeholder.Line length='very short' />
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='long' />
                            </Placeholder>
                        </div>
                    </div>
                ) : (
                articleObjInMyProfile[interest] && articleObjInMyProfile[interest].map((post, index) => {
                    let hashTagArr = ''; // 수정) 일단 배열말고 문자열로 해놓음.
                    if((pageNum * 8) === index+1) { 
                        // 마지막 게시물일 때
                        if(post.articleTagArr && post.articleTagArr.length !== 0)
                            hashTagArr = '@' + post.articleTagArr.join(' @');
                        return (
                            <article ref={lastArticleRef} key={index} style={{height: 800, backgroundColor: "#fff"}}>
                                {/* 형용사, 직업, 닉네임 */}
                                <div 
                                    className="flex flex-row items-center cursor-pointer" 
                                    onClick={() => history.push('/my-profile')}
                                >
                                    <img style={{width: 32, height: 32, margin: '20px 10px', borderRadius: 16}} src={profileImgSrc} alt="profile" />
                                    <h1 style={{margin: 0, fontWeight: 700, fontSize: 14}}>{adj} {job} <span style={{fontWeight: 400, fontSize: 14}}>{displayNameInUser}</span></h1>
                                </div>

                                <div style={{padding: '0 10px'}}>
                                    {/* 게시글 이미지 */}
                                    <img 
                                        src={post.articleImgSrc}
                                        style={{height: 496,  objectFit: 'cover', width: '100%', borderRadius: 25}}
                                    />
                                    {/* 제목, 날짜, 본문 */}
                                    <div style={{margin: '15px 0', paddingBottom: 30}} className="px-3">
                                        <h1 style={{fontWeight: 700, fontSize: 18, margin: '5px 0'}}>{post.articleTitle ? post.articleTitle : "제목이 없습니다."}</h1>
                                        <p style={{fontSize: 10, fontWeight: 400, margin: '10px 0', color: '#C4C4C4'}}>20{post.createdAt}기록</p>
                                        <div style={{border: '0.5px solid rgba(0, 0, 0, 0.15)', margin: '5px 0', opacity: .35}}></div>
                                        <p id="line-clamp" style={{fontWeight: 400, margin: '20px 0', lineHeight: 1.5, textOverflow: 'ellipsis', overflow: 'hidden'}}>{post.articleContent}asdsdasdsdasdsdasdsdasdsdasdsdasdsdasdsdasdsdasdsdasdsdasdsdasdsdasdsdasdsd</p>
                                    </div>
                                </div>
                            </article>
                        )
                    }
                    else {  // 내 게시글
                        if(post.articleTagArr && post.articleTagArr.length !== 0)
                            hashTagArr = '@' + post.articleTagArr.join(' @');
                        return (
                            <article key={index} style={{height: 760, backgroundColor: "#fff"}}>
                                {/* 형용사, 직업, 닉네임 */}
                                <div 
                                    className="flex flex-row items-center cursor-pointer" 
                                    onClick={() => history.push('/my-profile')}
                                >
                                    <img style={{width: 32, height: 32, margin: '20px 10px', borderRadius: 16}} src={profileImgSrc} alt="profile" />
                                    <h1 style={{margin: 0, fontWeight: 700, fontSize: 14}}>{adj} {job} <span style={{fontWeight: 400, fontSize: 14}}>{displayNameInUser}</span></h1>
                                </div>

                                <div style={{padding: '0 10px', backgroundColor: "#fff"}}>
                                    {/* 게시글 이미지 */}
                                    <img 
                                        src={post.articleImgSrc}
                                        style={{height: 496,  objectFit: 'cover', width: '100%', borderRadius: 25}}
                                    />
                                    {/* 제목, 날짜, 본문 */}
                                    <div style={{margin: '15px 0', paddingBottom: 30}} className="px-3">
                                        <div className="flex flex-row justify-between">
                                            <div>
                                                <h1 style={{fontWeight: 700, fontSize: 18, margin: '5px 0'}}>{post.articleTitle ? post.articleTitle : "제목이 없습니다."}</h1>
                                                <p style={{fontSize: 10, fontWeight: 400, margin: '10px 0', color: '#C4C4C4'}}>20{post.createdAt}기록</p>
                                            </div>
                                            <div className="flex flex-row items-center justify-between">
                                                <div className="flex flex-col justify-center items-center mx-5">
                                                    <img 
                                                        style={{margin: '5px 0', cursor: 'pointer'}}
                                                        src="/UI/heart.svg"
                                                        alt="heart"
                                                    />
                                                    <p style={{color: "#585858", fontSize: 13, fontWeight: 300}}>123</p>
                                                </div>
                                                <img 
                                                    onClick={() => {setSettingClicked(true); setSelectedPostId(post.postId)}}
                                                    style={{padding: 10, cursor: 'pointer'}}
                                                    src="/UI/ellipsis-vertical.svg"
                                                    alt="ellipsis"
                                                />
                                            </div>
                                        </div>    
                                        <div style={{border: '0.5px solid rgba(0, 0, 0, 0.15)', margin: '5px 0', opacity: .35}}></div>
                                        <p id="line-clamp" style={{fontWeight: 400, margin: '20px 0', lineHeight: 1.5, textOverflow: 'ellipsis', overflow: 'hidden'}}>{post.articleContent}<span style={{color: "#7C7C7C", cursor: 'pointer'}}>...더보기</span></p>
                                    </div>
                                </div>
                            </article>
                        )
                    }
                }))}

                {isLoading && (
                    <section style={{height: 100}} className="flex flex-row justify-center">
                        <Spinner 
                            color="#ccc"
                        />
                    </section>
                )}
            </div>
        )
    }else {
        contents = (
            <div style={{minHeight: '100vh', height: '110%', backgroundColor: "#fff"}}>
                {isLoadingFriend ? (
                    <div style={{maxheight: 1000, backgroundColor: "#fff"}}>
                        <div style={{padding: 10}} className="flex px-5 py-5 flex-col items-center">
                            <Placeholder style={{width: '95%'}}>
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                            </Placeholder>
                            <Placeholder style={{ height: 491, width: '95%' }}>
                                <Placeholder.Image />
                            </Placeholder>
                            <Placeholder style={{width: '95%'}}>
                                <Placeholder.Line length='short' />
                                <Placeholder.Line length='very short' />
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='long' />
                            </Placeholder>
                        </div>
                    </div>
                ) : (
                articleObjInFriend[interest] && articleObjInFriend[interest].map((post, index) => {
                    let hashTagArr = ''; // 수정) 일단 배열말고 문자열로 해놓음.
                    if(((pageNum+1) * 8) === index+1) { // 마지막 게시물일 때
                        if(post.articleTagArr && post.articleTagArr.length !== 0)
                            hashTagArr = '@' + post.articleTagArr.join(' @');
                        return (
                            <article ref={lastArticleRef} key={index} style={{height: 800, backgroundColor: "#fff"}}>
                                {/* 형용사, 직업, 닉네임 */}
                                <div 
                                    className="flex flex-row items-center cursor-pointer" 
                                    onClick={() => history.push('/friend-profile')}
                                >
                                    <img style={{width: 32, height: 32, margin: '20px 10px', borderRadius: 16}} src={profileImgSrc_f} alt="profile" />
                                    <h1 style={{margin: 0, fontWeight: 700, fontSize: 14}}>{adj_f} {job_f} <span style={{fontWeight: 400, fontSize: 14}}>{displayNameInFriend}</span></h1>
                                </div>

                                <div style={{padding: '0 10px'}}>
                                    {/* 게시글 이미지 */}
                                    <img 
                                        src={post.articleImgSrc}
                                        style={{height: 496, objectFit: 'cover', width: '100%', borderRadius: 25}}
                                    />
                                    {/* 제목, 날짜, 본문 */}
                                    <div style={{margin: '15px 0', paddingBottom: 30}} className="px-3">
                                        <h1 style={{fontWeight: 700, fontSize: 18, margin: '5px 0'}}>{post.articleTitle ? post.articleTitle : "제목이 없습니다."}</h1>
                                        <p style={{fontSize: 10, fontWeight: 400, margin: '10px 0', color: '#C4C4C4'}}>20{post.createdAt}기록</p>
                                        <div style={{border: '0.5px solid rgba(0, 0, 0, 0.15)', margin: '5px 0', opacity: .35}}></div>
                                        <p id="line-clamp" style={{fontWeight: 400, margin: '20px 0', lineHeight: 1.5, textOverflow: 'ellipsis', overflow: 'hidden'}}>{post.articleContent}</p>
                                    </div>
                                </div>
                            </article>
                        )
                    }
                    else {
                        if(post.articleTagArr && post.articleTagArr.length !== 0)
                            hashTagArr = '@' + post.articleTagArr.join(' @');
                        return (
                            <article key={index} style={{height: 800, backgroundColor: "#fff"}}>
                                {/* 형용사, 직업, 닉네임 */}
                                <div 
                                    className="flex flex-row items-center cursor-pointer" 
                                    onClick={() => history.push('/friend-profile')}
                                >
                                    <img style={{width: 32, height: 32, margin: '20px 10px', borderRadius: 16}} src={profileImgSrc_f} alt="profile" />
                                    <h1 style={{margin: 0, fontWeight: 700, fontSize: 14}}>{adj_f} {job_f} <span style={{fontWeight: 400, fontSize: 14}}>{displayNameInFriend}</span></h1>
                                </div>

                                <div style={{padding: '0 10px'}}>
                                    {/* 게시글 이미지 */}
                                    <img 
                                        src={post.articleImgSrc}
                                        style={{height: 496, objectFit: 'cover', width: '100%', borderRadius: 25}}
                                    />
                                    {/* 제목, 날짜, 본문 */}
                                    <div style={{margin: '15px 0', paddingBottom: 30}} className="px-3">
                                        <h1 style={{fontWeight: 700, fontSize: 18, margin: '5px 0'}}>{post.articleTitle ? post.articleTitle : "제목이 없습니다."}</h1>
                                        <p style={{fontSize: 10, fontWeight: 400, margin: '10px 0', color: '#C4C4C4'}}>20{post.createdAt}기록</p>
                                        <div style={{border: '0.5px solid rgba(0, 0, 0, 0.15)', margin: '5px 0', opacity: .35}}></div>
                                        <p id="line-clamp" style={{fontWeight: 400, margin: '20px 0', lineHeight: 1.5, textOverflow: 'ellipsis', overflow: 'hidden'}}>{post.articleContent}</p>
                                    </div>
                                </div>
                            </article>
                        )
                    }
                }))}

                {isLoadingFriend && (
                    <section style={{height: 100}} className="flex flex-row justify-center">
                        <Spinner 
                            color="#ccc"
                        />
                    </section>
                )}
            </div>
        )
    }

    return (
        <Layout>
            <nav id="fixedNav" style={{height: '60px', position: 'fixed', backgroundColor: "#fff", borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                <img
                    onClick={() => history.goBack()} 
                    style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                    src="/arrow-back-outline.svg"
                    alt="back"
                />
                <p style={{textAlign: 'center', width: '100%', marginRight: 35}}>{displayName || displayNameInFriend}의 {interest}</p>
            </nav>
            <div style={{marginTop: 60, height: '120%'}}>
                {contents}
            </div>
            
            {/* Drawer */}
            <Drawer show={settingClicked} clicked={() => {setSettingClicked(false); setSettingType(null)}} type="setting">
                {settingType === null && (
                    <>
                        <section className="flex flex-col justify-between mx-5 my-3">
                            <img 
                                onClick={() => setSettingClicked(false)}
                                style={{width: 20, height: 20, alignSelf: 'flex-end'}}
                                className="cursor-pointer"
                                src="/close-outline.svg"
                                alt="close"
                            />
                        </section>
                        <section className="mt-5 mb-10 flex flex-col items-start mx-5">
                            <p onClick={() => {setSettingType('delete')}} style={{fontSize: 18, fontWeight: 300, width: '100%', textAlign: 'left', cursor: 'pointer'}}>삭제</p>
                            <p onClick={() => {setSettingType('update')}} style={{fontSize: 18, fontWeight: 300, width: '100%', textAlign: 'left', cursor: 'pointer'}}>수정</p>
                            <p onClick={() => {setSettingType('hide')}} style={{fontSize: 18, fontWeight: 300, width: '100%', textAlign: 'left', cursor: 'pointer'}}>숨김</p>
                        </section>
                    </>
                )}
                {settingType === 'delete' && (
                    <>
                        <section className="flex flex-col justify-between mx-5 mt-10">
                            <p style={{fontSize: 24, margin: '5px 0', fontWeight: 'lighter'}}>게시물을 삭제할까요?</p>
                            <p style={{fontSize: 15, margin: '5px 0', fontWeight: 'lighter'}}>삭제 후 되돌릴수 없어요.</p>
                        </section>
                        <section className="mt-5 mb-10 flex flex-row items-center justify-center mx-5">
                            <button onClick={() => {setSettingClicked(false); setSettingType(null);}} style={{backgroundColor: "#D9D9D9", borderRadius: 23, padding: '10px 25px', margin: '0 10px', color: "black", outline: 'none'}}>취소</button>
                            <button onClick={() => {setSettingClicked(false); setSettingType(null); deletePostHandler(selectedPostId)}} style={{backgroundColor: "black", borderRadius: 23, padding: '10px 25px', margin: '0 10px', color: "#fff", outline: 'none'}}>삭제</button>
                        </section>
                    </>
                )}
                {settingType === 'hide' && (
                    <>
                        <section className="flex flex-col justify-between mx-5 mt-10">
                            <p style={{fontSize: 24, margin: '5px 0', fontWeight: 'lighter'}}>게시물을 숨길까요?</p>
                            <p style={{fontSize: 15, margin: '5px 0', fontWeight: 'lighter'}}>숨김 후 되돌릴 수 없어요.</p>
                        </section>
                        <section className="mt-5 mb-10 flex flex-row items-center justify-center mx-5">
                            <button onClick={() => {setSettingClicked(false); setSettingType(null)}} style={{backgroundColor: "#D9D9D9", borderRadius: 23, padding: '10px 25px', margin: '0 10px', color: "black", outline: 'none'}}>취소</button>
                            <button onClick={() => {setSettingClicked(false); setSettingType(null)}} style={{backgroundColor: "black", borderRadius: 23, padding: '10px 25px', margin: '0 10px', color: "#fff", outline: 'none'}}>숨김</button>
                        </section>
                    </>
                )}
                {settingType === 'update' && <p>hi</p>}
            </Drawer>
        </Layout>
    )
}

export default ArticleDetail;