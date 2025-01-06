import { NextRequest, NextResponse } from 'next/server';

import { isTokenValid } from '@/helpers';
import { routing } from '@/i18n/routing';

import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware(routing);
const PROTECTED_ROUTES = ['/dashboard', '/orders', '/products'];
const PUBLIC_ROUTES = ['/login', '/sign-up'];

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('myapp')?.value;
    const isAuthenticated = await isTokenValid(token);

    if (req.nextUrl.pathname === '/') {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/en/dashboard', req.url));
        } else {
            return NextResponse.redirect(new URL('/en/login', req.url));
        }
    }

    const locale = req.nextUrl.pathname.split('/')[1];
    const pathname = '/' + (req.nextUrl.pathname.split('/')[2] || '');

    if (PUBLIC_ROUTES.includes(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL(`/${locale}/`, req.url));
    }

    if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/', '/(en|ru)/:path*']
};
