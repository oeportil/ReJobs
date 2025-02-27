import { useNavigate } from "react-router";
import axiosClient from "../utils/axiosClient";
import { AxiosError } from "axios";


export const useDirection = () => {
    const navigate = useNavigate();


    const createDirection = async (newDirection: unknown, setErrores: (errores: string[]) => void) => {
        try {
            setErrores([]);
            await axiosClient.post('/api/direcciones/create', newDirection);
            navigate(-1);
        } catch (error: AxiosError | unknown) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.error ?? ""
                setErrores([message]);
            }
        }
    }

    const listDirections = async () => {
        try {
            const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN')!);
            const response = await axiosClient.get(`/api/direcciones/usuario/${id}`);
            return response.data
        } catch (error: unknown) {
            console.log(error.message);
        }
    }

    const deleteDirection = async (id: number) => {
        try {
            await axiosClient.delete(`/api/direcciones/delete/${id}`);

        } catch (error: unknown) {
            console.log(error.message);
        }

    }

    return {
        createDirection,
        listDirections,
        deleteDirection,
    }
}