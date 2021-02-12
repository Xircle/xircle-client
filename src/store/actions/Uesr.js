import * as actionTypes from './actionTypes';

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                console.log(res);
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFail());
            })
    }
}

export const fetchOrderStart = () => {
    console.log('fetchOrderStart');
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
    }
}

export const fetchOrderSuccess = (orderData) => {
    console.log('fetchOrderSuccess');
    const fetchOrder = [];
    for(let key in orderData) {
        fetchOrder.push({
            id: key,
            ...orderData[key]
        })
    }
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orderData: fetchOrder
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        console.log('fetchOrder');
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                dispatch(fetchOrderSuccess(res.data));
            })
            .catch(err => dispatch(fetchOrderFail(err)));
    }
}