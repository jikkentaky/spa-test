'use client';

import styles from '@/app/[locale]/styles.module.scss';
import { AuthForm } from '@/components/auth-form';
import { withAuthAction } from '@/components/with-auth-action';

import { useTranslations } from 'next-intl';

const LoginComponent = () => {
    const t = useTranslations('Auth');
    const LoginForm = withAuthAction(AuthForm);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t('titleLogin')}</h2>

            <LoginForm mode={'login'} />
        </div>
    );
};

export default LoginComponent;
