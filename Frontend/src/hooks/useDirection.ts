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

    return {
        createDirection
    }
}