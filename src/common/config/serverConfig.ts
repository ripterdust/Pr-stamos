import { config } from 'dotenv'
config()

interface ServerConfig {
    PORT: string
    DB_NAME: string
    DB_USER: string
    DB_PASS: string
    DB_HOST: string
    DB_PORT: number
}

export const serverConfig: ServerConfig = {
    PORT: process.env.PORT || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '3306'),
}
