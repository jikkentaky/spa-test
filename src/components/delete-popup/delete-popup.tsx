import { FC } from 'react';

import { CustomButton } from '@/components/ui/custom-button';
import { BucketIcon } from '@/components/ui/icons/bucket-icon';

import styles from './styles.module.scss';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type Props = {
    onClose: () => void;
    onDelete: () => void;
    title: string;
};

export const DeletePopup: FC<Props> = ({ onClose, onDelete, title }) => {
    const t = useTranslations('DeletePopup');

    return (
        <div className={styles['delete-popup']}>
            <div className={styles['delete-popup__content']}>
                <h2 className={styles['delete-popup__title']}>{t('title')}</h2>

                <p className={styles['delete-popup__description']}>
                    Длинное предлинное название прихода {title}
                </p>
            </div>

            <div className={styles['delete-popup__footer']}>
                <CustomButton
                    type='button'
                    onClick={onClose}
                    className={clsx(
                        styles['delete-popup__button'],
                        styles['delete-popup__button--cancel']
                    )}>
                    {t('cancel')}
                </CustomButton>

                <CustomButton
                    type='button'
                    onClick={onDelete}
                    className={clsx(
                        styles['delete-popup__button'],
                        styles['delete-popup__button--delete']
                    )}>
                    <BucketIcon />
                    {t('delete')}
                </CustomButton>
            </div>
        </div>
    );
};
