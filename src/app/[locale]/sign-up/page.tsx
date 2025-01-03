'use client';

import { AuthForm } from '@/components/auth-form';
import { withAuthAction } from '@/components/with-auth-action';

import styles from '../styles.module.scss';
import { useTranslations } from 'next-intl';

const SignUp = () => {
    const t = useTranslations('HomePage');
    const SignUpForm = withAuthAction(AuthForm);

    return (
        <div>
            <h2 className={styles.title}>{t('signUp')}</h2>

            <SignUpForm mode={'signup'} />
        </div>
    );
};

export default SignUp;
