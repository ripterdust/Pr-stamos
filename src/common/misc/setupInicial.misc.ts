import { OpcionesMenu } from '../interfaces/opcionesMenu.interface'
import { Roles } from '../interfaces/roles.interface'

export const roles: Roles[] = [
    {
        nombre: 'Administrador',
    },
    {
        nombre: 'Cajero',
    },
    {
        nombre: 'Prestamista',
    },
]
export const opciones_menu: OpcionesMenu[] = [
    // Opciones de administrador
    {
        nombre: 'Opciones de Menú',
        rol_id: 1,
    },
    {
        nombre: 'Usuarios',
        rol_id: 1,
    },
    {
        nombre: 'Clientes',
        rol_id: 1,
    },
    {
        nombre: 'Roles',
        rol_id: 1,
    },
    {
        nombre: 'Ajustes',
        rol_id: 1,
    },
    {
        nombre: 'Prestamos',
        rol_id: 1,
    },
    // Opciones de cajero
    {
        nombre: 'Clientes',
        rol_id: 2,
    },
    {
        nombre: 'Prestamos',
        rol_id: 2,
    },
]
