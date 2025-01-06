'use client';

import { ChangeEvent, FC, useActionState, useEffect, useState } from 'react';

import { fetchProducts } from '@/actions/products-controller';
import { ProductComponent } from '@/components/products-list/components/product/product';
import { Product } from '@/types/types';

import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

type Props = {
    products: Product[];
};

export const ProductsList: FC<Props> = ({ products }) => {
    const [selectedType, setSelectedType] = useState('');
    const [currentProducts, setCurrentProducts] = useState(products);
    const t = useTranslations('Products');

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                const filteredProducts = await fetchProducts(selectedType);

                if (!filteredProducts) return;

                setCurrentProducts(filteredProducts);
            } catch (e) {
                console.error(e);
                toast.error('Error while filtering products');
            }
        };

        fetchFilteredProducts();
    }, [selectedType]);

    const productTypes = Array.from(new Set(products.map(({ type }) => type)));

    const handleSelectType = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    return (
        <div className={styles.productsList}>
            <div className={styles.productsList__header}>
                <h2 className={styles.productsList__title}>
                    {t('title')} / {currentProducts.length}
                </h2>

                <div className={styles.productsList__filter}>
                    <label htmlFor='productType' className={styles.productsList__filterLabel}>
                        {t('filter')}
                    </label>

                    <select
                        id='productType'
                        className={styles.productsList__filterSelect}
                        value={selectedType}
                        onChange={handleSelectType}>
                        <option value=''>All</option>
                        {productTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <ul className={styles.productsList__items}>
                {currentProducts.map((product) => (
                    <ProductComponent key={product._id} product={product} />
                ))}
            </ul>
        </div>
    );
};
