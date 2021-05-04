import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as FriendAPI from '../../lib/api/profile';
import * as ArticleAPI from '../../lib/api/article';
import type { Interest, InterestInfo, ArticleInfo } from './articles';

interface FriendProfileResponse {
    userId: string 
    profileImgSrc: string 
    adj: string 
    job: string 
    displayName: string 
    gender: string 
    university: string 
    isGraduate: boolean 
    isPublic: boolean 
    isLocationPublic: boolean | null,
    location: string 
    age: number | null 
    resume: string 
    workPlace: string 
    introText: string 
    interestArr: InterestInfo[],
    latitude?: number
    longitude?: number
}

// Thunk actionCreator
export const getFriendThunk = createAsyncThunk<
    FriendProfileResponse,
    string
>(
    'friend/getFriend',
    async (userId: string = '0') => {
        try {
            const res = await FriendAPI.getFriend(userId);
            if(res.data.success) {
                const FriendData: FriendProfileResponse = res.data.data;
                return { ...FriendData };
            }else {
                alert(res.data.message);
                window.location.href = 'my-profile';
                throw new Error(res.data.message);
            }
        }catch(err) {
            alert("Something went wrong");
            window.location.href = 'my-profile';
            throw err;
        }
    }
)

interface FriendArticleResponse {
    articles: ArticleInfo[]
    interest: Interest
}

export const getFriendArticleThunk = createAsyncThunk<
    FriendArticleResponse,
    { interest: Interest, page: number},
    {
        state: FriendState
    }
    
>(
    'friend/getFriend/article',
    async ({ interest, page = 0 }, { getState }) => {
        try {
            const { userId } = getState().data;
            const res = await FriendAPI.getFriendArticle(interest, userId!, page);

            if(res.data.success) {
                const posts: ArticleInfo[] = res.data.data.post;
                return {
                    articles: posts,
                    interest,
                }
            }else {
                alert(res.data.message);
                throw new Error(res.data.message);
            }
        }catch(err) {
            alert("Something went wrong");
            throw err;
        }
    }
)

export const getFriendDetailArticleThunk = createAsyncThunk<
    { interest: Interest, articleDetailArr: ArticleInfo[]},
    { interest: Interest, userId: string, page: number}
>(
    'friend/getFriend/article',
    async ({ interest, userId, page = 0 }) => {
        try {
            const res = await ArticleAPI.getDetailArticles(interest, page, userId);

            if(res.data.success) {
                const posts: ArticleInfo[] = res.data.data;
                return {
                    interest,
                    articleDetailArr: posts,
                }
            }else {
                alert(res.data.message);
                throw new Error(res.data.message);
            }
        }catch(err) {
            alert("Something went wrong");
            throw err;
        }
    }
)

export interface FriendState {
    status: 'idle' | 'pending',
    data: {
        userId: string | null,
        profileImgSrc: string,
        isGraduate: boolean | null,
        isPublic: boolean | null,
        isLocationPublic: boolean | null,
        adj: string | null,
        job: string,
        gender: string,
        displayName: string,
        univ?: string,
        location: string,
        age: number | null,
        resume: string,
        workPlace: string,
        introText: string,
        interestArr: InterestInfo[] | null
        posts?: {
            articles: Record<Interest, ArticleInfo[]> | null
            interests: InterestInfo[] | null
        }
    }
}
const initialState: FriendState = {
    status: 'idle',
    data: {
        userId: null,
        profileImgSrc: '',
        isGraduate: null,
        isPublic: null,
        isLocationPublic: null,
        adj: null,
        job: '',
        gender: '',
        displayName: '',
        univ: '',
        location: '',
        age: null,
        resume: '',
        workPlace: '',
        introText: '',
        interestArr: null,
        posts: {
            articles: null,
            interests: null
        }
    }
}
// Store & Reducer
const friendSlices = createSlice({
    name: 'friend',
    initialState,
    reducers: {},
    extraReducers: builder => builder
    // Get Friend Profile
        .addCase(getFriendThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getFriendThunk.fulfilled, (state, { payload }) => {
            state.status = 'idle';
            
            state.data = {
                ...payload
            }
        })
        .addCase(getFriendThunk.rejected, (state) => {
            state.status = 'idle';
        })
    // Get Friend Article
        .addCase(getFriendArticleThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getFriendArticleThunk.fulfilled, (state, { payload }) => {
            state.status = 'idle';
            const { interest, articles } = payload;

            if(articles.length !== 0) {
                state.data.posts!.articles![interest] = [];
                articles.map(el => {
                    state.data.posts?.articles?.[interest].push({
                        // el.articleImgSrcs가 아마 articleImgSrc일 거임. 여기서 에러뜰듯
                        articleImgSrcs: el.articleImgSrcs,
                        articleTitle: el.articleTitle
                    })
                })
            }
        })
        .addCase(getFriendArticleThunk.rejected, (state) => {
            state.status = 'idle';
        })
    // Get Friend Detail Article
        .addCase(getFriendDetailArticleThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(getFriendDetailArticleThunk.fulfilled, (state, { payload }) => {
            state.status = 'idle';
            const { interest, articleDetailArr } = payload;
            if(articleDetailArr !== []) {
                articleDetailArr.map(postDetail => {
                    state.data.posts?.articles?.[interest].push({
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
        })
        .addCase(getFriendDetailArticleThunk.rejected, (state) => {
            state.status = 'idle';
        })
})

export default friendSlices.reducer;
