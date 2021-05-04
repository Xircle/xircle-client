import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit';
import type { ArticlePayload } from '../../lib/api/article';
import { AxiosError } from 'axios';
import * as ArticleAPI from '../../lib/api/article';

interface ErrorResponse {
    errorMessage: string
}

interface ThumbNailPost {
    articleImgSrc: string;
    articleTitle?: string;
}

// Thunk, actionCreator
export const getArticlesByInterestThunk = createAsyncThunk<
    { interest: Interest, posts: ThumbNailPost[]},
    Interest
>(
    'profile/getArticle/byInterest',
    async (interest) => {
        try {
            const res = await ArticleAPI.getArticles(interest);
            if(res.data.success) {
                const posts = res.data.data.post;
                return {
                    interest,
                    posts
                }
            }else {
                alert(res.data.message);
                throw new Error();
            }
        }catch(err) {
            alert('Something went wrong');
            console.log(err);
            throw err;
        }
    }
)

export const getDetailArticleByInterestThunk = createAsyncThunk<
    { interest: Interest, articleDetailArr: ArticleInfo[]},
    { interest: Interest, page: number}
>(
    'profile/getArticleDetail/byInterest',
    async ({ interest, page = 0 }) => {
        try {
            const res = await ArticleAPI.getDetailArticles(interest, page);
            if(res.data.success) {
                const articleDetailArr = res.data.data;
                return {
                    interest,
                    articleDetailArr
                }
            }else {
                alert(res.data.message);
                throw new Error();
            }
        }catch(err) {
            alert('Something went wrong');
            console.log(err);
            throw err;
        }
    }
)

export const updateProfileThunk = createAsyncThunk<
    void,
    FormData
>(
    'profile/updateProfile',
    async (editedFormData) => {
        try {
            const res = await ArticleAPI.updateProfile(editedFormData);
            if(!res.data.success) {
                alert(res.data.message);
                window.location.href = 'my-profile';
            }
        }catch(err) {
            alert('Something went wrong');
            console.log(err);
            throw err;
        }
    }
)

export const createArticleThunk = createAsyncThunk<
    void,
    ArticlePayload
>(
    'users/createArticle',
    async (articleImgSrcForm) => {
        try {
            const res = await ArticleAPI.createArticle(articleImgSrcForm);
            if(!res.data.success)
                alert(res.data.message);
        }catch(err) {
            alert('Something went wrong');
            console.log(err);
            throw err;
        }
    }
)

type EditedArticle = {
    articleTitle: string, 
    articleContent: string, 
    articleInterest: Interest
}
export const updateArticleThunk = createAsyncThunk<
    {
        editedData: EditedArticle,
        originalInterest: Interest,
        postId: string  
    },
    { 
        editedFormData: FormData, 
        editedData: EditedArticle, 
        originalInterest: Interest
        postId: string
    }
>(
    'profile/updateArticle',
    async ({ editedFormData, editedData, originalInterest, postId }) => {
        try {
            const res = await ArticleAPI.updateArticle(postId, editedFormData);
            if(res.data.success) {
                return {
                    editedData,
                    originalInterest,
                    postId
                }
            }else {
                alert(res.data.message);
                window.location.href = 'my-profile';
                throw new Error();
            }
        }catch(err) {
            alert('Something went wrong');
            console.log(err);
            throw err;
        }
    }
)


export const deleteArticleThunk = createAsyncThunk<
    { interest: Interest, postId: string },
    { interest: Interest, postId: string },
    {
        rejectValue: string
    }
>(
    'users/deleteArticle',
    async ({ interest, postId }, thunkAPi) => {
        try {
            await ArticleAPI.deleteArticle(postId);
            return { interest, postId }
        }catch(err) {
            let error: AxiosError<ErrorResponse> = err;
            if(!error.response) throw err;
            return thunkAPi.rejectWithValue(error.response.data.errorMessage);
        }
    }
)

export type Interest = '동네친구' | '스타트업' | '코딩' | '술/맛집탐방' | '헬스' | '애견인' | '패션' | '예술' | '취업준비' | '수험생' | '대학원';

export type InterestInfo = {
    interest: Interest,
    count: number;
    activity: number;
}
export type ArticleInfo = {
    articleImgSrcs: string[],
    articleTitle?: string,
    postId?: string,
    createdAt?: string,
    articleContent?: string,
    articleTagArr?: string[],
    isHeartClicked?: true
}
type Articles = {
    status: 'idle' | 'pending',
    error: string | null | undefined,
    interests: InterestInfo[],
    articles: Record<Interest, ArticleInfo[]> | null
}

const initialState: Articles = {
    status: 'idle',
    error: null,
    interests: [],
    articles: null,
}

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        addInterestArr(state, action: PayloadAction<InterestInfo[]>) {
            state.interests = action.payload;
        }
    },
    extraReducers: builder => builder
    // Get Article By Interest
        .addCase(getArticlesByInterestThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getArticlesByInterestThunk.fulfilled, (state, { payload }) => {
            const { interest, posts } = payload;  
            if(posts !== []) { // []이면 초기화 안함
                posts.map(post => {
                    state.articles?.[interest].push({
                        articleImgSrcs: [post.articleImgSrc]
                    })
                })
            }
            state.status = 'idle';
        })
        .addCase(getArticlesByInterestThunk.rejected, (state) => {
            state.status = 'idle';
        })
    // Get Article Detail By Interest
        .addCase(getDetailArticleByInterestThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getDetailArticleByInterestThunk.fulfilled, (state, { payload }) => {
            const { interest, articleDetailArr } = payload;  
            if(articleDetailArr !== []) { // []이면 초기화 안함
                articleDetailArr.map(postDetail => {
                    state.articles?.[interest].push({
                        articleImgSrcs: postDetail.articleImgSrcs,
                        articleTitle: postDetail.articleTitle,
                        articleContent: postDetail.articleContent,
                        articleTagArr: postDetail.articleTagArr,
                        postId: postDetail.postId,
                        createdAt: postDetail.createdAt,
                        isHeartClicked: true
                    })
                })
            }
            state.status = 'idle';
        })
        .addCase(getDetailArticleByInterestThunk.rejected, (state) => {
            state.status = 'idle';
        })
    // Update profile
        .addCase(updateProfileThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(updateProfileThunk.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(updateProfileThunk.rejected, (state, { payload }) => {
            state.status = 'idle';
        })
    // Create new article
        .addCase(createArticleThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(createArticleThunk.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(createArticleThunk.rejected, (state) => {
            state.status = 'idle';
        })
    // Update article
        .addCase(updateArticleThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(updateArticleThunk.fulfilled, (state, { payload }) => {
            const { editedData, postId, originalInterest } = payload;
            const { articleTitle, articleContent, articleInterest } = editedData;

            const foundIndex = state.articles?.[originalInterest].findIndex(el => el.postId === postId) as number;

            if(originalInterest === articleInterest) { // 만약 같은 관심사면, 기존의 배열에서 지우고, 새로운 관심사에 추가
                state.articles?.[articleInterest].splice(foundIndex, 1, {
                    ...state.articles[articleInterest][foundIndex],
                    articleTitle,
                    articleContent,
                });
            }else { // 다르면, 지우고 다른 배열에 추가
                state.articles![originalInterest].splice(foundIndex, 1);

                if(!state.articles![articleInterest])
                    state.articles![articleInterest] = [];
                
                state.articles![articleInterest].push({ // 옮기기
                    ...state.articles![originalInterest][foundIndex],
                    articleContent,
                    articleTitle
                })

                // original interestArr (-1 activity)
                const originalIdx = state.interests.findIndex(el => el.interest === originalInterest);
                state.interests.splice(originalIdx, 1, {
                    ...state.interests[originalIdx],
                    activity: state.interests[originalIdx].activity - 1
                })
                // new interestArr (+1 activity)
                const newIdx = state.interests.findIndex(el => el.interest === articleInterest);
                state.interests.splice(newIdx, 1, {
                    ...state.interests[newIdx],
                    activity: state.interests[newIdx].activity + 1
                })
            }
        })
        .addCase(updateArticleThunk.rejected, (state) => {
            state.status = 'idle';
        })
    // Delete article
        .addCase(deleteArticleThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(deleteArticleThunk.fulfilled, (state, { payload }) => {
            let interest = payload.interest;
            
            if(!state.articles) return state;
            state.articles[interest] = state.articles[interest].filter(el => el.postId !== payload.postId);
            state.status = 'idle';

            state.interests.map(el => {
                if(el.interest === interest)
                    el.activity--; // mutate directly
            })
        })
        .addCase(deleteArticleThunk.rejected, (state, { payload }) => {
            state.status = 'idle';
            state.error = payload;
        })
})

export const { addInterestArr } = articleSlice.actions;
export default articleSlice.reducer;