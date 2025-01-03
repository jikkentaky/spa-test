import { LogoIcon } from '@/components/ui/icons/logo';

import styles from './styles.module.scss';

export const Logo = () => {
    return (
        <div className={styles.logo}>
            <LogoIcon />

            <span className={styles.logo__text}>inventory</span>
        </div>
    );
};
