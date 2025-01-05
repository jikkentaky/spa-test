type User = {
    userId: string;
    email: string;
};

type AuthMode = 'login' | 'signup';

type Guarantee = {
    start: string;
    end: string;
};

type Price = {
    value: number;
    symbol: string;
};

type Product = {
    _id: string;
    id: string;
    photo: string;
    title: string;
    type: string;
    guarantee: Guarantee;
    price: Price[];
    order: string;
    status: string;
    specification: string;
};

type Order = {
    id: string;
    title: string;
    status: string;
    specification: string;
    photo: string;
};

type OrderType = {
    _id?: string;
    id: string;
    title: string;
    date: string;
    description: string;
    productIds: string[];
    status: string;
    items: Order[];
};

type OrderItem = OrderType & {
    products: Product[];
    totalPrices: Price[];
};

export type { User, AuthMode, Product, OrderType, OrderItem, Price };
