'use client';

import { usePathname } from 'next/navigation';

import { Link, navList } from '@/i18n/routing';

import styles from './styles.module.scss';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type Props = {
    className?: string;
};

const filteredNavList = Object.values(navList).filter((item) => item.route !== navList.home.route);

export const NavList = ({ className }: Props) => {
    const t = useTranslations('Aside');
    const pathname = usePathname();

    return (
        <nav className={clsx(styles.navigationMenu, className)}>
            <ul className={styles.navigationMenu__list}>
                {filteredNavList.map(({ route, link }) => (
                    <li key={route} className={styles.navigationMenu__item}>
                        <Link
                            href={route}
                            className={clsx(
                                styles['navigationMenu__link'],
                                pathname === route && styles['navigationMenu__link--active']
                            )}>
                            {t(link)}
                            <span
                                className={clsx(
                                    styles['navigationMenu__underline'],
                                    pathname.includes(route) &&
                                        styles['navigationMenu__underline--active']
                                )}></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
