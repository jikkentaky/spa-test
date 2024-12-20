import { useTranslations } from 'next-intl';

const Products = () => {
    const t = useTranslations('Products');

    return (
        <div>
            {t('title')}
        </div>
    )
};

export default Products;
