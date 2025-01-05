import { FC, MouseEventHandler, useState } from 'react';

import { CustomButton } from '@/components/ui/custom-button';
import { DeleteButton } from '@/components/ui/delete-button';
import { ArrowIcon } from '@/components/ui/icons/arrow-icon';
import { BurgerIcon } from '@/components/ui/icons/burger-icon';
import { getFormattedDate } from '@/helpers';
import { OrderItem } from '@/types/types';

import styles from './styles.module.scss';
import clsx from 'clsx';
import { useLocale } from 'use-intl';

type Props = {
    order: OrderItem;
    onClick: MouseEventHandler<HTMLElement>;
    isHidden: boolean;
    isSelected: boolean;
    onDelete: (event: MouseEvent) => void;
    onDeleteClick: (title: string) => void;
};

export const Order: FC<Props> = ({ order, onClick, isHidden, isSelected, onDeleteClick }) => {
    const locale = useLocale();

    return (
        <li className={clsx(styles['order__item'], isHidden && styles['order__item--hidden'])}>
            <div onClick={onClick} className={styles['order__content']}>
                {!isHidden && (
                    <p className={styles['order__title']}>
                        Длинное предлинное название прихода {order.title}
                    </p>
                )}

                <div className={styles['order__product-wrapper']}>
                    <div className={styles['order__icon-container']}>
                        <BurgerIcon />
                    </div>

                    <p className={styles['order__product-info']}>
                        <span className={styles['order__product-info-count']}>
                            {order.productIds.length}
                        </span>
                        Продуктов
                    </p>
                </div>

                <p className={styles['order__date']}>{getFormattedDate(order.date, locale)}</p>

                {!isHidden && (
                    <ul className={styles['order__price-list']}>
                        {order.totalPrices.map((price) => (
                            <li key={price.symbol} className={styles['order__price-item']}>
                                {`${price.value} ${price.symbol}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {!isHidden ? (
                <DeleteButton onClick={() => onDeleteClick(order.title)} />
            ) : (
                <CustomButton
                    type='button'
                    onClick={onClick}
                    className={clsx(
                        styles['order__button--select'],
                        isSelected && styles['order__button--select--selected']
                    )}>
                    <ArrowIcon />
                </CustomButton>
            )}
        </li>
    );
};
