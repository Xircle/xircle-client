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
    articleInFriend: [],
    articleIsLoading: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_FRIEND_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.GET_FRIEND_SUCCESS:
            const { userId, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, location, age, resume, workPlace,  introText, interestArr } = action.payload;
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
                articleInFriend: [],
            }
        case actionTypes.GET_FRIEND_ARTICLE_START:
            return {
                ...state,
                articleIsLoading: true,
            }
        case actionTypes.GET_FRIEND_ARTICLE_SUCCESS:
            const { interest, articleContent, articleImgSrc } = action;

            const newArticleArr = JSON.parse(JSON.stringify(state.articleInFriend)) //깊은복사
            if(!articleContent || !articleImgSrc) { // 없으면 추가안함
                newArticleArr.push({
                    interest,
                });
                return {
                    ...state,
                    articleIsLoading: false,
                    articleInFriend: newArticleArr
                }
            }
            newArticleArr.push({
                interest,
                articleContent,
                articleImgSrc,
            })
            return {
                ...state,
                articleIsLoading: false,
                articleInFriend: newArticleArr,
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