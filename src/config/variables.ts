import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV  == 'test' ? '.env.test' : '.env'
});

export const port = process.env.PORT;
export const db_host = process.env.DB_HOST;
export const db_port = parseInt(process.env.DB_PORT || '');
export const db_name = process.env.DB_NAME;
export const db_user = process.env.DB_USER;
export const db_password = process.env.DB_PASSWORD;