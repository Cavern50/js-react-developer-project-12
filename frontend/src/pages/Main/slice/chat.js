import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { api } from 'api/api';

const initialState = {
    channels: [],
    messages: [],
    currentChannelId: null,
}

export const fetchChatData = createAsyncThunk('chats/fetchChatData', async () => {
    const response = await api.getData();
    return response;
})

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        changeCurrentChannel(state, action) {
            state.currentChannelId = action.payload;
        },
        addMessage(state, action) {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatData.fulfilled, (state, action) => {
            state = Object.assign(state, action.payload);
        })
    }
})

export const { changeCurrentChannel, addMessage } = chatSlice.actions;

export default chatSlice.reducer;