'use client';

import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/libs/store/hooks';
import { withAuthAction } from '@/components/with-auth-action';
import { AuthForm } from '@/components/auth-form';
import styles from './styles.module.scss';

const HomePage = () => {
    const t = useTranslations('HomePage');
    const { user } = useAppSelector(state => state.user);
    const SignUpForm = withAuthAction(AuthForm);

    return (
        <div className={styles.container}>
            {(!user) ?
                <div>
                    <h2 className={styles.title}>{t('signUp')}</h2>

                    <SignUpForm mode={'signup'} />
                </div>
                : <div className={styles.message}>{t('welcomeMessage')}</div>
            }
        </div>
    );
};

export default HomePage;
