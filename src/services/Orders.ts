import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../repositories/OrdersRepository';
import * as Types from '../types/types';

export default class Orders {

    public static async getAll() {
        const ordersRepo = getCustomRepository(OrdersRepository);
        const orders = await ordersRepo.find();

        return orders;
    }

    public static async getOne(id: number) {
        const ordersRepo = getCustomRepository(OrdersRepository);
        const order = await ordersRepo.findOne({ id });

        return order;
    }

    public static async create(data: Types.order) {
        const ordersRepo = getCustomRepository(OrdersRepository);
        const order = await ordersRepo.save(data);

        return order;
    }

    public static async update(data: any, id: number) {
        const ordersRepo = getCustomRepository(OrdersRepository);
        const order = await ordersRepo.update({ id }, data);

        return order;
    }

    public static async delete(id: number) {
        const ordersRepo = getCustomRepository(OrdersRepository);
        const deleted = await ordersRepo.delete({ id });

        return deleted;
    }

    public static async cancelOrder(id: number) {
        const ordersRepo = getCustomRepository(OrdersRepository);
        const order = await ordersRepo.update({ id }, { is_active: false });

        return order;
    }

    public static async getAllActives() {
        const ordersRepo = getCustomRepository(OrdersRepository);
        const orders = await ordersRepo.find({ is_active: true });

        return orders;
    }

    public static async getByUser(user_id: number) {
        const ordersRepo = getCustomRepository(OrdersRepository);
        const orders = await ordersRepo.find({ user_id });

        return orders;
    }
}