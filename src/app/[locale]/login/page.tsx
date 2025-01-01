'use client';

import { useAppSelector } from '@/libs/store/hooks';
import { redirect } from '@/i18n/routing';
import { withAuthAction } from '@/components/with-auth-action';
import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';
import { AuthForm } from '@/components/auth-form';
import styles from '@/app/[locale]/styles.module.scss';


const LoginComponent = () => {
    const { user } = useAppSelector(state => state.user);
    const t = useTranslations('Auth');
    const locale = useLocale();

    if (user) {
        redirect({
            href: '/',
            locale,
        });
    }

    const LoginForm = withAuthAction(AuthForm);

    return (
            <div className={styles.container}>
                <h2 className={styles.title}>{t('titleLogin')}</h2>

                <LoginForm mode={'login'} />
            </div>
    )
}

export default LoginComponent;
