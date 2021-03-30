import React, {useState, useCallback, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'react-spinner-material';
import * as actions from '../../../store/actions/index';
import Layout from '../../../components/layout';
import ArticleBanner from '../../../components/Banner/articleBanner';
import { scrolltoTop } from '../../../components/scrolltoTop';

const CreateArticle = ({ history, match }) => {
    const [imgSrc, setImgSrc] = useState(null); // 이미지 뷰용
    const [articleImgSrcFormData, setArticleImgSrcFormData] = useState(null); // 이미지 서버 제출용
    
    const articleTitleRef = useRef(); // 게시글 제목
    const articleContentRef = useRef(); // 게시글 내용
    const [defaultArticleHashTag, setDefaultArticleHashTag] = useState('');// 필수 관심사 택1
    const articleTagRef = useRef(); // 게시글 해시태그
    
    
    const tokenInRedux = useSelector(store => store.user.token);
    const displayNameInRedux = useSelector(store => store.user.displayNameInUser);
    const interestArrInRedux = useSelector(store => store.user.interestArr);
    // const articleInProfile = useSelector(store => store.user.articleInProfile);
    const newProfileImgSrc = useSelector(store => store.user.newArticleImgSrc);
    const isLoading = useSelector(store => store.user.loading);
    const hasError = useSelector(store => store.user.error);
    const dispatch = useDispatch();

    const num = match.params.questionNum;
    const questionNumer = Number(num);

    let contents = null;
  
    useEffect(() => {
        scrolltoTop();
        const currentPath = window.location.pathname;
        switch(currentPath) {
            case '/createArticle/1':
                if(!displayNameInRedux)
                    return window.location.href = '/my-profile';
                else
                    return null;
            case '/createArticle/2':
                if(!imgSrc) 
                    return window.location.href = '/my-profile';
                else
                    return null;
            default:
                return null;
        }
    }, []);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if(currentPath === '/createArticle/1') {
            if(hasError) {
                console.log('cors 에러, 혹은 용량 문제');
                return alert("Something went wrong.");
            }else if(hasError === false)
                return history.push('/createArticle/2');
        }else {
            if(hasError) {
                console.log('에러 발생')
            }else if(hasError === false){
                return window.location.href = '/my-profile';
            }
        }
    }, [isLoading]);

    // createArticle/1
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
        formData.append("articleImgSrc", __file);

        setArticleImgSrcFormData(formData);
    }, []);

    const uploadBtnHandler = useCallback((event) => {
        event.preventDefault();
        if(!imgSrc)
            return alert("사진을 선택해주세요.")
        // /img 라우터로 formData 올려서 S3에 이미지 업로드하고, URL받기 위한 액션.
        history.push('/createArticle/2');
    }, [imgSrc]);

    // createArticle/2
    const articleHashTagClickHandler = useCallback((clickedHashTag) => {
        const newHashTag = '@' + clickedHashTag;

        setDefaultArticleHashTag(newHashTag);
    }, [defaultArticleHashTag]);

    const articleSubmitHandler = useCallback((event) => {
        event.preventDefault();
        // 1) article Title
        const articleTitleText = articleTitleRef.current.value;
        if(articleTitleText.length === 0)
            return alert("제목을 적어도 1자 이상은 작성해주세요.")

        // 2) article Content
        const articleContentText = articleContentRef.current.value;
        if(articleContentText.length < 3)
            return alert("본문내용을 적어도 3자 이상은 작성해주세요.")
        if(defaultArticleHashTag.length < 1) 
            return alert("게시물 관심사를 적어도 하나 선택해주세요.");
        
        // 3) article defaultArticleHashTag @ 빼서 저장
        const newDefaultArticleHashTag = defaultArticleHashTag.replace('@', '');
        
        const data = {
            articleTitle: articleTitleText,
            articleContent: articleContentText,
            articleInterest: newDefaultArticleHashTag,
        };

        if(articleTagRef.current.value) { // articleTagRef => "@hello @hi @무야호"
            const articleTagText = articleTagRef.current.value.trim();
            let articleTagArr = articleTagText.split(" ");  // articleTagArr = ["@hello", "@hi", "@무야호"]
            const hashTagRegex = /^@[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/;

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

            // 4) articleTagArr @ 빼서 저장 ['hello', 'hi', '무야호']
            const finalArticleTagArr = articleTagArr.map(tag => {
                return tag.replace('@', '');
            });

            data.articleTagArr = finalArticleTagArr;
        }
        articleImgSrcFormData.append('data', JSON.stringify(data));
        dispatch(actions.createNewArticle(tokenInRedux, articleImgSrcFormData));

    }, [defaultArticleHashTag, articleImgSrcFormData]);



    if(questionNumer === 1) {
        contents = (
            <section className="min-h-screen text-center px-5 my-3 mb-10">
                <ArticleBanner />
                <section className="mt-14">
                    <div style={{position: 'relative'}}>
                        {!imgSrc && (<p style={{color: "#D9D9D9", fontSize: 12, position: 'absolute',  top: '60%', left: '50%', transform: 'translate(-50%, -50%)',}}>회원님의 사진을 기록하세요</p>)}
                        <img 
                            style={{width: 350, height: 350, borderRadius: 17, margin: '0 auto', objectFit: 'cover'}} 
                            src={imgSrc ? imgSrc : "/profile/camera_square.svg"} 
                        />
                        <input 
                            style={{position: 'absolute', display: 'block', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 350, height: 350, cursor: 'pointer'}} 
                            type="file" 
                            accept="image/x-png,image/png,image/svg,image/jpeg,image/jpg,image/gif"
                            onChange={(e) => uploadPhoto(e)} 
                        />
                    </div>
                    <p style={{margin: '10px 0', padding: '0 5px', fontSize: 12, color: "#8D8D8D", textAlign: 'left'}}>최대 용량은 10MB입니다.</p>
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
                    <button onClick={(e) => uploadBtnHandler(e)} style={{backgroundColor: "#2F363E"}} className="mt-5 w-full rounded-lg px-5 py-3 text-white focus:outline-none">
                        <p style={{wordBreak: "keep-all"}}>다음</p>
                    </button>
                    <p style={{color: "#8D8D8D", textAlign: 'left', padding: '0 5px', margin: '10px 0', fontSize: 12}}>다음으로 넘기시면 글만 작성할 수 있어요!</p>
                    
                </section>
            </section>
        )
    }else if(questionNumer === 2) {
        contents = (
            contents = (
                <section className="text-center px-5 my-5">
                    <img 
                        src={imgSrc}
                        alt="articleImage"
                        style={{width: 82, height: 82, borderRadius: 11, objectFit: 'cover'}}
                    />
                    <textarea 
                        name="articleTitle"
                        ref={articleTitleRef}
                        placeholder="제목(필수)"
                        style={{height: '50px', outline: 'none', fontWeight: 500, backgroundColor: "#fff", borderBottom: '1px solid rgba(0, 0, 0, 0.15)', overflow: 'hidden'}}
                        className="mt-5 px-3 py-5 w-full placeholder-gray-300">
                    </textarea>
                    <textarea 
                        name="articleContent"
                        id="articleText"
                        ref={articleContentRef}
                        placeholder="회원님의 활동을 기록하세요(필수)"
                        style={{height: '250px', borderRadius: 5, backgroundColor: "#F7F7FA"}}
                        className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
                    </textarea>
                    <textarea
                        id="articleInterest"
                        placeholder="게시물 관련 interest를 설정해주세요! (필수) "
                        value={defaultArticleHashTag}
                        style={{height: '50px', color: "#4700FF", backgroundColor: "#F7F7FA", overflow: 'hidden'}}
                        className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
                    </textarea>
                    <section className="flex flex-row flex-wrap">
                        {interestArrInRedux.map((el, id) => (
                            <div key={id} style={{width: 75, margin: '5px 2px 0', padding: '3px', border: '1px solid #D9D9D9', borderRadius: '30px', cursor: 'pointer'}}>
                                <p onClick={() => articleHashTagClickHandler(`${el.interest}`)} style={{fontSize: 12, color: "#8D8D8D"}}>@{el.interest}</p>
                            </div>
                        ))}
                    </section>
                    <textarea
                        id="articleTag"
                        placeholder="@태그 해주세요(선택)"
                        ref={articleTagRef}
                        style={{height: '50px', color: "#4700FF", backgroundColor: "#F7F7FA", overflow: 'hidden'}}
                        className="mt-3 px-3 py-5 w-full text-base placeholder-gray-300">
                    </textarea>
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
                        업로드하기
                    </button>
                </section>
            )
        )
    }
    return (
        <div className="overflow-x-hidden">
            <Layout num={num} headerNone footerNone>
                <nav style={{height: '60px'}} className="flex flex-row items-center justify-between ">
                    <img
                        onClick={() => history.goBack()} 
                        style={{width: '25px', height: '25px', marginLeft: 10, cursor: 'pointer'}}
                        src="/arrow-back-outline.svg"
                        alt="back"
                    />
                </nav>

                {contents}
            </Layout>
        </div>
    )
}

export default CreateArticle;
