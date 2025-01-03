import { useEffect } from 'react';

import { redirect } from '@/i18n/routing';
import { useAppSelector } from '@/libs/store/hooks';

import { useLocale } from 'use-intl';

export const useAuthRedirect = () => {
    const { user } = useAppSelector((state) => state.user);
    const locale = useLocale();

    useEffect(() => {
        if (user) {
            redirect({
                href: '/dashboard',
                locale
            });
        }
    }, [user, locale]);
};
