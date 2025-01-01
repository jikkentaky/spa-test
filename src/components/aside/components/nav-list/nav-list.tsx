'use client';

import { Link, navList } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';

type Props = {
    className?: string;
}

const filteredNavList = Object
    .values(navList)
    .filter(item => item.route !== '/');

export const NavList = ({ className }: Props) => {
    const t = useTranslations('Aside');
    const pathname = usePathname();
    console.log(pathname);

    return (
        <nav className={clsx(styles.navigationMenu, className)}>
            <ul className={styles.navigationMenu__list}>
                {filteredNavList.map(({ route, link}) => (
                    <li key={route} className={styles.navigationMenu__item}>
                        <Link href={route}
                              className={clsx(
                                  styles['navigationMenu__link'],
                                  pathname === route && styles['navigationMenu__link--active'])}
                        >
                            {t(link)}
                            <span className={clsx(
                                styles['navigationMenu__underline'],
                                pathname.includes(route) && styles['navigationMenu__underline--active'])}
                            ></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
