import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    loading: null,
    error: null,
    errCode: null,
    // data
    token: null,
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
    // 사전신청때 받은 article 사진, 관심사, 태그, 글 
    articleImgSrc: null,
    articleText: null,
    articleInterestArr: [],
    articleTagArr: [],
    introText: null,
    profileImgSrc: null,
    resume: null,
    workPlace: null,
    // article
    articleInProfile: null,
    articleIsLoading: null,
}
// articleInProfile: {
//     "startUp": [
//         {
//             articleImgSrc,
//             articleContent
//         }
//         {
//             articleImgSrc,
//             articleContent
//         }
//     ],
//     "meat": []
// }


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
        case actionTypes.ADD_ARTICLE_CONTENTS:
            return {
                ...state,
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
                error: false,
                resume: action.resume,
                workPlace: action.workPlace,
                token: action.token,
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
            const { interest, articleContent, articleImgSrc } = action;
            // [ {articleImgSrc: "www", articleContent: "안녕~"}, {} ]
            const newArticleArr = JSON.parse(JSON.stringify(state.articleInProfile)) //깊은복사
            if(!articleContent || !articleImgSrc) { // 없으면 추가안함
                newArticleArr.push({
                    interest,
                });
                return {
                    ...state,
                    articleIsLoading: false,
                    articleInProfile: newArticleArr
                }
            }

            newArticleArr.push({
                interest,
                articleContent,
                articleImgSrc
            })
            return {
                ...state,
                articleIsLoading: false,
                articleInProfile: newArticleArr,
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
        default:
            return state
    }
}

export default reducer;