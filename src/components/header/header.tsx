'use client';

import { DateDisplay } from '@/components/header/components/date-display';
import { TimeDisplay } from '@/components/header/components/time-display';
import { useAppDispatch } from '@/libs/store/hooks';
import { useEffect } from 'react';
import { addUser } from '@/libs/features/user/user-slice';
import { User } from '@/types/types';
import { Logo } from '@/components/header/components/logo';
import styles from './styles.module.scss';

type Props = {
    user: User | null;
}

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
