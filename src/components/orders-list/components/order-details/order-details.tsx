import Image from 'next/image';

import { CloseButton } from '@/components/ui/close-button';
import { CustomButton } from '@/components/ui/custom-button';
import { DeleteButton } from '@/components/ui/delete-button';
import { AddIcon } from '@/components/ui/icons/add-icon';
import { OrderItem } from '@/types/types';

import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';

interface OrderDetailsProps {
    order: OrderItem;
    onClose: () => void;
}

export const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
    const t = useTranslations('OrderDetails');

    return (
        <div className={styles['order-details__container']}>
            <CloseButton onClick={onClose} className={styles['order-details__close-button']} />

            <div className={styles['order-details__header']}>
                <div className={styles['order-details__header-info']}>
                    <h3 className={styles['order-details__title']}>
                        Длинное название заказа {order.title}
                    </h3>
                </div>

                <CustomButton className={styles['order-details__add-product-button']}>
                    <AddIcon /> {t('addButton')}
                </CustomButton>
            </div>

            <div className={styles['order-details__content']}>
                <ul className={styles['order-details__list']}>
                    {order.products.map(({ id, status, title, photo }) => (
                        <li key={id} className={styles['order-details__item']}>
                            <div className={styles['order-details__product']}>
                                <div className={styles['order-details__image-container']}>
                                    <Image
                                        src={photo}
                                        alt={title}
                                        width={60}
                                        height={60}
                                        className={styles['order-details__image']}
                                    />
                                </div>

                                <div className={styles['order-details__product-info']}>
                                    <p className={styles['order-details__product-title']}>
                                        {title}
                                    </p>

                                    <p>
                                        {t('quantity')}: {order.productIds.length}
                                    </p>
                                </div>

                                <DeleteButton />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
