'use client';

import { FC, useCallback, useMemo, useState } from 'react';

import { DeletePopup } from '@/components/delete-popup';
import { OrderDetails } from '@/components/orders-list/components/order-details/order-details';
import { Order } from '@/components/orders-list/components/order/order';
import { OrderItem } from '@/types/types';

import { Modal } from '../ui/modal';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';

type Props = {
    ordersFromServer: OrderItem[];
};

export const OrderList: FC<Props> = ({ ordersFromServer = [] }) => {
    const [showOrder, setShowOrder] = useState<number | null>(null);
    const [orders, setOrders] = useState(ordersFromServer);
    const [isOpen, setIsOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<{ id: number; title: string } | null>(null);
    const t = useTranslations('Orders');
    const toggleMobileMenu = useCallback(
        (title?: string) => {
            setIsOpen(!isOpen);
            if (title) {
                setOrderToDelete(null);
            }
        },
        [isOpen]
    );

    const handleSelectOrder = (orderId: number) => {
        setShowOrder(orderId);
    };

    const handleCloseOrderDetails = () => {
        setShowOrder(null);
    };

    const handleDeleteOrder = useCallback((orderId: number) => {
        setOrders((prevOrders) => prevOrders.filter(({ id }) => +id !== orderId));
        setShowOrder(null);
    }, []);

    const handleDeleteClick = useCallback((orderId: number, title: string) => {
        setOrderToDelete({ id: orderId, title });
        setIsOpen(true);
    }, []);

    const selectedOrder = useMemo(
        () => orders.find(({ id }) => +id === showOrder),
        [orders, showOrder]
    );

    if (!orders.length) {
        return (
            <div className={styles['order-list__container']}>
                <h2 className={styles['order-list__title']}>{t('title')} / 0</h2>

                <p>{t('noOrders')}</p>
            </div>
        );
    }

    return (
        <div className={styles['order-list__container']}>
            <h2 className={styles['order-list__title']}>
                {t('title')} / {orders.length}
            </h2>

            <div className={styles['order-list__content']}>
                <ul className={styles['order-list__list']}>
                    {orders.map((order) => {
                        return (
                            <Order
                                key={order.id}
                                order={order}
                                onClick={() => handleSelectOrder(+order.id)}
                                isSelected={+order.id === showOrder}
                                isHidden={showOrder !== null}
                                onDelete={() => handleDeleteOrder(+order.id)}
                                onDeleteClick={(title) => handleDeleteClick(+order.id, title)}
                            />
                        );
                    })}
                </ul>

                {showOrder && selectedOrder && (
                    <OrderDetails order={selectedOrder} onClose={handleCloseOrderDetails} />
                )}
            </div>

            <Modal onClose={toggleMobileMenu} showMenu={isOpen}>
                <DeletePopup
                    onClose={() => toggleMobileMenu()}
                    onDelete={() => {
                        if (orderToDelete) {
                            handleDeleteOrder(orderToDelete.id);
                            toggleMobileMenu();
                        }
                    }}
                    title={orderToDelete?.title || ''}
                />
            </Modal>
        </div>
    );
};
