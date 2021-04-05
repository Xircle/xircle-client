import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    loading: null,
    error: null,
    errCode: null,
    // data
    token: null,
    _myUserId: null,
    isPublic: null,
    isGraduate: null,
    isLocationPublic: null,
    displayNameInUser: null,
    gender: null,
    univInUser: null,
    age: null,
    job: null,
    adj: null,
    location: null,
    latitude: null,
    longitude: null,
    interestArr: [],
    // 사전신청때 받은 article 사진, 관심사, 태그, 글 
    articleImgSrc: null,
    articleTitle: null,
    articleText: null,
    articleInterestArr: [],
    articleTagArr: [],
    introText: null,
    profileImgSrc: null,
    resume: null,
    workPlace: null,
    // article
    myUserId: null,
    articleObjInMyProfile: {},
    articleIsLoading: null,
    hasMoreArticle: true,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_PROFILE_IMG_SRC:
            return {
                ...state,
                profileImgSrc: action.profileImgSrc
            }
        case actionTypes.ADD_PHONE_NUMBER:
            return {
                ...state,
                phoneNumber: action.phoneNumber
            }
        case actionTypes.ADD_IS_PUBLIC:
            return {
                ...state,
                isPublic: action.isPublic
            }
        case actionTypes.ADD_IS_GRADUATE:
            return {
                ...state,
                isGraduate: action.isGraduate
            }
        case actionTypes.ADD_IS_LOCATION_PUBLIC:
            return {
                ...state,
                isLocationPublic: action.isLocationPublic
            }
        case actionTypes.ADD_DISPLAY_NAME:
            return {
                ...state,
                displayNameInUser: action.displayNameInUser
            }
        case actionTypes.ADD_GENDER:
            return {
                ...state,
                gender: action.gender
            }
        case actionTypes.ADD_UNIV:
            return {
                ...state,
                univInUser: action.univ
            }
        case actionTypes.ADD_AGE:
            return {
                ...state,
                age: action.age
            }
        case actionTypes.ADD_JOB:
            return {
                ...state,
                job: action.job
            }
        case actionTypes.ADD_ADJ:
            return {
                ...state,
                adj: action.adj
            }
        case actionTypes.ADD_LOCATION:
            return {
                ...state,
                location: action.location,
                latitude: action.latitude,
                longitude: action.longitude,
            }
        case actionTypes.ADD_RESUME:
            return {
                ...state,
                resume: action.resume
            }
        case actionTypes.ADD_WORKPLACE:
            return {
                ...state,
                workPlace: action.workPlace
            }
        case actionTypes.ADD_INTEREST:
            return {
                ...state,
                interestArr: action.interestArr
            }
        case actionTypes.ADD_ARTICLE_CONTENTS:
            return {
                ...state,
                articleTitle: action.articleTitle,
                articleText: action.articleText,
                articleInterestArr: action.articleInterestArr,
                articleTagArr: action.articleTagArr
            }
        case actionTypes.ADD_INTRO_TEXT:
            return {
                ...state,
                introText: action.introText
            }
        case actionTypes.SUBMIT_TO_SERVER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SUBMIT_TO_SERVER_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                errCode: action.errCode
            }
        case actionTypes.SUBMIT_TO_SERVER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            }
        case actionTypes.SUBMIT_TO_SERVER_INIT:
            return {
                ...state,
                loading: null,
                error: null
            }
        case actionTypes.UPDATE_PROFILE_IMG:
            return {
                ...state,
                profileImgSrc: action.updatedProfileImg
            }
        case actionTypes.GET_USER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token
            }
        case actionTypes.GET_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actionTypes.GET_INTEREST_ARTICLE_START:
            return {
                ...state,
                articleIsLoading: true
            }
        case actionTypes.GET_INTEREST_ARTICLE_SUCCESS:
            const { interest, articleDataArr, myUserId } = action;
            if(articleDataArr === null) // 해당 관심사의 article이 없을 때
                return {
                    ...state,
                    articleIsLoading: false,
                };
            
            let newArticleArr = JSON.parse(JSON.stringify(state.articleObjInMyProfile)) //깊은복사
            
            newArticleArr[interest] = [];
            articleDataArr.map(el => {
                newArticleArr[interest].push({
                    articleImgSrc: el.articleImgSrc,
                    articleTitle: el.articleTitle,
                })
            });
            return {
                ...state,
                articleIsLoading: false,
                articleObjInMyProfile: newArticleArr,
                myUserId,
            }
        case actionTypes.GET_INTEREST_ARTICLE_FAIL:
            return {
                ...state,
                articleIsLoading: false,
                error: true,
            }
        case actionTypes.GET_INTEREST_ARTICLE_INIT:
            return {
                ...state,
                error: null,
                articleIsLoading: null
            }
        case actionTypes.GET_INTEREST_ARTICLE_DETAIL_START:
            return {
                ...state,
                articleIsLoading: true
            }
        case actionTypes.GET_INTEREST_ARTICLE_DETAIL_SUCCESS:
            const my_interest = action.interest;
            const dataArr = action.articleDataArr; // 최신순으로 배열에 담김
            const hasMoreArticle = action.hasMoreArticle;
            
            let newArticleObj = JSON.parse(JSON.stringify(state.articleObjInMyProfile)); //깊은복사
            
            newArticleObj[my_interest] = newArticleObj[my_interest].map((el, id) => {
                return {
                    ...el,
                    postId: dataArr[id].postId,
                    createdAt: dataArr[id].createdAt,
                    articleImgSrc: dataArr[id].articleImgSrcs[0],
                    articleTitle: dataArr[id].articleTitle,
                    articleContent: dataArr[id].content,
                    articleTagArr: dataArr[id].extraHashtags,
                }
            })
            return {
                ...state,
                articleIsLoading: false,
                error: false,
                articleObjInMyProfile: newArticleObj,
                hasMoreArticle: hasMoreArticle
            }
        case actionTypes.GET_INTEREST_ARTICLE_DETAIL_FAIL:
            return {
                ...state,
                articleIsLoading: false,
                error: true,
            }
        case actionTypes.GET_INTEREST_ARTICLE_DETAIL_INIT:
            return {
                ...state,
                error: null,
                articleIsLoading: null
            }
        case actionTypes.CREATE_NEW_ARTICLE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CREATE_NEW_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
            }
        case actionTypes.CREATE_NEW_ARTICLE_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case actionTypes.CREATE_NEW_ARTICLE_INIT:
            return {
                ...state,
                error: null,
                loading: null,
            }
        case actionTypes.UPDATE_PROFILE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
            }
        case actionTypes.UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case actionTypes.UPDATE_PROFILE_INIT:
            return {
                ...state,
                error: null,
                loading: null,
            }
        case actionTypes.DELETE_MY_ARTICLE_START:
            return {
                ...state,
                articleIsLoading: true
            }
        case actionTypes.DELETE_MY_ARTICLE_SUCCESS:
            let interest1 = action.interest;
            const postId = action.postId;
            if(interest1 === '술_맛집탐방')
                interest1 = '술/맛집탐방';

            // for articleObjInMyProfile (delete article)
            const prevArticleArr = state.articleObjInMyProfile; // 실제 객체 데이터
            let newArticleArr1 = JSON.parse(JSON.stringify(state.articleObjInMyProfile)) //깊은복사
            let idx = prevArticleArr[interest1].findIndex(article => article.postId === postId);
            newArticleArr1[interest1].splice(idx, 1);

            // for interestArr (-1 activity)
            const prevInterestArr = state.interestArr; // 실제 객체 데이터
            let newInterestArr = JSON.parse(JSON.stringify(state.interestArr)) //깊은복사
            idx = prevInterestArr.findIndex(el => el.interest === interest1);
            console.log(prevInterestArr, prevInterestArr[idx]);
            newInterestArr.splice(idx, 1, {
                ...prevInterestArr[idx],
                activity: prevInterestArr[idx].activity - 1
            });
            return {
                ...state,
                error: false,
                articleIsLoading: false,
                interestArr: newInterestArr,
                articleObjInMyProfile: newArticleArr1,
            }
        case actionTypes.DELETE_MY_ARTICLE_FAIL:
            return {
                ...state,
                articleIsLoading: false,
                error: true,
            }
        case actionTypes.DELETE_MY_ARTICLE_INIT:
            return {
                ...state,
                error: null,
                articleIsLoading: null,
            }
        case actionTypes.EDIT_MY_ARTICLE_START:
            return {
                ...state,
                articleIsLoading: true
            }
        case actionTypes.EDIT_MY_ARTICLE_SUCCESS:
            let { articleTitle, articleContent, articleInterest} = action.data;
            let { originalInterest } = action;
            const postId2 = action.postId;
            
            if(articleInterest === '술_맛집탐방') articleInterest = '술/맛집탐방';

            // Immutable state
            let newArticleArr2 = JSON.parse(JSON.stringify(state.articleObjInMyProfile)) //깊은복사
            let idx2 = newArticleArr2[originalInterest].findIndex(article => article.postId === postId2);

            // 만약 다른 관심사면, 기존의 배열에서 지우고, 새로운 관심사에 추가
            if(originalInterest === articleInterest) { // 같으면 수정만
                newArticleArr2[originalInterest].splice(idx2, 1, {
                    ...newArticleArr2[originalInterest][idx2],
                    articleTitle,
                    articleContent,
                })
            }else { // 다르면 지우고, 다른 배열에 추가
                const originalArticleData = newArticleArr2[originalInterest][idx2];
                newArticleArr2[originalInterest].splice(idx2, 1);

                if(newArticleArr2[articleInterest] === undefined)  // 기존에 없는 관심사면 []로 만들고
                    newArticleArr2[articleInterest] = [];
                newArticleArr2[articleInterest].push({
                    ...originalArticleData,
                    articleTitle,
                    articleContent
                });   
            }
            return {
                ...state,
                articleIsLoading: false,
                articleObjInMyProfile: newArticleArr2,
            }
        case actionTypes.EDIT_MY_ARTICLE_FAIL:
            return {
                ...state,
                articleIsLoading: false,
            }
        case actionTypes.EDIT_MY_ARTICLE_INIT:
            return {
                ...state,
                articleIsLoading: null,
            }

        default:
            return state
    }
}

export default reducer;