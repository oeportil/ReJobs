import { AxiosError } from "axios";
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

    const revisarCandidato = async (revision: unknown) => {
        try {
            await axiosClient.put(`/candidatos/revisar`, revision);
        } catch (error) {
            console.log(error)
        }
    }

    const countPostulacion = async () => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN'))
        try {
            const response = await axiosClient.get(`/candidatos/usuario/${id}/count`);
            return response.data.total;
        } catch (error) {
            console.log(error)
        }

    }

    const getCandidato = async (id: number) => {
        try {
            const response = await axiosClient.get(`/api/usuarios/${id}`);
            return response.data;
        } catch (error: AxiosError | unknown) {
            console.log(error);
        }
    }

    return {
        existePostulacion,
        crearPostulacion,
        listPostulaciones,
        listCandidatos,
        revisarCandidato,
        countPostulacion,
        getCandidato
    }
}