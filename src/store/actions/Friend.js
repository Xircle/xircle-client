import * as actionTypes from './actionTypes';
import { Axios } from '../../axios-instance';

export const getFriendStart = () => {
    return {
        type: actionTypes.GET_FRIEND_START,
    }
}
export const getFriendSuccess = (userId, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, location, age, resume, workPlace,  introText, interestArr) => {
    return {
        type: actionTypes.GET_FRIEND_SUCCESS,
        payload: { userId, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, location, age, resume, workPlace,  introText, interestArr }
    }
}
export const getFriendFail = () => {
    return {
        type: actionTypes.GET_FRIEND_FAIL,
    }
}
export const getFriendInit = () => {
    return {
        type: actionTypes.GET_FRIEND_INIT,
    }
}
export const getFriend = (token) => {
    return dispatch => {
        dispatch(getFriendInit());
        dispatch(getFriendStart());

        Axios.get('/randomUser/profile', {
            headers: {
                'access-token': `${token}`
            }
        })
        .then(res => {
            console.log(res);
            const isSuccess = res.data.success;
            if(isSuccess) {
                const { id, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, location, age, resume, workPlace, introText, interestArr } = res.data.data;
                dispatch(getFriendSuccess(id, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, location, age, resume, workPlace, introText, interestArr));
            }else {
                dispatch(getFriendFail());
                dispatch(getFriendInit());
                alert(res.data.message);
                window.location.href = 'my-profile';
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(getFriendFail());
            dispatch(getFriendInit());
            console.log('오류 발생.')
            alert("네트워크 오류입니다.");
        })
    }
}
export const getFriendArticleStart = () => {
    return {
        type: actionTypes.GET_FRIEND_ARTICLE_START,
    }
}
export const getFriendArticleSuccess = (articleDataArr) => {
    return {
        type: actionTypes.GET_FRIEND_ARTICLE_SUCCESS,
        articleDataArr,
    }
}
export const getFriendArticleFail = () => {
    return {
        type: actionTypes.GET_FRIEND_ARTICLE_FAIL,
    }
}
export const getFriendArticleInit = () => {
    return {
        type: actionTypes.GET_FRIEND_ARTICLE_INIT,
    }
}

export const getFriendArticle = (token, userId, interest) => {
    return dispatch => {
        dispatch(getFriendArticleStart());

        Axios.get(`/randomUser/${userId}/profile/post?interest=${interest}`, {
            headers: {
                'access-token': `${token}`
            }
        })
        .then(res => {
            console.log(res);
            // const { articleContent, articleImgSrc } = res.data.data;
            const isSuccess = res.data.success;
            if(isSuccess) {
                const articleDataArr = res.data.data; // [{articleImgSrc, articleContent}, {articleImgSrc, articleContent}]
                if(articleDataArr.length === 0) { // 해당 관심사에 대한 게시글이 없으면 
                    dispatch(getFriendArticleSuccess(null));
                }else {
                    dispatch(getFriendArticleSuccess(articleDataArr));
                }
            }else {
                dispatch(getFriendArticleFail());
                dispatch(getFriendArticleInit());
                alert(res.data.message);
                window.location.href = 'my-profile';
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(getFriendArticleFail());
            dispatch(getFriendArticleInit());
            alert("네트워크 오류입니다.");
        })
    }
}

