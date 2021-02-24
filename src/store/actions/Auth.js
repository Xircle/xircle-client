import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    const {email, univ} = payload;

    return dispatch => {
        dispatch(authStart(univ));
        const authData = {
            email,
        };
        
        setTimeout(() => {
            dispatch(authSuccess(email));
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
