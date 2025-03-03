import axiosClient from "../utils/axiosClient"

export const useRequisito = () => {
    const createRequisito = async (requisito: unknown) => {
        try {
            await axiosClient.post(`/requisitos/crear`, requisito);
        } catch (error) {
            console.log(error)
        }

    }

    const deleteRequisito = async (id: number) => {
        try {
            await axiosClient.delete(`/requisitos/eliminar/${id}`);
        } catch (error) {
            console.log(error)
        }
    }

    const listRequisitos = async (idVacante: number) => {
        try {
            const response = await axiosClient.get(`/requisitos/vacante/${idVacante}`);
            return response.data.requisitos;
        } catch (error) {
            console.log(error)
        }
    }
    return {
        createRequisito,
        deleteRequisito,
        listRequisitos,
    }
}