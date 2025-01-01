import Link from 'next/link';
import styles from './styles.module.scss';
import { LogoIcon } from '@/components/ui/icons/logo';

export const Logo = () => {
    return (
        <Link
            href="/public"
            className={styles.logo}
        >
            <LogoIcon />

            <span className={styles.logo__text}>
                inventory
            </span>
        </Link>
    );
};
