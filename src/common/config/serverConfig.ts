import {config} from 'dotenv'
config()

interface ServerConfig{
    PORT: string | undefined,
    DB_NAME: string | undefined,
    DB_USER: string | undefined,
    DB_PASS: string | undefined,
    DB_HOST: string | undefined
}

export const serverConfig : ServerConfig = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST
}