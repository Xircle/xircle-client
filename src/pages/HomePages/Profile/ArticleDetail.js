import React, {useState, useCallback, useEffect} from 'react';
import Layout from '../../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Placeholder, Card } from 'semantic-ui-react';
const ArticleDetail = ({ history, match }) => { //postNum 최신부터 0 ~ n
    const [displayName, setDisplayName] = useState();
    const [who, _] = useState(match.params.who);
    const [interest, setInterest] = useState(match.params.interest);
    const [postNum, __] = useState(match.params.postNum);

    // User store
    const { token, displayNameInUser, articleObjInMyProfile, job, adj, profileImgSrc } = useSelector(store => store.user);
    // Friend store
    const userId = useSelector(store => store.friend.userId);
    const displayNameInFriend = useSelector(store => store.friend.displayNameInFriend);
    const articleObjInFriend = useSelector(store => store.friend.articleObjInFriend);
    const job_f = useSelector(store => store.friend.job);
    const adj_f = useSelector(store => store.friend.adj);
    const profileImgSrc_f = useSelector(store => store.friend.profileImgSrc);
    const isLoading = useSelector(store => store.user.articleIsLoading);
    const dispatch = useDispatch();

    // 리다이렉션 | 스크롤(pageNum)
    useEffect(() => {
        if(!displayNameInUser)
            return window.location.href = '/my-profile';
        else {
            if(displayNameInUser.indexOf('@') !== -1) // @가 포함된다면
                setDisplayName(displayNameInUser.replace('@', ''))
        }
        // scrollTo depeding on 'postNum'

    }, []);

    // http 게시글 요청 | 재요청 방지
    useEffect(() => {
        // http 재요청 방지
        if(who === 'my') {
            if(articleObjInMyProfile[interest][0].postId)
                return null;
        }else {
            if(articleObjInFriend[interest][0].postId)
                return null;
        }

        dispatch(actions.getInterestArticleDetail(token, interest));        
    }, [articleObjInMyProfile, articleObjInFriend]);

    return (
        <Layout>
            <nav style={{height: '60px', borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                <img
                    onClick={() => history.goBack()} 
                    style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                    src="/arrow-back-outline.svg"
                    alt="back"
                />
                <p style={{textAlign: 'center', width: '100%', marginRight: 35}}>{displayName}의 {interest}</p>
            </nav>
            <div style={{minHeight: '100vh', backgroundColor: isLoading ? "#fff" : "#F7F7FA"}}>
                {isLoading ? (
                    <div style={{borderRadius: 25, maxheight: 1000, backgroundColor: "#fff"}}>
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
                    articleObjInMyProfile[interest] && articleObjInMyProfile[interest].map((post, id) => (
                    <article key={id} style={{borderRadius: 25, maxheight: 1000, backgroundColor: "#fff"}}>
                        {/* 형용사, 직업, 닉네임 */}
                        <div 
                            className="flex flex-row items-center cursor-pointer" 
                            onClick={() => {
                                if(who === 'my')
                                    history.push('/my-profile')
                                else 
                                    history.push('/friend-profile')
                            }}
                        >
                            <img style={{width: 32, height: 32, margin: '20px 10px', borderRadius: 16}} src={profileImgSrc} alt="profile" />
                            <h1 style={{margin: 0, fontWeight: 700, fontSize: 14}}>{adj} {job} <span style={{fontWeight: 400, fontSize: 14}}>{displayNameInUser}</span></h1>
                        </div>

                        <div style={{padding: '0 10px'}}>
                            {/* 게시글 이미지 */}
                            <img 
                                src={post.articleImgSrc}
                                style={{height: 496,  objectFit: 'cover', borderRadius: 25}}
                            />
                            {/* 제목, 날짜, 본문 */}
                            <div style={{margin: '30px 0', paddingBottom: 30}} className="px-3">
                                <h1 style={{fontWeight: 700, fontSize: 18, margin: '5px 0'}}>{post.articleTitle}</h1>
                                <p style={{fontSize: 10, fontWeight: 400, margin: '10px 0', color: '#C4C4C4'}}>{post.createdAt}</p>
                                <div style={{border: '0.5px solid rgba(0, 0, 0, 0.15)'}}></div>
                                <p style={{fontWeight: 400, margin: '20px 0', lineHeight: 1.5}}>{post.articleContent}</p>
                                <p style={{fontSize: 13, margin: '30px 0', color: "#3f729b"}}>{post.articleTagArr}</p>
                            </div>
                        </div>
                    </article>
                )))}
                
                <section style={{height: 100}}>

                </section>
            </div>
        </Layout>
    )
}

export default ArticleDetail;