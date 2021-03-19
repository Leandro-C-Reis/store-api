import axios, { AxiosInstance } from 'axios';
import converter from 'xml-js';

export default class Correios {

    private base_url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?';

    private api: AxiosInstance;

    constructor()
    {
        this.api = axios.create({ baseURL: this.base_url });
    }

    public async shipping(props: any)
    {
        const request = {
            'nCdServico': '04510',
            'sCepOrigem': '00000000',
            'sCepDestino': '00000000',
            'nVlPeso': '1', // em Kg
            'nCdFormato': 1,
            'nVlComprimento': 20, // em Cm
            'nVlAltura': 2,
            'nVlLargura': 20,
            'nVlDiametro': 0,
            'sCdMaoPropria': 'n',
            'nVlValorDeclarado': 0,
            'sCdAvisoRecebimento': 'n'
        };

        const urlParameters = Object.entries(request).map(e => e.join('=')).join('&');
        const response = await this.api.get(`nCdEmpresa&sDsSenha&${urlParameters}&StrRetorno=xml&nIndicaCalculo=3`);
        const jsonShipping = this.xmlToJson(response.data);
        
        return JSON.parse(jsonShipping);
    }   

    protected jsonToXml(json: string)
    {
        return converter.json2xml(json);
    }

    protected xmlToJson(xml: string)
    {
        return converter.xml2json(xml);
    }
}