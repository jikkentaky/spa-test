'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import { locales, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'use-intl';
import { useParams } from 'next/navigation';
import styles from './styles.module.scss';

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const router = useRouter();
    const [selectedLocale, setSelectedLocale] = useState(locale);
    const pathname = usePathname();
    const params = useParams();

    useEffect(() => {
        setSelectedLocale(locale);
    }, [locale]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement> ) => {
        const newLocale = event.target.value;
        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            {pathname, params},
            {locale: newLocale}
        );
    };

    return (
        <select value={selectedLocale} onChange={handleChange} className={styles['select']}>
            {locales.map((locale) => (
                <option key={locale} value={locale}>
                    {locale}
                </option>
            ))}
        </select>
    );
};
