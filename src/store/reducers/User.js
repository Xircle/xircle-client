import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: null,
    error: null,
    gender: null,
    job: null,
    adj: null,
    location: null,
    articleImgSrc: null,
    articleText: null,
    displayName: null,
    interestArr: [],
    introText: null,
    profileImgSrc: null,
    instagramId: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_GENDER:
            return {
                ...state,
                gender: action.gender
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
                location: action.location
            }
        case actionTypes.ADD_ARTICLE_IMGSRC:
            return {
                ...state,
                articleImgSrc: action.articleImgSrc
            }
        case actionTypes.ADD_ARTICLE_TEXT:
            return {
                ...state,
                articleText: action.articleText
            }
        case actionTypes.DISPLAYNAME_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.DISPLAYNAME_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case actionTypes.DISPLAYNAME_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
            }
        case actionTypes.ADD_INTRO_TEXT:
            return {
                ...state,
                introText: action.introText
            }
        case actionTypes.ADD_PROFILE_IMG_SRC:
            return {
                ...state,
                profileImgSrc: action.profileImgSrc
            }
        case actionTypes.ADD_INSTA_ID:
            return {
                ...state,
                instaId: action.instaId
            }
        default:
            return state
    }
}

export default reducer;