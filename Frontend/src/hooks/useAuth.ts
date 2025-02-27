import { useEffect } from "react";
import { useNavigate } from "react-router"
import axiosClient from "../utils/axiosClient";


type AuthType = {
    middleware?: string;
}

export const useAuth = ({ middleware }: AuthType) => {
    const token = localStorage.getItem('REJOBS_TOKEN');
    const navigate = useNavigate();
    const logout = () => {
        //elminar el localstorage
        navigate("/auth");
    }
    const login = () => {

    }

    const register = async (newUser: unknown): Promise<string | void> => {
        try {
            const response = await axiosClient.post('/api/usuarios/create', newUser);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (middleware == 'guest' && token) {
            navigate('/');
        }
        if (middleware == 'auth' && !token) {
            navigate('/auth');
        }
    }, [middleware, token, navigate])
    return {
        logout,
        token,
        login,
        register
    }
}