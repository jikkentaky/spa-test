'use client';

import { CustomInput } from '@/components/ui/custom-input/custom-input';
import { CustomButton } from '@/components/ui/custom-button/custom-button';
import { AuthMode } from '@/types/types';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import styles from './styles.module.scss';
import { useEffect } from 'react';

type Props = {
    isPending: boolean;
    error: string;
    mode: AuthMode;
    action:  (payload: FormData) => void
}

export const AuthForm = ({ action, isPending, error, mode }: Props) => {
    const t = useTranslations('Auth');

    useEffect(() => {
        if (error && !isPending) {
            toast.error(t(error));
        }
    }, [error, isPending]);

    return (
        <form action={action} className={`${styles.form} max-w-xs mx-auto flex flex-col gap-5`}>
            <CustomInput
                autoComplete='off'
                type='email'
                placeholder='Email'
                className={styles['form__input--email']}
                name='email'
            />

            <CustomInput
                autoComplete='off'
                type='password'
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
}
