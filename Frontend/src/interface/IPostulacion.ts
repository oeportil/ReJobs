export interface IPostulacion {
    id: number;
    fechaCan: string;  // ISO 8601 datetime format
    fechaDisp: string | null;
    nota: string | null;
    estado: number;
    revisado: boolean;
    nombre: string;
    empresa: string;
    idVacante: number;
};
