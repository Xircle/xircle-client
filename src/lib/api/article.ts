import axios from 'axios';
import Axios from '../defaultClient';

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

export const createArticle = (form: ArticlePayload) => Axios.post('/post', form);
export const deleteArticle = (postId: string) => Axios.delete(`/post/${postId}`);
export const editArticle = (postId: string) => Axios.put(`/post/${postId}`);
