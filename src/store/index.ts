import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import profile from './modules/profile';
import articles from './modules/articles';
import auth from './modules/auth';
import friend from './modules/friend';

const store = configureStore({
    reducer: {
        profile,
        articles,
        auth,
        friend,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(logger)
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch