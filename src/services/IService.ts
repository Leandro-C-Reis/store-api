
export default class IService {
    protected static timestamps()
    {
        const date = new Date();

        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}*${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }

    protected static getId(created: any)
    {
        return created.identifiers[0].id;
    }
}