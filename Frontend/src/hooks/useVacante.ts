import axiosClient from "../utils/axiosClient"

export const useVacante = () => {

    const createVacante = async (vacante: unknown) => {
        try {
            await axiosClient.post('/vacantes/crear', vacante);
        } catch (error) {
            console.log(error);
        }
    }



    return {
        createVacante
    }
}