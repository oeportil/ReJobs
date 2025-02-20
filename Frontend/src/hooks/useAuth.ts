import { useNavigate } from "react-router"


export const  useAuth = () => {
   
    const navigate = useNavigate();
    const logout = () => {
        //elminar el localstorage
        navigate("/auth");
    }

    return {
        logout
    }
}