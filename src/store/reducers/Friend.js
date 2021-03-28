import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    loading: null,
    error: null,
    errCode: null,
    // Friend's data
    userId: null,
    isPublic: null,
    isGraduate: null,
    displayNameInFriend: null,
    gender: null,
    univInFriend: null,
    age: null,
    job: null,
    adj: null,
    location: null,
    lat: null,
    lng: null,
    interestArr: [],
    articleImgSrc: null,
    articleText: null,
    articleInterestArr: [],
    articleTagArr: [],
    introText: null,
    profileImgSrc: null,
    resume: null,
    workPlace: null,
    // Friend's article
    articleObjInFriend: {},
    articleIsLoading: null,
    // detail article
    hasMoreArticle: true,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_FRIEND_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.GET_FRIEND_SUCCESS:
            const { userId, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, location, age, resume, workPlace, introText, interestArr } = action.payload;
            return {
                ...state,
                loading: false,
                userId,
                profileImgSrc,
                adj,
                job,
                displayNameInFriend: displayName,
                gender,
                univInFriend: university,
                isGraduate,
                isPublic,
                location,
                age,
                resume,
                workPlace,
                introText,
                interestArr
            }
        case actionTypes.GET_FRIEND_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actionTypes.GET_FRIEND_INIT:
            return {
                ...state,
                loading: null,
                error: null,
                articleIsLoading: null,
                articleObjInFriend: {},
            }
        case actionTypes.GET_FRIEND_ARTICLE_START:
            return {
                ...state,
                articleIsLoading: true,
            }
        case actionTypes.GET_FRIEND_ARTICLE_SUCCESS:
            const { interest, articleDataArr } = action;
            if(articleDataArr === null) // 해당 관심사의 article이 없을 때
                return {
                    ...state,
                    articleIsLoading: false,
                };
            const newArticleArr = JSON.parse(JSON.stringify(state.articleObjInFriend)) //깊은복사
            newArticleArr[interest] = [];
            articleDataArr.map(el => {
                newArticleArr[interest].push({
                    articleImgSrc: el.articleImgSrc,
                    articleContent: el.articleContent
                })
            });
            return {
                ...state,
                articleIsLoading: false,
                articleObjInFriend: newArticleArr,
            }
        case actionTypes.GET_FRIEND_ARTICLE_FAIL:
            return {
                ...state,
                articleIsLoading: false,
                error: true
            }
        case actionTypes.GET_FRIEND_ARTICLE_INIT:
            return {
                ...state,
                articleIsLoading: null,
                error: null
            }
        case actionTypes.GET_FRIEND_INTEREST_ARTICLE_DETAIL_START:
            return {
                ...state,
                articleIsLoading: true
            }
        case actionTypes.GET_FRIEND_INTEREST_ARTICLE_DETAIL_SUCCESS:
            const _interest = action.interest;
            const dataArr = action.articleDataArr; // 최신순으로 배열에 담김
            const hasMoreArticle = action.hasMoreArticle;
            
            let newArticleObj = JSON.parse(JSON.stringify(state.articleObjInFriend)); //깊은복사
            console.log(newArticleObj);
            newArticleObj[_interest] = newArticleObj[_interest].map((el, id) => {
                return {
                    ...el,
                    postId: dataArr[id].postId,
                    createdAt: dataArr[id].createdAt,
                    articleImgSrc: dataArr[id].articleImgSrcs[0],
                    articleTitle: dataArr[id].articleTitle,
                    articleTagArr: dataArr[id].extraHashtags,
                }
            })
            return {
                ...state,
                articleIsLoading: false,
                error: false,
                articleObjInFriend: newArticleObj,
                hasMoreArticle: hasMoreArticle
            }
        case actionTypes.GET_FRIEND_INTEREST_ARTICLE_DETAIL_FAIL:
            return {
                ...state,
                articleIsLoading: false,
                error: true,
            }
        case actionTypes.GET_FRIEND_INTEREST_ARTICLE_DETAIL_INIT:
            return {
                ...state,
                error: null,
                articleIsLoading: null
            }
        
        default:
            return state;
    }
}

export default reducer;