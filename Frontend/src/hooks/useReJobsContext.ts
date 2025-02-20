import { useContext } from "react";
import { ReJobsContext } from "../context/ReJobsProvider";


const useReJobsContext = () => {
    return useContext(ReJobsContext);
}

export default useReJobsContext;