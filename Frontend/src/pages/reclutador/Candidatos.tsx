import { useState } from "react";
import { Link, useParams } from "react-router";
import { IUsuario } from "../../interface/IUser";
import { useCandidato } from "../../hooks/useCandidato";
import useSWR from "swr";
import { useUsuario } from "../../hooks/useUsuario";

const Candidatos = () => {
  const params = useParams();
  const [candidatos, setCandidatos] = useState<IUsuario[]>([]);
  const { listCandidatos } = useCandidato();
  const { getImg } = useUsuario();

  const fetcher = () =>
    listCandidatos(+params.id).then((response) => setCandidatos(response));

  useSWR(`/candidatos/vacante/${+params.id}`, fetcher, {
    refreshInterval: 500,
  });

  return (
    <div className="my-10 w-11/12 md:w-3/6 mx-auto">
      <h2
        className="text-4xl font-bold text-slate-800 
    text-center"
      >
        Candidatos
      </h2>

      <div className="mt-5">
        {candidatos.map((candidato, i) => (
          <div
            key={i}
            className="bg-white rounded-md p-4 border border-gray-400"
          >
            <div className="flex items-center gap-3 mb-4">
              {/* Imagen del Candidato */}
              <img
                src="/img/pato.png"
                alt={`Imagen de ${candidato.nombre}`}
                width={100}
                height={100}
              />
              {/* Nombre del Candidato */}
              <div>
                <p className="font-bold text-xl">
                  {candidato.nombre + " " + candidato.apellido}
                </p>
                {/* Correo del Candidato */}
                <p className="font-bold text-sm text-gray-500">
                  {candidato.email}
                </p>
                {/* Teléfono del Candidato */}
                <p className="font-bold text-sm text-gray-500">
                  {candidato?.telefono}
                </p>
                {/* Ver mas informacion del Candidato  */}
              </div>
            </div>
            <div className=" flex md:flex-row flex-col gap-2">
              <Link
                to={`${candidato.idUsuario}`}
                className="bg-sky-800 rounded hover:bg-sky-950 transition-colors p-2 text-center w-full block text-white font-bold uppercase text-xs"
              >
                {" "}
                Ver mas...
              </Link>
              <button className="bg-amber-500 rounded cursor-pointer hover:bg-amber-600 transition-colors p-2 text-center w-full block text-white font-bold uppercase text-xs">
                {" "}
                Aceptar
              </button>
              <button className="bg-red-500 rounded cursor-pointer hover:bg-red-600 transition-colors p-2 text-center w-full block text-white font-bold uppercase text-xs">
                {" "}
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidatos;
