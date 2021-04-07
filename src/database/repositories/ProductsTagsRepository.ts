import { Repository, getRepository } from 'typeorm';
import TagsModel from '../models/Tags';
import IRepository from './IRepository';

export default class ProductsTagsRepository extends IRepository{
    repo: Repository<any>

    constructor()
    {
        super()
        {
            const repo = getRepository(TagsModel);

            this.repo = repo;
        }
    }
}