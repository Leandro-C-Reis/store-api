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
export const mongo_db = process.env.MONGO_DB;
export const mongo_uri = process.env.MONGO_URI;

export const jwt_secret = process.env.JWT_SECRET || 'SECRET';

export const consoleColors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgGray: "\x1b[37m",
    FgWhite: "\x1b[39m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
}