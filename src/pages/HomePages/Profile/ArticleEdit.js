import React, {useCallback, useState, useRef, useEffect} from 'react';
import queryString from 'query-string';
import * as actions from '../../../store/actions/index';
import { useDispatch, useSelector} from 'react-redux';
import Layout from '../../../components/layout';
import Spinner from 'react-spinner-material';
import Modal from '../../../components/UI/modal';

const ArticleEdit = ({ location, history }) => {
    const query = queryString.parse(location.search);

    const [isSent, setIsSent] = useState(false);
    const [imgSrc, setImgSrc] = useState(query.articleImgSrc); // 이미지 뷰용
    const articleTitleRef = useRef(); // 게시글 제목
    const articleContentRef = useRef(); // 게시글 내용
    const [defaultArticleHashTag, setDefaultArticleHashTag] = useState('@' + query.interest);// 필수 관심사 택1
    const tokenInRedux = useSelector(store => store.user.token);
    const interestArrInRedux = useSelector(store => store.user.interestArr);
    const newProfileImgSrc = useSelector(store => store.user.newArticleImgSrc);
    const isLoading = useSelector(store => store.user.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!tokenInRedux)
            return window.location.href = '/my-profile';
    }, []);

    useEffect(() => {
        if(isSent) history.goBack();
    }, [isSent]);

    const articleHashTagClickHandler = useCallback((clickedHashTag) => {
        const newHashTag = '@' + clickedHashTag;

        setDefaultArticleHashTag(newHashTag);
    }, [defaultArticleHashTag]);
    
    const articleSubmitHandler = useCallback(async (event) => {
        event.preventDefault();
        // 1) article Title
        const articleTitleText = articleTitleRef.current.value;
        if(articleTitleText.length === 0)
            return alert("제목을 적어도 1자 이상은 작성해주세요.")
        // 2) article Content
        const articleContentText = articleContentRef.current.value;
        if(articleContentText.length < 3)
            return alert("본문내용을 적어도 3자 이상은 작성해주세요.")
        // 3-1) interest 
        if(defaultArticleHashTag.length < 1) 
            return alert("게시물 관심사를 적어도 하나 선택해주세요.");
        // 3-2) article defaultArticleHashTag @ 빼서 저장
        const newDefaultArticleHashTag = defaultArticleHashTag.replace('@', '');
        
        const data = {
            articleTitle: articleTitleText,
            articleContent: articleContentText,
            articleInterest: newDefaultArticleHashTag,
        };
        const articleImgSrcFormData = new FormData();
        articleImgSrcFormData.append('data', JSON.stringify(data));
        async function editStart() {
            const originalInterest = query.interest;
            dispatch(actions.editMyArticle(tokenInRedux, articleImgSrcFormData, data, originalInterest, query.postId));
        }
        await editStart();
        setIsSent(true);
    }, [defaultArticleHashTag]);

    return (
        <Layout footerNone>
            <nav id="fixedNav" style={{height: '60px', position: 'fixed', backgroundColor: "#fff", zIndex: 899, borderBottom: '1px solid #eee'}} className="flex flex-row items-center justify-between ">
                <img
                    onClick={() => history.goBack()} 
                    style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                    src="/arrow-back-outline.svg"
                    alt="back"
                />
                <p style={{textAlign: 'center', width: '100%', fontSize: 15, marginRight: 35}}>수정</p>
            </nav>

            <section style={{marginTop: 80}}></section>

            <section className="text-center px-5">
                <img 
                    src={imgSrc}
                    alt="articleImage"
                    style={{width: 82, height: 82, borderRadius: 11, objectFit: 'cover'}}
                />
                <textarea 
                    name="articleTitle"
                    ref={articleTitleRef}
                    placeholder="제목(필수)"
                    defaultValue={query.articleTitle}
                    style={{height: '50px', outline: 'none', fontWeight: 500, backgroundColor: "#fff", borderBottom: '1px solid rgba(0, 0, 0, 0.15)', overflow: 'hidden'}}
                    className="mt-5 px-3 py-5 w-full placeholder-gray-300">
                </textarea>
                <textarea 
                    name="articleContent"
                    id="articleText"
                    ref={articleContentRef}
                    defaultValue={query.articleContent}
                    placeholder="회원님의 활동을 기록하세요(필수)"
                    style={{height: '250px', borderRadius: 5, backgroundColor: "#F7F7FA"}}
                    className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
                </textarea>
                <textarea
                    id="articleInterest"
                    placeholder="게시물 관련 interest를 설정해주세요! (필수) "
                    value={defaultArticleHashTag}
                    style={{height: '50px', color: "#2F51F0", backgroundColor: "#F7F7FA", overflow: 'hidden'}}
                    className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
                </textarea>
                <section className="flex flex-row flex-wrap">
                    {interestArrInRedux.map((el, id) => (
                        <div key={id} style={{width: 75, margin: '5px 2px 0', padding: '3px', border: '1px solid #D9D9D9', borderRadius: '30px', cursor: 'pointer'}}>
                            <p onClick={() => articleHashTagClickHandler(`${el.interest}`)} style={{fontSize: 12, color: "#8D8D8D"}}>@{el.interest}</p>
                        </div>
                    ))}
                </section>
                {isLoading ? (
                    <>
                        <div style={{height: 80, position: 'relative'}}>
                            <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: 10, transform: 'translate(-50%, 0)'}}>
                                <Spinner 
                                    size={5}
                                    color={"#aaa"}
                                />
                                <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>업로드 중입니다..</p>
                            </div>
                        </div>
                    </>
                ) : <div style={{height: 0}}></div>}
                <button onClick={(e) => articleSubmitHandler(e)} className="mt-5 w-full border-2 rounded-xl px-5 py-3 bg-black text-white focus:outline-none">
                    수정하기
                </button>
            </section>
        </Layout>
    )
}

export default ArticleEdit;