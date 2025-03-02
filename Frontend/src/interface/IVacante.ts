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
    requisitos?: any[];
    activo?: boolean;
}