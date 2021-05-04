import Axios from '../defaultClient';

// 이 요청을 한다는 것은 로컬스토리지에 tk이 있는 게 보장되니까 axios config 안줘도 됨.
export const getUser = () => {
    const userId = localStorage.getItem('_UID');
    return Axios.get(`/user/${userId}/profile`)
}

export const getFriend = (userId: string) => {
    return Axios.get(`/user/${userId}/profile`);
}

export const getFriendArticle = (interest: string, userId: string, page: number) => {
    return Axios.get(`/user/${userId}/profile/post?interest=${interest}&page=${page}`);
}