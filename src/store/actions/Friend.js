import * as actionTypes from './actionTypes';
import { Axios, AxiosForTest } from '../../axios-instance';

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
export const getFriend = (token, userId=0) => {
    return dispatch => {
        dispatch(getFriendInit());
        dispatch(getFriendStart());

        AxiosForTest.get(`/user/${userId}/profile`, { // 랜덤유저 프로필 조회
            headers: {
                'access-token': `${token}`
            }
        })
        .then(res => {
            console.log(res);
            const isSuccess = res.data.success;
            if(isSuccess) {
                const { userId, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, location, age, resume, workPlace, introText, interestArr } = res.data.data;
                dispatch(getFriendSuccess(userId, profileImgSrc, adj, job, displayName, gender, university, isGraduate, isPublic, location, age, resume, workPlace, introText, interestArr));
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
            window.location.href = 'my-profile';
        })
    
    }
}
export const getFriendArticleStart = () => {
    return {
        type: actionTypes.GET_FRIEND_ARTICLE_START,
    }
}
export const getFriendArticleSuccess = (interest, articleDataArr) => {
    return {
        type: actionTypes.GET_FRIEND_ARTICLE_SUCCESS,
        interest,
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

export const getFriendArticle = (interest, token, userId) => {
    return dispatch => {
        dispatch(getFriendArticleStart());

        let realInterest;
        if(interest === '술_맛집탐방')
            realInterest = '술/맛집탐방';
        else 
            realInterest = interest;

        AxiosForTest.get(`/user/${userId}/profile/post?interest=${realInterest}&page=0`, {
            headers: {
                'access-token': `${token}`
            }
        })
        .then(res => {
            console.log(res);
            const isSuccess = res.data.success;
            if(isSuccess) {
                const articleDataArr = res.data.data.post; // [{articleImgSrc, articleContent}, {articleImgSrc, articleContent}]
                
                if(articleDataArr.length === 0) { // 해당 관심사에 대한 게시글이 없으면 
                    dispatch(getFriendArticleSuccess(interest, null));
                }else {
                    dispatch(getFriendArticleSuccess(interest, articleDataArr));
                }
            }else {
                dispatch(getFriendArticleFail());
                dispatch(getFriendArticleInit());
                alert(res.data.message);
                // window.location.href = 'my-profile';
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

export const getFriendInterestArticleDetailStart = () => {
    return {
        type: actionTypes.GET_FRIEND_INTEREST_ARTICLE_DETAIL_START,
    }
}
export const getFriendInterestArticleDetailSuccess = (interest, articleDataArr, hasMoreArticle) => {
    return {
        type: actionTypes.GET_FRIEND_INTEREST_ARTICLE_DETAIL_SUCCESS,
        interest,
        articleDataArr,
        hasMoreArticle
    }
}
export const getFriendInterestArticleDetailFail = () => {
    return {
        type: actionTypes.GET_FRIEND_INTEREST_ARTICLE_DETAIL_FAIL,
    }
}
export const getFriendInterestArticleDetailInit = () => {
    return {
        type: actionTypes.GET_FRIEND_INTEREST_ARTICLE_DETAIL_INIT,
    }
}