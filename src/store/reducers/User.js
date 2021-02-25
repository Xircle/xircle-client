import * as actionTypes from '../actions/actionTypes';
import { submitToServer } from '../actions';

const initialState = {
    displayNameUI: {
        loading: null,
        error: null,
    },
    submitToServer: {
        loading: null,
        error: null
    },
    gender: null,
    age: null,
    job: null,
    adj: null,
    location: null,
    articleImgSrc: "something",
    articleText: null,
    displayName: null,
    interestArr: [],
    introText: null,
    profileImgSrc: null,
    instagramId: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_AGE:
            return {
                ...state,
                age: action.age
            }
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
        case actionTypes.ADD_LOCATION:
            return {
                ...state,
                interestArr: action.interestArr
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
                displayNameUI: {
                    ...state.displayNameUI,
                    loading: true
                }
            }
        case actionTypes.DISPLAYNAME_FAIL:
            return {
                ...state,
                displayNameUI: {
                    ...state.displayNameUI,
                    loading: false,
                    error: true
                }
            }
        case actionTypes.DISPLAYNAME_SUCCESS:
            return {
                ...state,
                displayName: action.displayName,
                displayNameUI: {
                    ...state.displayNameUI,
                    loading: false,
                    error: false
                }
            }
        case actionTypes.ADD_INTRO_TEXT:
            return {
                ...state,
                introText: action.introText
            }
        case actionTypes.ADD_PROFILE_IMG_SRC:
            return {
                ...state,
                profileImgSrc: action.ProfileImgSrc
            }
        case actionTypes.ADD_INSTA_ID:
            return {
                ...state,
                instagramId: action.instagramId
            }
        case actionTypes.SUBMIT_TO_SERVER_START:
            return {
                ...state,
                submitToServer: {
                    ...state.submitToServer,
                    loading: true
                }
            }
        case actionTypes.SUBMIT_TO_SERVER_FAIL:
            return {
                ...state,
                submitToServer: {
                    ...state.submitToServer,
                    loading: false,
                    error: true
                }
            }
        case actionTypes.SUBMIT_TO_SERVER_SUCCESS:
            return {
                ...state,
                submitToServer: {
                    ...state.submitToServer,
                    loading: false,
                    error: false
                }
            }
        case actionTypes.UPDATE_PROFILE_IMG:
            return {
                ...state,
                profileImgSrc: action.updatedProfileImg
            }
        default:
            return state
    }
}

export default reducer;