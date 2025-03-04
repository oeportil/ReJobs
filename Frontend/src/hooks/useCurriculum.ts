import { AxiosError } from "axios";
import axiosClient from "../utils/axiosClient";

export const useCurriculum = () => {
    const { id: idUser } = JSON.parse(localStorage.getItem('REJOBS_TOKEN') ?? '{}');

    const getCurriculum = async (id: number = idUser) => {
        try {
            const response = await axiosClient.get(`/curriculum/usuario/${id}`);
            return response.data;
        } catch (error: AxiosError<{ error: string }> | unknown) {
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const createCurriculum = async (cv: unknown) => {
        try {
            await axiosClient.post(`/curriculum/create`, cv);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const updateCurriculum = async (cv: unknown, id: number) => {
        try {
            await axiosClient.put(`/curriculum/update/${id}`, cv);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const createIdioma = async (idioma: unknown) => {
        try {
            await axiosClient.post(`/idiomas/create`, idioma);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }

    }
    const deleteIdioma = async (id: number) => {
        try {
            await axiosClient.delete(`/idiomas/delete/${id}`);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }
    const createValor = async (valor: unknown) => {
        try {
            await axiosClient.post(`/valores/create`, valor);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const deleteValor = async (id: number) => {
        try {
            await axiosClient.delete(`/valores/delete/${id}`);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const createHito = async (hito: unknown) => {
        try {
            await axiosClient.post(`/hitos/create`, hito);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const deleteHito = async (id: number) => {
        try {
            await axiosClient.delete(`/hitos/delete/${id}`);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }


    const createTitulo = async (titulo: unknown) => {
        try {
            await axiosClient.post(`/academica/create`, titulo);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const deleteTitulo = async (id: number) => {
        try {
            await axiosClient.delete(`/academica/delete/${id}`);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const createExperiencia = async (titulo: unknown) => {
        try {
            await axiosClient.post(`/experiencia/create`, titulo);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    const deleteExperiencia = async (id: number) => {
        try {
            await axiosClient.delete(`/experiencia/delete/${id}`);
        } catch (error: AxiosError<{ error: string }> | unknown) {
            console.log(error)
            if (error instanceof AxiosError) {
                console.log(error.response.data.error);
            }
        }
    }

    return {
        getCurriculum,
        createCurriculum,
        updateCurriculum,
        createIdioma,
        deleteIdioma,
        createValor,
        deleteValor,
        createHito,
        deleteHito,
        createTitulo,
        deleteTitulo,
        createExperiencia,
        deleteExperiencia,
    }
}