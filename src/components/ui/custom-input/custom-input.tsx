'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';

import styles from './styles.module.scss';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className = '', ...props }, ref) => {
        return (
            <div className={clsx(styles.inputWrapper, { [styles.error]: error }, className)}>
                {label && <label className={styles.inputLabel}>{label}</label>}

                <div className={styles.inputContainer}>
                    {icon && <span className={styles.inputIcon}>{icon}</span>}

                    <input ref={ref} className={styles.inputField} {...props} />
                </div>

                {error && <span className={styles.inputError}>{error}</span>}
            </div>
        );
    }
);
