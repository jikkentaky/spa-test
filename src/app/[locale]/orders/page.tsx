import { getOrders } from '@/actions/orders-controller';
import { OrderList } from '@/components/orders-list/order-list';

const Orders = async () => {
    const orders = await getOrders();

    return (
        <div>
            <OrderList ordersFromServer={orders} />
        </div>
    );
};

export default Orders;
