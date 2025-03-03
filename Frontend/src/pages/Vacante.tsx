import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useVacante } from "../hooks/useVacante";
import { IVacante } from "../interface/IVacante";
import { formatDate } from "../utils";
import { useCandidato } from "../hooks/useCandidato";

const Vacante = () => {
  const params = useParams();
  const { getVacante } = useVacante();
  const { existePostulacion, crearPostulacion } = useCandidato();
  const [vacante, setVacante] = useState<IVacante>();
  const [postulado, setPostulado] = useState<boolean>(false);

  const fecthData = async () => {
    const response = await getVacante(+params.id);
    setVacante(response);
    const responseExist = await existePostulacion(response.id);
    setPostulado(responseExist);
  };

  useEffect(() => {
    fecthData();
  }, []);

  const handlePostular = async () => {
    crearPostulacion(+params.id);
    setPostulado(true);
  };

  return (
    <div className="my-10 md:w-4/6 w-11/12 mx-auto">
      <h2 className="text-4xl font-bold text-slate-800 text-center">
        {vacante?.nombre}
      </h2>
      <p className="text-center text-sm text-slate-700 ">{vacante?.empresa}</p>

      <div className="space-y-2 mt-4">
        <p className="flex items-center gap-2 text-slate-700">
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
          {vacante?.salario}
          <span>Mensual</span>
        </p>

        <p className="flex gap-2 items-center text-slate-700 ">
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
          {vacante?.formato}
        </p>

        <p className="flex gap-2 items-center text-slate-700 ">
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
          {vacante?.horario}
        </p>

        <p className="flex gap-2 items-center text-slate-700 ">
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
          {vacante?.pais}
        </p>

        <p className="flex gap-2 items-center text-slate-700 ">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>

          <span>Ultimo dia para Postularse: </span>
          {formatDate(vacante?.fechaFin)}
        </p>
        <p>{vacante?.descripcion}</p>
      </div>
      <h3 className="text-slate-700 mt-5 font-bold text-xl uppercase border-b border-slate-700">
        Requisitos
      </h3>
      {vacante?.requisitos.length != 0 ? (
        <ul className="grid space-y-4 mt-2">
          {vacante?.requisitos.map((requisito, i) => (
            <li
              key={i}
              className="last-of-type:border-none border-b border-slate-300 p-2"
            >
              <h4 className="font-bold">{requisito.nombre}</h4>
              <p className="text-slate-700 text-sm">{requisito.descripcion}</p>
              <p className="uppercase text-xs text-slate-800 font-bold">
                {requisito.minimo ? "Obligatorio" : "Opcional"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-bold text-center text-slate-500 my-10 uppercase text-sm">
          Aun no hay Requisitos Especificos para esta vacante
        </p>
      )}
      <div className="flex justify-center">
        {!postulado ? (
          <button
            onClick={handlePostular}
            className="bg-sky-800 text-white p-2 rounded-full w-11/12 max-w-md cursor-pointer hover:bg-sky-900 transition-all"
          >
            Postularme
          </button>
        ) : (
          <div className="bg-green-100 p-2 text-green-600 rounded-full border border-green-600 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Te postulaste a esta Vacante Correctamente
          </div>
        )}
      </div>
    </div>
  );
};

export default Vacante;
