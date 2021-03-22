import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    loading: null,
    error: null,
    errCode: null,
    // data
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
    // article
    articleObjInFriend: {},
    articleIsLoading: null,
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
            console.log(newArticleArr)
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
        
        default:
            return state;
    }
}

export default reducer;