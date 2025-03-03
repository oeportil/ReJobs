import axiosClient from "../utils/axiosClient"

export const useVacante = () => {

    const createVacante = async (vacante: unknown, setErrores: (err: string[]) => void) => {
        try {
            await axiosClient.post('/vacantes/crear', vacante);
        } catch (error) {
            setErrores(["Error Al Crear Vacante"]);
            console.log(error);
        }
    }

    const disableVacante = async (id: number) => {
        try {
            await axiosClient.put(`/vacantes/desactivar/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const getVacante = async (id: number) => {
        try {
            const response = await axiosClient.get(`/vacantes/${id}`);
            return response.data.vacante;
        } catch (error) {
            console.log(error);
        }
    }

    const updateVacante = async (vacante: unknown, id: number) => {
        try {
            await axiosClient.put(`/vacantes/actualizar/${id}`, vacante);
        } catch (error) {
            console.log(error);
        }
    }

    //listar 
    const listAllVacantes = async () => {
        try {
            const response = await axiosClient.post(`/vacantes/all`);
            return response.data.vacantes;
        } catch (error) {
            console.log(error);
        }
    }

    const listVacantesSearch = async (search: string) => {
        try {
            const response = await axiosClient.post(`/vacantes/buscar`, { dato: search, asc: false });
            return response.data.vacantes;
        } catch (error) {
            console.log(error);
        }
    }


    const listVacantesSearchSubCat = async (search: string, subcat: number) => {
        try {
            const response = await axiosClient.post(`/vacantes/buscar/subcategoria`, { dato: search, asc: false, idSubCategoria: subcat });
            return response.data.vacantes;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        createVacante,
        disableVacante,
        getVacante,
        updateVacante,
        listAllVacantes,
        listVacantesSearch,
        listVacantesSearchSubCat,
    }
}