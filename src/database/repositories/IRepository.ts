import { Repository, Entity } from "typeorm";

export default class IRepository {
    repo : Repository<typeof Entity>;

    public async getAll()
    {
        return this.repo.find();
    }

    public async getOne(id: number)
    {
        return this.repo.findOne(id);
    }

    public async create(params: any)
    {
        return this.repo.insert(params);
    }

    public async update(params: any, id: number)
    {
        return this.repo.update(id, params);
    }

    public async delete(id: number)
    {
        return this.repo.delete(id);
    }
}