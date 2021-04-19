import AddressRepository from '../database/repositories/AddressRepository';
import IService from './IService';

export default class Address extends IService{

    public static async getAll()
    {
        const addresses = new AddressRepository();

        return await addresses.getAll();
    }

    public static async getOne(id: number)
    {
        const addresses = new AddressRepository();

        return await addresses.getOne(id);
    }

    public static async create(params: any) 
    {
        const addresses = new AddressRepository();
        
        params.created_at = this.timestamps();
        
        const created = await addresses.create(params);
        const address = await addresses.getOne(this.getId(created));

        return address;
    }

    public static async update(params: any, id: number)
    {
        const addresses = new AddressRepository();

        params.updated_at = this.timestamps();
    
        await addresses.update(params, id);
        const address = await addresses.getOne(id);

        return address;
    }

    public static async delete(id: number)
    {
        const addresses = new AddressRepository();

        return await addresses.delete(id);
    }

    public static async validate(id: number)
    {
        const addresses = new AddressRepository();

        const find = await addresses.getOne(id);
        
        if (!find)
        {
            return false;
        }

        return true;
    }
}