'use client';

import { DateDisplay } from '@/components/header/components/date-display';
import { Logo } from '@/components/header/components/logo';
import { TimeDisplay } from '@/components/header/components/time-display';

import styles from './styles.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles['header__container']}>
                <Logo />
                <div className={styles['header__info']}>
                    <DateDisplay />
                    <TimeDisplay />
                </div>
            </div>
        </header>
    );
};
