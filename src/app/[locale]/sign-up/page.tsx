'use client';

import { AuthForm } from '@/components/auth-form';
import { withAuthAction } from '@/components/with-auth-action';
import { Link } from '@/i18n/routing';

import styles from '../styles.module.scss';
import { useTranslations } from 'next-intl';

const SignUp = () => {
    const t = useTranslations('Auth');
    const SignUpForm = withAuthAction(AuthForm);

    return (
        <div className={styles['container']}>
            <h2 className={styles.title}>{t('signUp')}</h2>

            <Link href={'/login'} className={styles.link}>
                {t('loginLink')}
            </Link>

            <SignUpForm mode={'signup'} />
        </div>
    );
};

export default SignUp;
