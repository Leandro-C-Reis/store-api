
interface amount {
    value: number;
    currency: string;
};

interface payment_method {
    type: 'CREDIT_CARD'|'BOLETO';
    installments?: number;
    capture?: boolean;
    card?: card;
    boleto?: boleto;
};

interface card {
    id?: string,
    number?: string;
    encrypted?: string;
    exp_month: number;
    exp_year: number;
    security_code?: string;
    store?: boolean;
    holder: {
        name: string;
        tax_id: string;
    }
};

interface boleto {
    due_date: string;
    instruction_lines?: {
        line_1?: string;
        line_2?: string;
    };
    holder: {
        name: string;
        tax_id: string;
        email: string;
        address: {
            country: string;
            street: string;
            number: string;
            locality: string;
            city: string;
            region?: string;
            region_code: string;
            postal_code: string;
        }
    }
};

export interface cobranca {
    reference_id?: string;
    description?: string;
    payment_method: payment_method;
    amount: amount;
    notification_urls?: [string];
};
