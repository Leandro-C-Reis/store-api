import { EntityRepository, Repository } from "typeorm";
import Order from "../models/Order";

@EntityRepository(Order)
export default class OrdersRepository extends Repository<Order>{}