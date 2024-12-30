import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from '@/libs/features/counter/counter-slice';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

