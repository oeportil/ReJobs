import { createContext, useState } from "react";

export const ReJobsContext = createContext({});

type Props = {
  children: React.ReactNode;
};

export interface IRejobsContext {
  modalView: boolean;
  setModalView: (value: boolean) => void;
  update: boolean;
  setUpdate: (value: boolean) => void;
}
const ReJobsProvider = ({ children }: Props) => {
  const [modalView, setModalView] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <ReJobsContext.Provider
      value={{ modalView, setModalView, update, setUpdate }}
    >
      {children}
    </ReJobsContext.Provider>
  );
};

export default ReJobsProvider;
