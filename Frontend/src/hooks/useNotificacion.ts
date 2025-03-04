import axiosClient from "../utils/axiosClient";

export const useNotificacion = () => {

    const addNotificacion = async (noti: unknown) => {
        try {
            await axiosClient.post(`/notificaciones/create`, noti);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteNotificacion = async (id: number) => {
        try {
            await axiosClient.delete(`/notificaciones/delete/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const getNotificaciones = async (id: number) => {
        try {
            const response = await axiosClient.get(`/notificaciones/usuario/${id}`);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    return {
        addNotificacion,
        deleteNotificacion,
        getNotificaciones
    }
}