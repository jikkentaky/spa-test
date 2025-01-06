import { Loader } from '@/components/ui/loader/loader';

import styles from '../styles.module.scss';

export default function Loading() {
    return (
        <div className={styles['loader-container']}>
            <Loader />
        </div>
    );
}
