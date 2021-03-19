import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as T from '../types/pagseguro';

export default class PagSeguro {

    protected base_url = 'https://sandbox.api.pagseguro.com/charges';

    protected api: AxiosInstance;

    constructor()
    {
        this.api = axios.create({ baseURL: this.base_url });
    }

    public async create(props: any) 
    {    
        if (props.payment_method.type == "BOLETO")
        {
            const response = await this.boleto(props);
            return response.data;
        }
        else if (props.payment_type.type == "CREDIT_CARD")
        {
            const response = await this.card(props);
            return response.data;
        }

        return false;
    }

    public async getById(id: string)
    {
        const response = await this.api.get(`/${id}`);

        return response.data;
    }

    public async getByReference(reference: string)
    {
        const response = await this.api.get(`?reference_id=${reference}`);

        return response.data;
    }

    public async capture(id: string)
    {
        const response = await this.api.post(`/${id}/capture`);

        return response.data;
    }

    public async cancel(id: string, props: any)
    {
        const response = await this.api.post(`/${id}/cancel`, { 
            amount: {
                value: props.value
            }
        });

        return response.data;
    }

    protected async boleto(props: T.cobranca)
    {   
        // card request example
        const boleto: T.cobranca = {
            reference_id: "ex-00001",
            description: "Motivo da cobrança",
            amount: {
              value: 1000,
              currency: "BRL"
            },
            payment_method: {
              type: "BOLETO",
              boleto: {
                due_date: "2019-05-08",
                instruction_lines: {
                  line_1: "Pagamento processado para DESC Fatura",
                  line_2: "Via PagSeguro"
                },
                holder: {
                  name: "Jose da Silva",
                  tax_id: "22222222222",
                  email: "jose@email.com",
                  address: {
                    country: "Brasil",
                    region: "São Paulo",
                    region_code: "SP",
                    city: "Sao Paulo",
                    postal_code: "01452002",
                    street: "Avenida Brigadeiro Faria Lima",
                    number: "1384",
                    locality: "Pinheiros"
                  }
                }
              }
            },

            notification_urls: [
              "https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/"
            ]
        }

        return await this.api.post('', boleto);
    }

    protected async card(props: T.cobranca)
    {
        // card request example
        const card: T.cobranca = {
            reference_id: "ex-00001",
            description: "Motivo da cobrança",
            amount: {
                value: 1000,
                currency: "BRL"
            },
            payment_method: {
                type: "CREDIT_CARD",
                installments: 1,
                capture: true,
                card: {
                    number: "4111111111111111",
                    exp_month: 3,
                    exp_year: 2026,
                    security_code: "123",
                    holder: {
                        name: "Jose da Silva",
                        tax_id: "12212132"
                    }
                }
            }
        };

        return await this.api.post('', card);
    }
}
