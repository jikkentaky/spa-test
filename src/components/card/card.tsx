import React, { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
    title: string;
    content: string;
    footer?: string;
    onClick?: () => void;
};

export const Card: FC<Props> = ({ title, content, footer, onClick }) => {
    return (
        <div className={styles.card}>
            <div className={styles.card__title}>{title}</div>
            <div className={styles.card__content}>{content}</div>

            {footer && (
                <div className={styles.card__footer} onClick={onClick}>
                    {footer}
                </div>
            )}
        </div>
    );
};
