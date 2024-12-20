import { FC, ReactNode } from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Locale, routing } from '@/i18n/routing';
import NotFound from '@/app/[locale]/not-found';

type Props = {
    children: ReactNode;
    params: { locale: Locale };
};

const LocaleLayout: FC<Props> = async ({ children, params }) => {
    const { locale } = await params;

    if (!routing.locales.includes(locale)) {
       return <NotFound />;
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default LocaleLayout;
