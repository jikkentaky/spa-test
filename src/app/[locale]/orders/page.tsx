import { useTranslations } from 'next-intl';

const Orders = () => {
    const t = useTranslations('Orders');

    return (
        <div>
            {t('title')}
        </div>
    )
};

export default Orders;
