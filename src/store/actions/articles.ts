import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ArticlePayload } from '../../lib/api/article';
import { AxiosError } from 'axios';
import * as ArticleAPI from '../../lib/api/article';

interface ErrorResponse {
    errorMessage: string
}

// Create article thunk
const createArticleThunk = createAsyncThunk<
    void,
    ArticlePayload,
    { rejectValue: string }
>(
    'users/createArticle',
    async (articleImgSrcForm, thunkAPi) => {
        try {
            await ArticleAPI.createArticle(articleImgSrcForm);
        }catch(err) {
            let error: AxiosError<ErrorResponse> = err;
            if(!error.response) throw err;
            return thunkAPi.rejectWithValue(error.response.data.errorMessage);
        }
    }
)
// Delete article thunk
const deleteArticleThunk = createAsyncThunk<
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

type Interest = '동네친구' | '스타트업' | '코딩' | '술/맛집탐방' | '헬스' | '애견인' | '패션' | '예술' | '취업준비' | '수험생' | '대학원';

type InterestInfo = {
    interest: Interest,
    count: number;
    activity: number;
}
type ArticleInfo = {
    articleImgSrc: string,
    articleTitle: string,
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
    reducers: {},
    extraReducers: builder => builder
    // Create new article
        .addCase(createArticleThunk.pending, (state) => {
            state.articles
            state.status = 'pending';
        })
        .addCase(createArticleThunk.fulfilled, (state) => {
            state.status = 'idle';
        })
        .addCase(createArticleThunk.rejected, (state, { payload }) => {
            state.status = 'idle';
            state.error = payload;
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