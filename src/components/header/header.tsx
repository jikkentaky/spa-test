'use client';

import { useEffect } from 'react';

import { DateDisplay } from '@/components/header/components/date-display';
import { Logo } from '@/components/header/components/logo';
import { TimeDisplay } from '@/components/header/components/time-display';
import { addUser } from '@/libs/features/user/user-slice';
import { useAppDispatch } from '@/libs/store/hooks';
import { User } from '@/types/types';

import styles from './styles.module.scss';

type Props = {
    user: User | null;
};

export const Header = ({ user }: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            dispatch(addUser(user));
        }
    }, [user, dispatch]);

    return (
        <header className={styles.header}>
            <div className={styles['header__container']}>
                <Logo />

                <div className={styles['header__info']}>
                    <DateDisplay />

                    <TimeDisplay />
                </div>
            </div>
        </header>
    );
};
