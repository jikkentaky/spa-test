'use client';

import { logout } from '@/actions/user-controller';
import { NavList } from '@/components/aside/components/nav-list';
import { UserSettings } from '@/components/aside/components/user-settigns';
import { CustomButton } from '@/components/ui/custom-button';
import { LogoutIcon } from '@/components/ui/icons/logout';
import { LanguageSwitcher } from '@/components/ui/language-swithcer';
import { deleteUser } from '@/libs/features/user/user-slice';
import { useAppDispatch } from '@/libs/store/hooks';

import styles from './styles.module.scss';
import { useLocale } from 'use-intl';

export const Aside = () => {
    const locale = useLocale();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        logout(locale);
        dispatch(deleteUser());
    };

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
