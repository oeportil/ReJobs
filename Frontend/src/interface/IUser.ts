export interface IUsuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    pfp: string;
    curriculum: string | null;
    reclutador: boolean;
    idUsuario?: number;
}