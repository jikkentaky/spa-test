import { FC, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import NotFound from '@/app/[locale]/not-found';
import StoreProvider from '@/app/store-provider';
import { Header } from '@/components/header';
import { Locale, routing } from '@/i18n/routing';
import { getUser } from '@/libs/get-user';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from "react-hot-toast";
import '../../assets/globals.scss';

const inter = Inter({ subsets: ['latin'] })

type Props = {
    children: ReactNode;
    params: { locale: Locale };
};

const RootLayout: FC<Props> = async ({ children, params }) => {
    const { locale } = await params;
    const user = await getUser()

    if (!routing.locales.includes(locale)) {
       return <NotFound />;
    }

    const messages = await getMessages();

    return (
        <StoreProvider>
            <html lang={locale}>
                <body className={inter.className}>
                    <NextIntlClientProvider messages={messages}>
                        <Header user={user}/>

                        <Toaster position="bottom-right" />

                        {children}
                    </NextIntlClientProvider>
                </body>
            </html>
        </StoreProvider>
    );
};

export default RootLayout;
