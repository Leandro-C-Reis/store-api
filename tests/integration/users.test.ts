import request from 'supertest';
import app from '../../src/app';
import database from '../database';

beforeAll(async (done) => {
    await database.init();
    done();
})

afterAll(async (done) => {
    await database.drop();
    done();
})

describe('Users tests', () => {

    let user: any;

    it('Should create user', async () => {
        
        const response : any = await request(app)
            .post('/users').send({
                name: 'User Test',
                email: 'test@email.com',
                password: 'pswTest'
            });
        
        user = response.body;

        expect(response.status).toBe(200);
    });
    
    it('Should authenticate', async () => {

        const response : any = await request(app)
            .post('/login')
            .send({
                email: 'test@email.com',
                password: 'pswTest'
            });

        user['token'] = response.body.token;

        expect(response.body).toHaveProperty('token');
    });
});