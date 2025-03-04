import { AxiosError } from "axios";
import axiosClient from "../utils/axiosClient";

export const useUsuario = () => {

    const getUsuario = async () => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN')!);
        try {
            const response = await axiosClient.get(`/api/usuarios/${id}`);
            return response.data;
        } catch (error: AxiosError | unknown) {
            console.log(error);
        }
    }
    const getImg = async () => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN')!);
        try {
            const response = await axiosClient.get(`/api/usuarios/${id}/imagen`, {
                responseType: "arraybuffer"
            });

            const blob = new Blob([response.data], { type: "image/png" }); // Cambia el MIME si es otro tipo de imagen
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
        } catch (error: AxiosError | unknown) {
            console.log(error);
        }
    }

    const updateUsuario = async (usuario: unknown, setErrores: (err: string[]) => void,
        setExito: (err: string[]) => void, exito: string[]) => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN')!);
        try {
            setErrores([]);
            const response = await axiosClient.put(`/api/usuarios/${id}`, usuario);
            console.log(response.data.mensaje);
            setExito([...exito, "Usuario Actualizado con Exito"]);
            return
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.error ?? ""
                setErrores([message]);
            }
        }
    }

    const updatePassword = async (password: string, setErrores: (err: string[]) => void,
        setExito: (err: string[]) => void, exito: string[]) => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN')!);
        try {
            setErrores([]);
            const response = await axiosClient.put(`/api/usuarios/${id}/password`, { password });
            return setExito([...exito, response.data.mensaje]);
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.error ?? ""
                setErrores([message]);
            }
        }
    }

    const updateImg = async (img: FormData, setErrores: (err: string[]) => void,
        setExito: (err: string[]) => void, exito: string[]) => {
        const { id } = JSON.parse(localStorage.getItem('REJOBS_TOKEN')!);
        try {
            setErrores([]);
            const response = await axiosClient.post(`/api/usuarios/${id}/upload`, img);
            console.log(response);
            setExito([...exito, response.data.mensaje]);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            return
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.error ?? ""
                setErrores([message]);
            }
        }
    }


    return {
        getUsuario,
        updateUsuario,
        updatePassword,
        updateImg,
        getImg
    }
}