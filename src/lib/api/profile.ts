import Axios from '../defaultClient';

// 이 요청을 한다는 것은 로컬스토리지에 tk이 있는 게 보장되니까 axios config 안줘도 됨.
export const getUser = (token: string, userId: string) => Axios.get(`/user/${userId}/profile`);

