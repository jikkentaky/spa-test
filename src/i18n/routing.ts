import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'ru'];

export const routing = defineRouting({
    locales,
    defaultLocale: 'ru',
    pathnames: {
        '/': '/',
    }
});

export type Locale = typeof routing['locales'][number];
export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);
