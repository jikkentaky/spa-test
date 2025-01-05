'use client';

import { ReactNode, useEffect } from 'react';

import { addUser } from '@/libs/features/user/user-slice';
import { store } from '@/libs/store/store';
import { User } from '@/types/types';

import { Provider } from 'react-redux';

type Props = {
    children: ReactNode;
    user: User | null;
};

export default function StoreProvider({ children, user }: Props) {
    useEffect(() => {
        if (user) {
            store.dispatch(addUser(user));
        }
    }, [user]);

    return <Provider store={store}>{children}</Provider>;
}
