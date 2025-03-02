export interface ICurriculum {
    id: number;
    descripcion: string;
    biografia: string;
    academicas: { descripcion: string, fecha: string, id: number, institucion: string, sede: string, titulo: string }[]; // Puedes definir un tipo más específico si sabes la estructura
    experiencias: { area: string, cargo: string, descripcion: string, empresa: string, fechaFin: string, fechaInicio: string, id: number }[];
    hitos: { descripcion: string, fecha: string, id: number, url: string, hito: string }[];
    idiomas: { id: 1, idioma: string }[];
    valores: { descripcion: string, id: number, valor: string }[];
};