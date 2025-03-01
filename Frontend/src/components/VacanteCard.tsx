import { Link } from "react-router";
import { diffForHumans } from "../utils";

type Props = {
  reclutador?: boolean;
};
const VacanteCard = ({ reclutador }: Props) => {
  return (
    <Link
      to={`/vacancy/${1}`}
      className={`${
        reclutador &&
        "flex md:items-center justify-between md:flex-row flex-col"
      } hover:shadow-md shadow-slate-400 bg-white p-4 rounded`}
    >
      <div>
        {/* Nombre de la vacante */}
        <h3 className="text-lg font-bold">Desarrollador de React y Laravel</h3>
        {/* Nombre de la empresa */}
        <p className="uppercase text-sm text-slate-600 font-bold">
          Reware Studios
        </p>
        {/* numero de vacantes */}
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2 text-slate-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <p>0</p>
          </div>

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
            El Salvador
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
            horarios
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
            Remoto
          </p>
          {/* Salario */}
          <p className="flex gap-2 items-center text-slate-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            1,200
          </p>
          <p className="text-xs uppercase text-slate-900">{diffForHumans()}</p>
        </div>
      </div>
      <div>
        {reclutador && (
          <div className="flex items-center gap-2 flex-col space-y-2 md:mt-0 mt-5">
            <Link
              to={`/vacancy/${1}/edit`}
              className="bg-sky-900 hover:bg-sky-950 transition-colors w-full p-2 text-center text-white uppercase text-sm rounded font-bold"
            >
              Editar
            </Link>
            <Link
              to={`/vacancy/${1}/applicants`}
              className="bg-slate-900 hover:bg-slate-950 transition-colors w-full p-2 text-center text-white uppercase text-sm rounded font-bold"
            >
              Ver Candidatos
            </Link>
            <button className="bg-red-500 hover:bg-red-600 cursor-pointer transition-colors w-full p-2 text-center text-white uppercase text-sm rounded font-bold">
              Desactivar
            </button>
            <Link
              to={`${1}/requirements`}
              className="bg-amber-700 hover:bg-amber-800 transition-colors w-full p-2 text-center text-white uppercase text-sm rounded font-bold"
            >
              Ver Requisitos
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
};

export default VacanteCard;
