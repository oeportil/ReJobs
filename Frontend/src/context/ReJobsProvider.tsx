import { createContext, useState } from "react";
import { useCurriculum } from "../hooks/useCurriculum";
import { ICurriculum } from "../interface/ICurriculum";

export const ReJobsContext = createContext({});

type Props = {
  children: React.ReactNode;
};

export interface IRejobsContext {
  modalView: boolean;
  setModalView: (value: boolean) => void;
  update: boolean;
  setUpdate: (value: boolean) => void;
  getCV: () => Promise<ICurriculum>;
  curriculum: ICurriculum;
  createcv: (cv: unknown) => void;
  updatecv: (cv: unknown, id: number) => Promise<string[]>;
}
const ReJobsProvider = ({ children }: Props) => {
  const { getCurriculum, createCurriculum, updateCurriculum } = useCurriculum();

  const [modalView, setModalView] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [curriculum, setCurriculum] = useState<ICurriculum>(null);

  const getCV = async () => {
    const response = await getCurriculum();
    await setCurriculum(response.curriculum);
    return response.curriculum;
  };
  const createcv = async (cv: unknown) => {
    await createCurriculum(cv);
    await getCV();
  };
  const updatecv = async (cv: unknown, id: number) => {
    await updateCurriculum(cv, id);
    await getCV();
    return ["Curriculum Actualizado Con Exito"];
  };

  return (
    <ReJobsContext.Provider
      value={{
        modalView,
        setModalView,
        update,
        setUpdate,
        getCV,
        curriculum,
        createcv,
        updatecv,
      }}
    >
      {children}
    </ReJobsContext.Provider>
  );
};

export default ReJobsProvider;
