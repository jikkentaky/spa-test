'use server';

import { unstable_cache } from 'next/cache';

import { serializeDocument } from '@/helpers';
import { getCollection } from '@/libs/db/db';
import { OrderType, Price, Product } from '@/types/types';

export const fetchOrders = async () => {
    try {
        const ordersCollection = await getCollection<OrderType>('orders');
        const productsCollection = await getCollection<Product>('products');

        const orders = await ordersCollection.find({}).toArray();
        const serializedOrders = orders.map(serializeDocument);

        const productIds = [...new Set(orders.flatMap((order) => order.productIds))];

        const query = {
            $or: [{ _id: { $in: productIds } }, { id: { $in: productIds } }]
        };

        const products = await productsCollection.find(query).toArray();

        const serializedProducts = products.map(serializeDocument);
        const productsMap = new Map(
            serializedProducts.map((product) => [product.id || product._id, product])
        );

        return serializedOrders.map((order) => {
            const orderProducts = order.productIds
                .map((productId) => {
                    const product = productsMap.get(productId);
                    if (!product) return;

                    return product;
                })
                .filter((item): item is NonNullable<typeof item> => item !== undefined);

            const totalPrices = orderProducts.reduce((acc, product) => {
                product.price.forEach((price) => {
                    const currentTotal = acc.find((p) => p.symbol === price.symbol);

                    if (currentTotal) {
                        currentTotal.value += price.value;
                    } else {
                        acc.push({ ...price });
                    }
                });

                return acc;
            }, [] as Price[]);

            return {
                ...order,
                products: orderProducts,
                totalPrices
            };
        });
    } catch (error) {
        console.error(error);

        return [];
    }
};

export const getOrders = unstable_cache(fetchOrders, ['fetchOrders'], { revalidate: 60 });
