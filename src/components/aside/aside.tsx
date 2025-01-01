 'use client';

import { NavList } from '@/components/aside/components/nav-list';
import { UserSettings } from '@/components/aside/components/user-settigns';
import { CustomButton } from '@/components/ui/custom-button';
import { LogoutIcon } from '@/components/ui/icons/logout';
import { logout } from '@/actions/user-controller';
import { LanguageSwitcher } from '@/components/ui/language-swithcer';
import { useActionState } from 'react';
import styles from './styles.module.scss';

export const Aside = () => {
     const [_error, action, _isPending] = useActionState(logout, null)

     const handleLogout = () => {
         action()
     }

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
