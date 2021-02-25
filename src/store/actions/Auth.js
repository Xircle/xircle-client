import * as actionTypes from './actionTypes';
import Axios from '../../axios-instance';

export const authStart = (univ) => {
    return {
        type: actionTypes.AUTH_START,
        univ,
    }
}

export const authSuccess = (email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        email: email,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    }
}

export const errorInit = () => {
    return {
        type: actionTypes.ERROR_INIT
    }
}

export const auth = (payload) => {
    const {email, univKor} = payload;

    return dispatch => {
        dispatch(authStart(univKor));

        const authData = {
            email: email
        };
        
        Axios.post('/email', authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(email));
            })
            .catch(err => {
                console.log(err);
                alert('네트워크 혹은 서버에 일시적인 오류가 있습니다. 다시 시도해주세요');
                dispatch(authFail(err));
            })
    }
}
