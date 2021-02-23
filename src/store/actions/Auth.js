import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (emailId, idToken, localId) => {
    console.log(emailId)
    return {
        type: actionTypes.AUTH_SUCCESS,
        emailId: emailId,
        tokenId: idToken,
        userId: localId
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

export const auth = (email) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
        };
        
        setTimeout(() => {
            dispatch(authSuccess(email, 'fvcbasqvsdqdwknjk', '정이든'))
        }, 3000);
        // let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQ3DtnwE8fgDvy-TeHf1uZIWjAwCoqMMM";
        // axios.post(url, authData)
        //     .then(res => {
        //         localStorage.setItem('_count', res.data.tokenId); //tk
        //         localStorage.setItem('userId', res.data.userId); //userId
        //         dispatch(authSuccess(res.data.tokenId, res.data.userId));
        //     })       
        //     .catch(err => {
        //         console.log(err);
        //         dispatch(authFail(err));
        //     })
    }
}
