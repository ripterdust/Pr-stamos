"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./common/routes");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const serverConfig_1 = require("./common/config/serverConfig");
// Initilializations
const app = (0, express_1.default)();
// Config
app.set('port', serverConfig_1.serverConfig.PORT || 8000);
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
// Routers
routes_1.rutas.map((ruta) => app.use(ruta.endpoint, ruta.router));
app.use('*', (req, res) => {
    const respuesta = {
        statusCode: 404,
        message: 'Recurso no encontrado',
    };
    res.status(respuesta.statusCode).json(respuesta);
});
// Listening
app.listen(app.get('port'), () => console.log(`App running on port ${app.get('port')}`));
