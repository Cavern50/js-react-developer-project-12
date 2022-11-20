import { configureStore } from '@reduxjs/toolkit';
import chatReducer from 'pages/Main/slice/chat';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    }
})