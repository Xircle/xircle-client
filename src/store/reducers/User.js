import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    loading: null,
    error: null,
    errCode: null,
    // data
    token: null,
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
    articleObjInMyProfile: {},
    articleIsLoading: null,
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
            const { interest, articleDataArr } = action;
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
                    articleContent: el.articleContent,
                })
            });
            return {
                ...state,
                articleIsLoading: false,
                articleObjInMyProfile: newArticleArr,
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
        default:
            return state
    }
}

export default reducer;