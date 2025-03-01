export interface ICurriculum {
    id: number;
    descripcion: string;
    biografia: string;
    academicas: any[]; // Puedes definir un tipo más específico si sabes la estructura
    experiencias: any[];
    hitos: any[];
    idiomas: any[];
    valores: any[];
};