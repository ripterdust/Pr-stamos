import Model from '../../common/model'

export class ConfigModel extends Model {
    constructor() {
        super()

        this.nombreTabla = 'config'

        this.idTabla = 'config_id'
    }

    public async modificarCaja(cantidad: number) {
        const pool = await this.connection.getConnection(this.nombreConexion)
        let consulta = pool!.select('*').from('config').where('id', 1)

        console.log(consulta)
    }
}
