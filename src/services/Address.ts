import { getCustomRepository } from "typeorm";
import AddressRepository from "../repositories/AddressesRepository";

export default class Addresses {

    public static async getAll() {
        const addressRepo = getCustomRepository(AddressRepository);
        const addresses = await addressRepo.find();

        return addresses;
    }

    public static async getOne(id: number) {
        const addressRepo = getCustomRepository(AddressRepository);
        const address = await addressRepo.findOne({ id });

        return address;
    }

    public static async create(data: any) {
        const addressRepo = getCustomRepository(AddressRepository);
        const address = await addressRepo.save(data);

        return address;
    }

    public static async update(data: any, id: number) {
        const addressRepo = getCustomRepository(AddressRepository);
        const address = await addressRepo.update({ id }, data);

        return address;
    }

    public static async delete(id: number) {
        const addressRepo = getCustomRepository(AddressRepository);
        const deleted = await addressRepo.delete({ id });

        return deleted;
    }
}