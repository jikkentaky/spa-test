import { getProducts } from '@/actions/products-controller';
import { ProductsList } from '@/components/products-list/products-list';

const Products = async () => {
    const products = await getProducts();

    if (!products) {
        return <div>Failed to fetch products</div>;
    }

    return (
        <div>
            <ProductsList products={products} />
        </div>
    );
};

export default Products;
