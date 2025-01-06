'use client';

import { useEffect } from 'react';

import { logout } from '@/actions/user-controller';
import { NavList } from '@/components/aside/components/nav-list';
import { UserSettings } from '@/components/aside/components/user-settigns';
import { CustomButton } from '@/components/ui/custom-button';
import { LogoutIcon } from '@/components/ui/icons/logout';
import { LanguageSwitcher } from '@/components/ui/language-swithcer';
import { deleteUser, setActiveSessions } from '@/libs/features/user/user-slice';
import { useAppDispatch } from '@/libs/store/hooks';

import styles from './styles.module.scss';
import { io } from 'socket.io-client';
import { useLocale } from 'use-intl';

export const Aside = () => {
    const locale = useLocale();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        logout(locale);
        dispatch(deleteUser());
    };

    useEffect(() => {
        // const socketUrl = `${process.env.NEXT_PUBLIC_SOCKET_HOST}${process.env.NEXT_PUBLIC_SOCKET_PORT || 3001}`;
        const socketUrl = `http://159.69.155.243:3001`;
        const socket = io(socketUrl, {
            path: '/api/socket'
        });

        socket.on('activeSessionsUpdate', (count: number) => {
            dispatch(setActiveSessions(count));
            console.log('Active sessions:', count);
        });

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    return (
        <aside className={styles.aside}>
            <div className={styles['aside__menu']}>
                <UserSettings />

                <NavList />
            </div>

            <div className={styles['aside__footer']}>
                <LanguageSwitcher />

                <CustomButton className={styles['aside__button']} onClick={handleLogout}>
                    <LogoutIcon />
                </CustomButton>
            </div>
        </aside>
    );
};
