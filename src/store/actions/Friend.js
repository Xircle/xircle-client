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
export const getFriend = (token) => {
    return dispatch => {
        dispatch(getFriendInit());
        dispatch(getFriendStart());

        AxiosForTest.get('/randomUser/profile', {
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

        AxiosForTest.get(`/randomUser/${userId}/profile/post?interest=${realInterest}`, {
            headers: {
                'access-token': `${token}`
            }
        })
        .then(res => {
            console.log(res);
            const isSuccess = res.data.success;
            if(isSuccess) {
                const articleDataArr = res.data.data; // [{articleImgSrc, articleContent}, {articleImgSrc, articleContent}]
                
                if(articleDataArr.length === 0) { // 해당 관심사에 대한 게시글이 없으면 
                    dispatch(getFriendArticleSuccess(interest, null));
                }else {
                    dispatch(getFriendArticleSuccess(interest, articleDataArr));
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
export const getFriendInterestArticleDetail = (token, interest, page) => {
    return dispatch => {
        dispatch(getFriendInterestArticleDetailStart());
            
        let realInterest;
        if(interest === '술_맛집탐방')
            realInterest = '술/맛집탐방';
        else 
            realInterest = interest;
        // AxiosForTest.get(`/post?interest=${realInterest}&page=${page}`, {
        //     headers: {
        //         'access-token': `${token}`
        //     }
        // })
        //     .then(res => {
        //         console.log(res);
        //         const isSuccess = res.data.success;
        //         if(isSuccess) {
        //             const articleDataArr = res.data.data;
        //             let hasMoreArticle = true;
        //             if(articleDataArr.length === 0)
        //                 hasMoreArticle = false;
        //             dispatch(getFriendInterestArticleDetailSuccess(interest, articleDataArr, hasMoreArticle));
        //         }
        //         else{
        //             dispatch(getFriendInterestArticleDetailFail());
        //             dispatch(getFriendInterestArticleDetailInit());
        //             alert(res.data.message);
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         dispatch(getFriendInterestArticleDetailFail());
        //         dispatch(getFriendInterestArticleDetailInit());
        //         alert('Something went wrong.');
        //     })
    }
}
