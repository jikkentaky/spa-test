import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'ru'];

export const navList = {
    home: { route: '/', link: '/' },
    orders: { route: '/orders', link: 'orders' },
    products: { route: '/products', link: 'products' }
}

const pathnames = Object.fromEntries(
    Object.values(navList).map(({ route }) => [route, route])
);

export const routing = defineRouting({
    locales,
    defaultLocale: 'ru',
    pathnames
});

export type Locale = typeof routing['locales'][number];
export const {Link, redirect, usePathname, useRouter, getPathname} =
    createNavigation(routing);
