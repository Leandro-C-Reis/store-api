
export default class IService {

    protected static getId(created: any) {
        return created.identifiers[0].id;
    }
}