import axiosClient from "../utils/axiosClient"

export const useVacante = () => {

    const createVacante = async (vacante: unknown, setErrores: (err: string[]) => void) => {
        try {
            await axiosClient.post('/vacantes/crear', vacante);
        } catch (error) {
            setErrores(["Error Al Crear Vacante"]);
            console.log(error);
        }
    }

    const disableVacante = async (id: number) => {
        try {
            await axiosClient.put(`/vacantes/desactivar/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        createVacante,
        disableVacante
    }
}