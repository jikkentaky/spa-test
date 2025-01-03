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
    photo: string;
    title: string;
    type: string;
    guarantee: Guarantee;
    price: Price[];
    order: string;
};

export type { User, AuthMode, Product };
