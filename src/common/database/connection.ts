import knex, { Knex } from 'knex'
import { DB } from '../interfaces/db.interface'

const a = knex({
    client: 'mysql',
    connection: {
        database: 'prestamos',
        user: 'root',
        password: 'marlyn2010',
        host: '127.0.0.1',
        requestTimeout: 30000,
        options: {
            encrypt: false, // Modificar a false si la conexión es local
        },
        port: 3306,
        pool: {
            min: 1,
            max: 10,
            idleTimeoutMillis: 60000,
        },
    },
})

class Connection {
    dbCollection: Record<string, Knex>
    defaultConnectionName = 'DB_PRESTAMOS'
    constructor() {
        const prestamosDbSettings: DB = {
            client: 'mysql',
            connection: {
                database: 'prestamos',
                user: 'root',
                password: 'marlyn2010',
                host: '127.0.0.1',
                requestTimeout: 30000,
                options: {
                    encrypt: false, // Modificar a false si la conexión es local
                },
                port: 3306,
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
