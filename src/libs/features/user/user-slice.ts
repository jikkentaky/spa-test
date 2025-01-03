import { User } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

type UserState = {
    user: User | null;
};

const initialState: UserState = {
    user: null
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
        }
    }
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
