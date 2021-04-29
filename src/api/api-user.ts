import { Axios } from '../axios-instance';

export const SearchFriend = async (url: string, token: string) => {
    const res = await Axios.get(url, {
        headers: {
            'access-token': token
        }
    });
    console.log(res);
    const isSuccess = res.data.success;
    if(!isSuccess) {
        if(res.data.code === 458)
            throw new Error('위치허용을 하셔야 친구검색 기능을 사용하실 수 있습니다!');
    }
    return res.data.data;
}
