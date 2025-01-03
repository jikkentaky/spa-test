'use server';

import { unstable_cache } from "next/cache";
import { getCollection } from '@/libs/db/db';
import { Product } from '@/types/types';
import { serializeDocument } from '@/helpers';

export const fetchProducts = async (type?: string)=> {
    try {

        const productsCollection = await getCollection<Product>('products');
        const query = type ? { type } : {};

        const products = await productsCollection.find(query).toArray();

        return products.map(serializeDocument);
    } catch (error) {
        console.error(error);

        return null;
    }
}

export const getProducts = unstable_cache(fetchProducts, ['fetchBars'], { revalidate: 60 });
