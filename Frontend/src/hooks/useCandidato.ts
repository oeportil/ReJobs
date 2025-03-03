import axiosClient from "../utils/axiosClient"

export const useCandidato = () => {

    const existePostulacion = async (idPostulacion: number) => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN'))
        try {
            const response = await axiosClient.get(`/candidatos/exist/${id}/${idPostulacion}`);
            return response.data.existe;
        } catch (error) {
            console.log(error)
        }
    }

    const crearPostulacion = async (idVacante: number) => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN'))
        try {
            const response = await axiosClient.post(`/candidatos/crear`, { idUsuario: id, idVacante });
            return response.data.existe;
        } catch (error) {
            console.log(error)
        }
    }

    const listPostulaciones = async () => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN'))
        try {
            const response = await axiosClient.get(`/candidatos/usuario/${id}`);
            return response.data.candidaturas;
        } catch (error) {
            console.log(error)
        }
    }

    const listCandidatos = async (id: number) => {
        try {
            const response = await axiosClient.get(`/candidatos/vacante/${id}`);
            return response.data.candidaturas;
        } catch (error) {
            console.log(error)
        }
    }

    return {
        existePostulacion,
        crearPostulacion,
        listPostulaciones,
        listCandidatos
    }
}