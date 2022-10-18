import Model from '../../common/model'

export class ClienteModel extends Model {
    constructor() {
        super()
        this.nombreTabla = 'clientes'
        this.idTabla = 'cliente_id'
        this.camposTabla = [
            {
                nombre: this.idTabla,
                descripcion: 'Identificador de el usuario',
                requerido: false,
            },
            {
                nombre: 'nombre',
                descripcion: 'Nombre de cliente',
                requerido: true,
            },
            {
                nombre: 'correo',
                descripcion: 'Correo electrónico del cliente',
                requerido: true,
            },
            {
                nombre: 'telefono',
                descripcion: 'Teléfono del cliente',
                requerido: true,
            },
            {
                nombre: 'identificacion',
                descripcion: 'Número de identificación',
                requerido: true,
            },
            {
                nombre: 'nit',
                descripcion: 'Número de identificación tributaria',
                requerido: true,
            },
            {
                nombre: 'direccion',
                descripcion: 'Dirección del cliente',
                requerido: true,
            },
            {
                nombre: 'fecha_nacimiento',
                descripcion: 'Fecha de nacimiento del cliente',
                requerido: true,
            },
            {
                nombre: 'prestamista_id',
                descripcion: 'Identificador del prestamista',
                requerido: true,
            },
        ]
        this.nombreCampos = this.obtenerCampos()
    }
}
