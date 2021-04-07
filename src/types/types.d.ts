
export interface product {
    id: number;
    amount: number;
}

export interface order {
    total_value: number;
    address_id: number;
    user_id: number;
    products?: [product];

    created_at?: string;
    updated_at?: string;
}

export interface Inventory {
    id?: number;
    amount: number;
}

export interface Product {
    id: number;
    name: string;
    value: number;
    description: string;
    created_at: string | null;
    updated_at: string | null;
    inventory: Inventory;
    tags: Tag[] | string[];
}

export interface Tag {
    id?: number;
    tag: string;
    company_id?: number;
}

export interface Order extends order{
    id: number;
    is_active: boolean;
    products: [{
        id: number;
        amount: number;
        product: Product;   
    }];
}