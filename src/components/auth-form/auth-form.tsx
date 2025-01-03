'use client';

import { CustomButton } from '@/components/ui/custom-button/custom-button';
import { CustomInput } from '@/components/ui/custom-input/custom-input';
import { useAuthRedirect } from '@/custom-hooks/use-auth-redirect';
import { useErrorHandler } from '@/custom-hooks/use-error-handler';
import { AuthMode } from '@/types/types';

import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';

type Props = {
    isPending: boolean;
    error: string;
    mode: AuthMode;
    action: (payload: FormData) => void;
};

export const AuthForm = ({ action, isPending, error, mode }: Props) => {
    const t = useTranslations('Auth');

    useAuthRedirect();
    useErrorHandler(error, isPending);

    return (
        <form action={action} className={`${styles.form} max-w-xs mx-auto flex flex-col gap-5`}>
            <CustomInput
                autoComplete='off'
                defaultValue={'tttt@tty.fd'}
                type='email'
                placeholder='Email'
                className={styles['form__input--email']}
                name='email'
            />

            <CustomInput
                autoComplete='off'
                type='password'
                defaultValue={'ZZtttt21tty.fd'}
                placeholder='Password'
                className={styles['form__input--password']}
                name='password'
            />

            <CustomButton type='submit' disabled={isPending}>
                {mode === 'signup' ? t('signUpButton') : t('loginButton')}
            </CustomButton>

            {isPending && <p className={styles['form__message--pending']}>Please wait...</p>}
        </form>
    );
};
