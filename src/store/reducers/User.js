import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: null,
    error: null,
    errCode: null,
    // data
    isPublic: null,
    isGraduate: null,
    displayNameInUser: null,
    gender: null,
    univInUser: null,
    age: null,
    job: null,
    adj: null,
    location: null,
    lat: null,
    lng: null,
    interestArr: [],
    articleImgSrc: null,
    articleText: null,
    articleTag: null,
    introText: null,
    profileImgSrc: null,
    resume: null,
    workPlace: null,
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
                lng: action.lng,
                lat: action.lat,
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
        case actionTypes.SUBMIT_IMGSRC_TO_AWS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SUBMIT_IMGSRC_TO_AWS_SUCCESS:
            if(action.payloadType === "article") {
                return {
                    ...state,
                    loading: false,
                    error: false,
                    articleImgSrc: action.imgAwsUrl
                }
            }else {
                return {
                    ...state,
                    loading: false,
                    error: false,
                    profileImgSrc: action.imgAwsUrl
                }
            }
        case actionTypes.SUBMIT_IMGSRC_TO_AWS_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case actionTypes.SUBMIT_IMG_SRC_TO_AWS_INIT:
            return {
                ...state,
                loading: null,
                error: null,
            }
        case actionTypes.ADD_ARTICLE_TEXT:
            return {
                ...state,
                articleText: action.articleText
            }
        case actionTypes.ADD_ARTICLE_HASHTAG:
            return {
                ...state,
                articleTag: action.articleTag
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
                error: false,
                resume: action.resume,
                workPlace: action.workPlace,
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
            }
        case actionTypes.GET_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return state
    }
}

export default reducer;