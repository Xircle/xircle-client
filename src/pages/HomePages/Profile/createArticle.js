// import React, {useState, useCallback, useRef} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Spinner from 'react-spinner-material';

// const CreateArticle = ({ history, questionNum }) => {
//     const [imgSrc, setImgSrc] = useState(null);
//     const [articleImgSrcFormData, setArticleImgSrcFormData] = useState(null);
    
//     const articleRef = useRef();
//     const articleInterestArr = useRef();
//     const questionNumer = Number(questionNum);
//     let contents = null;
  
//     const uploadPhoto = useCallback((event) => {
//         event.preventDefault();
//         // file을 읽을 reader 객체 생성
//         const files = event.target.files;
//         const __file = files[0];
//         const __size = files[0].size;

//         if(__size > 10000000) { // 10MB 이상이면 용량 제한
//             return alert("사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. ")
//         } 
//         // 미리보기용
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(__file);
//         fileReader.onload = e => {
//             setImgSrc(e.target.result);
//         }
//         // 서버 제출용
//         const formData = new FormData();
//         formData.append("img", __file);

//         setArticleImgSrcFormData(formData);
//     }, []);

//     if(questionNumer === 1) {
//         contents = (
//             <section className="min-h-screen text-center px-3 my-3 mb-10">
//                 <div className="px-3 py-5 mb-3">
//                     <p style={{fontSize: 18, fontWeight: 'bold', marginBottom: 18}} className="text-left">관심사에 맞는 자신의 이야기를 한가지만 사진과 함께 적어보세요! [사진] </p>
//                     <p style={{color: "#B3B3B3", textAlign: 'left'}}>ex.오늘 먹은 음식 / 오늘 한 스터디 </p>
//                 </div>
//                 <section className="mt-5">
//                     <div style={{position: 'relative'}}>
//                         <img 
//                             style={{width: 300, height: 300, margin: '0 auto', borderRadius: 180, objectFit: 'fill'}} 
//                             src={imgSrc ? imgSrc : "/camera.svg"} 
//                         />
//                         <input 
//                             style={{position: 'absolute', display: 'block', opacity: 0, top: 0, left: '50%', transform: 'translate(-50%, 0)', width: 300, height: 300, borderRadius: 150, cursor: 'pointer'}} 
//                             type="file" 
//                             accept="image/x-png,image/jpeg,image/gif"
//                             onChange={(e) => uploadPhoto(e)} 
//                         />
//                     </div>
//                     {isLoading ? (
//                         <>
//                             <div style={{height: 40, position: 'relative'}}>
//                                 <div className="flex flex-col items-center" style={{position: 'absolute', left: '50%', top: 10, transform: 'translate(-50%, 0)'}}>
//                                     <Spinner 
//                                         size={5}
//                                         color={"#aaa"}
//                                     />
//                                     <p style={{marginTop: 10, fontSize: 12, color: "#8D8D8D"}}>업로드 중입니다..</p>
//                                 </div>
//                             </div>
//                         </>
//                     ) : <div style={{height: 40}}></div>}
//                     <p style={{margin: '40px 0 0 5px', fontSize: 12, color: "#8D8D8D", textAlign: 'left'}}>최대 용량은 10MB입니다.</p>
//                     <button onClick={(e) => uploadBtnHandler(e)} className="mt-5 w-full rounded-xl px-5 py-3 bg-gray-400 text-white focus:outline-none">
//                         <p style={{wordBreak: "keep-all"}}>업로드 하기</p>
//                     </button>
                    
//                 </section>
//             </section>
//         )
//     }else if(questionNumer === 2) {
//         contents = (
//             contents = (
//                 <section className="text-center px-5 my-5">
//                     <img 
//                         src="/setting/airpod_banner.svg"
//                         alt="banner"
//                         width='100%'
//                         height='100%'
//                     />  
//                     <textarea 
//                         name="articleText"
//                         id="articleText"
//                         ref={articleRef}
//                         placeholder="첫 번째 글을 작성해 보세요. 비방/욕설은 삼가해주세요."
//                         style={{height: '250px', backgroundColor: "#F7F7FA", border: '1px solid #ccc'}}
//                         className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
//                     </textarea>
//                     <textarea
//                         id="articleTag"
//                         ref={articleInterestArr}
//                         placeholder="게시글 관심사 설정(필수사항) "
//                         value={defaultArticleHashTag}
//                         style={{height: '50px', color: "#4700FF", backgroundColor: "#F7F7FA", border: '1px solid #ccc'}}
//                         className="mt-5 px-3 py-5 w-full text-base placeholder-gray-300">
//                     </textarea>
//                     <section className="flex flex-row flex-wrap">
//                         {interestArrInRedux.map((interest, id) => (
//                             <div key={id} style={{width: 75, margin: '5px 2px 0', padding: '3px', border: '1px solid #D9D9D9', borderRadius: '30px', cursor: 'pointer'}}>
//                                 <p onClick={() => articleHashTagClickHandler(`${interest}`)} style={{fontSize: 12, color: "#8D8D8D"}}>@{interest}</p>
//                             </div>
//                         ))}
//                     </section>
//                     <textarea
//                         id="articleTag"
//                         placeholder="@태그하기 (선택사항)"
//                         ref={articleTagRef}
//                         style={{height: '50px', color: "#4700FF", backgroundColor: "#F7F7FA", border: '1px solid #ccc'}}
//                         className="mt-3 px-3 py-5 w-full text-base placeholder-gray-300">
//                     </textarea>
//                     <button onClick={(e) => articleSubmitHandler(e)} className="mt-5 w-full border-2 rounded-xl px-5 py-3 bg-black text-white focus:outline-none">
//                         다음
//                     </button>
//                 </section>
//             )
//         )
//     }
//     return (
//         <>
//             {contents}
//         </>
//     )
// }

// export default CreateArticle;
