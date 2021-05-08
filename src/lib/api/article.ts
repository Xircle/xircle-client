import Axios from '../defaultClient';

const userId = localStorage.getItem('_UID');

export type ArticleForm = {
    profileImgSrc: File,
    data: {
        articleContent: string, 
        articleInterest: [],
        articleTagArr?: [],
        articleTitle: string;
    }
}
export type ArticlePayload = ArticleForm

export const getArticles = (interest: string) => {
    return Axios.get(`/user/${userId}/profile/post?interest=${interest}&page=0`);
}

export const getDetailArticles = (
    interest: string, 
    page: number,
    friendUserId?: string, 
) => {
    if(friendUserId)
        return Axios.get(`/post/user/${userId}?interest=${friendUserId}&page=${page}`);
    return Axios.get(`/post/user/${userId}?interest=${interest}&page=${page}`);
}
export const createArticle = (form: ArticlePayload) => Axios.post('/post', form);
export const updateArticle = (postId: string, updatedFormData: FormData) => Axios.put(`/post/${postId}`, updatedFormData);
export const deleteArticle = (postId: string) => Axios.delete(`/post/${postId}`);

export const updateProfile = (editedFormData: FormData) => Axios.put('/user/profile', editedFormData);