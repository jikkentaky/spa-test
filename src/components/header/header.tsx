import { DateDisplay } from '@/components/ui/date-display/date-display';
import { TimeDisplay } from '@/components/ui/time-display';
import { Logo } from '@/components/ui/logo';
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
