'use client';

import { FC } from 'react';

import Image from 'next/image';

import { getFormattedDate } from '@/helpers';
import { Product } from '@/types/types';

import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import { useLocale } from 'use-intl';

type Props = {
    product: Product;
};

export const ProductComponent: FC<Props> = ({ product }) => {
    const locale = useLocale();

    return (
        <li className={styles.product}>
            <div className={styles.product__image}>
                <Image src={product.photo} alt={product.type} width={60} height={60} />
            </div>

            <p className={styles.product__title}>{product.title}</p>

            <p className={styles.product__type}>{product.type}</p>

            <div className={styles.product__guarantee}>
                <p>с {getFormattedDate(product.guarantee.start, locale)}</p>

                <p>по {getFormattedDate(product.guarantee.end, locale)}</p>
            </div>

            <ul className={styles.product__priceList}>
                {product.price.map(({ value, symbol }, index) => (
                    <li key={index} className={styles.product__priceItem}>
                        <p>{value}</p>

                        <p>{symbol}</p>
                    </li>
                ))}
            </ul>

            <p className={styles.product__order}>{product.order}</p>
        </li>
    );
};
