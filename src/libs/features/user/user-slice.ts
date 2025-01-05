import { User } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

type UserState = {
    user: User | null;
    activeSessions: number;
};

const initialState: UserState = {
    user: null,
    activeSessions: 0
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state) => {
            state.user = null;
        },
        setActiveSessions: (state, action) => {
            state.activeSessions = action.payload;
        }
    }
});

export const { addUser, deleteUser, setActiveSessions } = userSlice.actions;

export default userSlice.reducer;
