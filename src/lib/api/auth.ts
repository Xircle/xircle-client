import Axios from '../defaultClient';

export type UserDataForm = {
    // profileImgSrc: File,
    // data: {
    //     articleContent: string, 
    //     articleInterest: [],
    //     articleTagArr?: [],
    //     articleTitle: string;
    // }
}

export const userJoin = (form: UserDataForm) => Axios.post('/user', form);
export const sendEmail = (email: string) => Axios.post('/email', { email });
export const checkEmail = (email: string, code: number) => Axios.post('/check/email', { email, code });
export const findInfo = (email: string) => Axios.post('/find/info', { email });
export const checkName = (displayName: string) => Axios.post('/check/name', { displayName });
export const login = (displayName: string, password: string) => Axios.post('/check/name', { displayName, password });

