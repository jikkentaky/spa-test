import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import styles from './styles.module.scss';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode;
    variant?: 'primary' | 'secondary';
};

export const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, icon, variant = 'primary', className = '', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={clsx(styles.button, styles[`button--${variant}`], className)}
                {...props}>
                {icon && <span className={styles.button__icon}>{icon}</span>}

                {children}
            </button>
        );
    }
);
