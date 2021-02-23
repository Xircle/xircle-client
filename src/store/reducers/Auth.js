import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tokenId: null,
    userId: null,
    emailId: null,
    error: null,
    loading: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                emailId: action.emailId,
                tokenId: action.tokenId,
                userId: action.userId,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.ERROR_INIT:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export default reducer;