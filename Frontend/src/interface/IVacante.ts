export interface IVacante {
    empresa: string;
    fechaInicio: string;
    fechaFin: string;
    contrato: string;
    nombre: string;
    ciudad: string;
    region: string;
    pais: string;
    emailContacto: string;
    idSubCategoria: number
    telefonoContacto: string;
    horario: string;
    formato: string;
    salario: number;
    descripcion: string;
    id?: number;
    requisitos?: IRequisito[];
    activo?: boolean;
    subCategoria?: {
        id: number;
        nombre: string;
        categoria: {
            id: number;
            nombre: string;
        }
    }
}

export interface IRequisito {
    id: number;
    nombre: string;
    descripcion: string;
    minimo: boolean;
}