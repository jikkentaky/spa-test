import { FC, ReactNode } from 'react';

import { Inter } from 'next/font/google';

import { getUser } from '@/actions/user-controller';
import NotFound from '@/app/[locale]/not-found';
import StoreProvider from '@/app/store-provider';
import { Aside } from '@/components/aside';
import { Header } from '@/components/header';
import { Locale, routing } from '@/i18n/routing';

import '../../assets/globals.scss';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

type Props = {
    children: ReactNode;
    params: { locale: Locale };
};

const LocalLayout: FC<Props> = async ({ children, params }) => {
    const { locale } = await params;
    const user = await getUser();

    if (!routing.locales.includes(locale)) {
        return <NotFound />;
    }

    const messages = await getMessages();

    return (
        <StoreProvider user={user}>
            <html lang={locale}>
                <body className={inter.className}>
                    <NextIntlClientProvider messages={messages}>
                        <Header />

                        <div className='wrapper'>
                            {user && <Aside />}

                            <div
                                className={clsx({
                                    ['wrapper__content']: !!user,
                                    ['content']: !user
                                })}>
                                {children}
                            </div>
                        </div>

                        <Toaster position='bottom-right' />
                    </NextIntlClientProvider>
                </body>
            </html>
        </StoreProvider>
    );
};

export default LocalLayout;
