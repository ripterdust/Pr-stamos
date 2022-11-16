"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const knex_1 = __importDefault(require("knex"));
const serverConfig_1 = require("../../common/config/serverConfig");
class Connection {
    constructor() {
        this.defaultConnectionName = 'DB_PRESTAMOS';
        console.log(serverConfig_1.serverConfig);
        const prestamosDbSettings = {
            client: 'mysql2',
            connection: {
                database: serverConfig_1.serverConfig.DB_NAME,
                user: serverConfig_1.serverConfig.DB_USER,
                password: serverConfig_1.serverConfig.DB_PASS,
                host: serverConfig_1.serverConfig.DB_HOST,
                requestTimeout: 30000,
                options: {
                    encrypt: false, // Modificar a false si la conexión es local
                },
                port: serverConfig_1.serverConfig.DB_PORT,
                pool: {
                    min: 1,
                    max: 10,
                    idleTimeoutMillis: 60000,
                },
            },
        };
        this.dbCollection = {
            DB_PRESTAMOS: (0, knex_1.default)(prestamosDbSettings),
        };
    }
    getConnection(connectionName = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (connectionName && connectionName != '')
                    return this.dbCollection[connectionName];
                else
                    return this.dbCollection[this.defaultConnectionName];
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.connection = new Connection();
