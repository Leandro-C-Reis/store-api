
export interface product {
    id: number;
    amount: number;
}

export interface Order {
    total_value: number;
    address_id: number;
    user_id: number;
    products?: [products];

    created_at?: string;
    updated_at?: string;
}

export interface Product {
    id: number | string;
    name: string;
    value: number;
    description: string;
    created_at: string | null;
    updated_at: string | null;
    inventory: {
        id: number | string;
        amount: number;
    }
}