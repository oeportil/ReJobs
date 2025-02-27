import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router"
import axiosClient from "../utils/axiosClient";
import { AxiosError } from "axios";


type AuthType = {
    middleware?: string;
}

export const useAuth = ({ middleware }: AuthType) => {
    const token = localStorage.getItem('REJOBS_TOKEN');
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const logout = () => {
        //elminar el localstorage
        localStorage.removeItem('REJOBS_TOKEN');
        // redireccionar al login
        navigate("/auth");
    }
    const login = async (newUser: unknown, setErrores: (errores: string[]) => void) => {
        try {
            setErrores([]);
            const response = await axiosClient.post('/api/usuarios/login', newUser);
            localStorage.setItem('REJOBS_TOKEN', JSON.stringify(response.data.usuario));
            navigate('/');
        } catch (error: AxiosError | unknown) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.error ?? ""
                setErrores([message]);
            }
        }
    }

    const register = async (newUser: unknown, setErrores: (errores: string[]) => void): Promise<void> => {
        try {
            setErrores([]);
            const response = await axiosClient.post('/api/usuarios/create', newUser);
            localStorage.setItem('REJOBS_TOKEN', JSON.stringify(response.data.usuario));
            navigate('/');
        } catch (error: AxiosError | unknown) {
            if (error instanceof AxiosError) {
                const message = error.response?.data.error ?? ""
                setErrores([message]);
            }
        }
    }
    const isRecruiter = () => {
        const recruiter = localStorage.getItem('REJOBS_TOKEN') ?? "{}";
        const user = JSON.parse(recruiter);
        return user.reclutador
    }

    useEffect(() => {
        if (middleware == 'guest' && token) {
            navigate('/');
        }
        if (middleware == 'auth' && !token) {
            navigate('/auth');
        }
        if (middleware == 'auth' && token) {
            if (!isRecruiter() && pathname.includes('vacancy')) {
                navigate('/');
            }
        }
    }, [middleware, token, navigate, pathname])
    return {
        logout,
        token,
        login,
        register,
        isRecruiter,
    }
}