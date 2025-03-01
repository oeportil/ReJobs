import { AxiosResponse } from "axios";
import axiosClient from "../utils/axiosClient";

export const useCategoria = () => {

    const listCategorias = async () => {
        try {
            const response: AxiosResponse = await axiosClient.get('/api/categorias');
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    const subCategoriasByID = async (id: number) => {
        try {
            const response: AxiosResponse = await axiosClient.get(`/subcategorias/categoria/${id}`);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }

    return {
        listCategorias,
        subCategoriasByID
    }
}