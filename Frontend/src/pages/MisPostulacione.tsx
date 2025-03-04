import { Link } from "react-router";
import useSWR from "swr";
import { useCandidato } from "../hooks/useCandidato";
import { useState } from "react";
import { IPostulacion } from "../interface/IPostulacion";
import { formatDate } from "../utils";

const MisPostulaciones = () => {
  const { id } = JSON.parse(localStorage.getItem("REJOBS_TOKEN"));
  const { listPostulaciones } = useCandidato();
  const [postulaciones, setPostulaciones] = useState<IPostulacion[]>([]);

  const fetcher = () =>
    listPostulaciones().then((response) => setPostulaciones(response));
  useSWR(`/candidatos/usuario/${id}`, fetcher, {
    refreshInterval: 500,
  });

  return (
    <div className="my-10">
      <h2
        className="text-4xl font-bold text-slate-800 
        text-center"
      >
        Mis Postulaciones
      </h2>
      <div className="grid items-center md:w-1/2 w-11/12 mx-auto my-5 space-y-2">
        {postulaciones.length != 0 ? (
          <>
            {postulaciones.map((postulacion, i) => (
              <Link
                key={i}
                to={`/vac/${postulacion.idVacante}`}
                className={`${
                  postulacion.estado == 0
                    ? `bg-white border-gray-400`
                    : postulacion.estado == 1
                    ? `bg-sky-100 border-sky-800`
                    : `bg-red-100 border-red-500`
                } rounded-md p-4 border hover:shadow shadow-gray-500`}
              >
                {/* Nombre de Vacante */}
                <h3 className="font-bold text-2xl text-slate-900">
                  {postulacion.nombre}
                </h3>
                {/* Nombre de la Empresa  */}
                <p className="uppercase text-sm font-bold text-slate-800">
                  {postulacion.empresa}
                </p>
                {/* Dia que me postule */}
                <p className="text-xs font-bold">
                  Fecha que te postulaste:{" "}
                  <span className="text-slate-600">
                    {formatDate(postulacion.fechaCan)}
                  </span>
                </p>
                {/* Estado */}
                <p
                  className={`mt-1 text-end font-bold uppercase text-xs ${
                    postulacion.estado == 0
                      ? `text-slate-700`
                      : postulacion.estado == 1
                      ? `text-sky-800`
                      : `text-red-500`
                  }`}
                >
                  {postulacion.estado === 0
                    ? "Tu aplicacion Esta en revisión"
                    : postulacion.estado === 1
                    ? "Estas Seleccionado"
                    : "El Reclutador a Decidido No seguir con tu postulación"}
                </p>
                {/* Fecha de estado */}
                <p className="text-end font-bold text-slate-700 text-xs">
                  {formatDate(postulacion.fechaDisp) ?? "A concretar"}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <div className="text-center text-slate-600 font-bold text-sm uppercase mt-10">
            Aun no hay postulaciones
          </div>
        )}
      </div>
    </div>
  );
};
export default MisPostulaciones;
