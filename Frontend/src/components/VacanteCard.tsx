import { Link } from "react-router";
import { diffForHumans } from "../utils";
import { confirmAlert } from "react-confirm-alert";
import { IVacante } from "../interface/IVacante";
import { useVacante } from "../hooks/useVacante";

type Props = {
  reclutador?: boolean;
  vacante: IVacante;
};
const VacanteCard = ({ reclutador, vacante }: Props) => {
  const { disableVacante } = useVacante();
  const handleDesactivar = (id: number) => {
    confirmAlert({
      title: "¿Estas Seguro de Desactivar la Vacante?",
      message: "No podras revertir esto",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await disableVacante(id);
            return;
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
  };
  return (
    <div className="hover:shadow-md shadow-slate-400  bg-white p-4 rounded flex md:items-center justify-between md:flex-row flex-col">
      <Link to={`/vac/${vacante.id}`} className={`${reclutador && "w-4/6"} `}>
        <div>
          {/* Nombre de la vacante */}
          <h3 className="text-lg font-bold">{vacante.nombre}</h3>
          {/* Nombre de la empresa */}
          <p className="uppercase text-sm text-slate-600 font-bold">
            {vacante.empresa}
          </p>
          {/* numero de vacantes */}
          <div className="space-y-2 mt-2">
            {/* pais*/}
            <p className="flex gap-2 items-center text-slate-800 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z"
                  clipRule="evenodd"
                />
              </svg>
              {vacante.pais}
            </p>
            {/* Horarios*/}
            <p className="flex gap-2 items-center text-slate-800 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {vacante.horario}
            </p>
            {/* Formato */}
            <p className="flex gap-2 items-center text-slate-800 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              {vacante.formato}
            </p>
            {/* Salario */}
            <p className="flex gap-2 items-center text-slate-800 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {vacante.salario}
            </p>
            <p className="text-xs uppercase text-slate-900">
              {diffForHumans(vacante.fechaInicio)}
            </p>
          </div>
        </div>
      </Link>
      <div>
        {reclutador && (
          <div className="flex items-center gap-2 flex-col space-y-2 md:mt-0 mt-5 w-full">
            <Link
              to={`/vacancy/${vacante.id}/edit`}
              className="bg-sky-900 hover:bg-sky-950 transition-colors w-full p-2 text-center text-white uppercase text-sm rounded font-bold"
            >
              Editar
            </Link>
            <Link
              to={`/vacancy/${vacante.id}/applicants`}
              className="bg-slate-900 hover:bg-slate-950 transition-colors w-full p-2 text-center text-white uppercase text-sm rounded font-bold"
            >
              Ver Candidatos
            </Link>
            {vacante.activo ? (
              <button
                onClick={() => handleDesactivar(vacante.id)}
                className="bg-red-500 z-10 hover:bg-red-600 cursor-pointer transition-colors w-full p-2 text-center text-white uppercase text-sm rounded font-bold"
              >
                Desactivar
              </button>
            ) : (
              <div>Desactivado</div>
            )}
            <Link
              to={`${vacante.id}/requirements`}
              className="bg-amber-700 hover:bg-amber-800 transition-colors w-full p-2 text-center text-white uppercase text-sm rounded font-bold"
            >
              Ver Requisitos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacanteCard;
