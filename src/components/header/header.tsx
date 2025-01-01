'use client';

import { DateDisplay } from '@/components/ui/date-display/date-display';
import { TimeDisplay } from '@/components/ui/time-display';
import { Logo } from '@/components/ui/logo';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/libs/hooks';
import { useEffect } from 'react';
import { addUser } from '@/libs/features/user/user-slice';
import { User } from '@/types/types';
import { useLocale } from 'use-intl';

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
