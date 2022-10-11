export interface Campo {
    nombre: string
    descripcion: string
    requerido: boolean
    alias?: string
    unico?: boolean
    tipoDato?: string
    longitudMaxima?: number
    longitudMinima?: number
    valorMaximo?: number
    valorMinimo?: number
    regExp?: string
    fnValidar?: any
    fnCriterioInvalidez?: string
    fnValorEsperado?: string
    tablaOrigen?: string
}
