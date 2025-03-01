import { IRejobsContext } from "../context/ReJobsProvider";
import { useDirection } from "../hooks/useDirection";
import useReJobsContext from "../hooks/useReJobsContext";
import { IDirection } from "../interface/IDirection";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

type Props = {
  direccion: IDirection;
};
const DireccionCard = ({ direccion }: Props) => {
  const { setUpdate } = useReJobsContext() as IRejobsContext;
  const { deleteDirection } = useDirection();
  const handleClick = (id: number) => {
    confirmAlert({
      title: "¿Estas Seguro de Eliminar la Dirección?",
      message: "No podras revertir esto",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            deleteDirection(id);
            setUpdate(true);
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
    return;
  };

  return (
    <div className="bg-white flex sm:flex-row flex-col justify-between sm:items-center p-4 rounded">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{direccion.pais}</h3>
        <p className="text-slate-800">
          {" "}
          <span className="font-bold">Region:</span> {direccion.region}
        </p>
        <p className="text-slate-800">
          {" "}
          <span className="font-bold">Distrito:</span> {direccion.distrito}
        </p>
        <p className="text-slate-800">
          {" "}
          <span className="font-bold">Ciudad:</span> {direccion.ciudad}
        </p>
        <p className="text-sm">{direccion.direccion}</p>
      </div>
      <div className="flex flex-col space-y-2 sm:mt-0 mt-2">
        <button
          type="button"
          className="bg-red-400  hover:bg-red-500 text-white uppercase p-2 rounded text-center cursor-pointer font-bold text-sm"
          onClick={() => handleClick(direccion.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DireccionCard;
