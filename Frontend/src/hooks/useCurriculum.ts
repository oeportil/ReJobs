import { AxiosError } from "axios";
import axiosClient from "../utils/axiosClient";

export const useCurriculum = () => {
    const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN'));

    const getCurriculum = async () => {
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
    return {
        getCurriculum,
        createCurriculum,
        updateCurriculum
    }
}