import knex, { Knex } from 'knex'
import { DB } from '../interfaces/db.interface'
import { serverConfig } from '../../common/config/serverConfig'
class Connection {
    dbCollection: Record<string, Knex>
    defaultConnectionName = 'DB_PRESTAMOS'
    constructor() {
        console.log(serverConfig)
        const prestamosDbSettings: DB = {
            client: 'mysql2',
            connection: {
                database: serverConfig.DB_NAME,
                user: serverConfig.DB_USER,
                password: serverConfig.DB_PASS,
                host: serverConfig.DB_HOST,
                requestTimeout: 30000,
                options: {
                    encrypt: false, // Modificar a false si la conexión es local
                },
                port: serverConfig.DB_PORT,
                pool: {
                    min: 1,
                    max: 10,
                    idleTimeoutMillis: 60000,
                },
            },
        }

        this.dbCollection = {
            DB_PRESTAMOS: knex(prestamosDbSettings),
        }
    }

    async getConnection(connectionName: string | false = false) {
        try {
            if (connectionName && connectionName != '') return this.dbCollection[connectionName]
            else return this.dbCollection[this.defaultConnectionName]
        } catch (err) {
            console.error(err)
        }
    }
}

export const connection = new Connection()
