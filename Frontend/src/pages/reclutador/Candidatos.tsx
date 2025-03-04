import { useState } from "react";
import { Link, useParams } from "react-router";
import { IUsuario } from "../../interface/IUser";
import { useCandidato } from "../../hooks/useCandidato";
import useSWR from "swr";
import { confirmAlert } from "react-confirm-alert";

const Candidatos = () => {
  const params = useParams();
  const [candidatos, setCandidatos] = useState<IUsuario[]>([]);
  const { listCandidatos, revisarCandidato } = useCandidato();

  const fetcher = () =>
    listCandidatos(+params.id).then((response) => setCandidatos(response));

  useSWR(`/candidatos/vacante/${+params.id}`, fetcher, {
    refreshInterval: 1000,
  });
  console.log(candidatos);
  const handleAceptar = async (
    id: number,
    nombre: string,
    apellido: string
  ) => {
    const aceptar = {
      idCandidato: id,
      contacto: true,
      nota: "",
    };
    confirmAlert({
      title:
        "¿Estas Seguro de Aceptar a " +
        nombre +
        " " +
        apellido +
        " en esta Vacante?",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await revisarCandidato(aceptar);
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

  const handleRechazar = async (
    id: number,
    nombre: string,
    apellido: string
  ) => {
    const rechazar = {
      idCandidato: id,
      contacto: false,
      nota: "",
    };
    confirmAlert({
      title:
        "¿Estas Seguro de Aceptar a " +
        nombre +
        " " +
        apellido +
        " en esta Vacante?",
      message: "No podras revertir esto",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await revisarCandidato(rechazar);
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
    <div className="my-10 w-11/12 md:w-3/6 mx-auto">
      <h2
        className="text-4xl font-bold text-slate-800 
    text-center"
      >
        Candidatos
      </h2>

      <div className="mt-5 space-y-2">
        {candidatos?.map((candidato, i) => (
          <div
            key={i}
            className="bg-white rounded-md p-4 border border-gray-400 "
          >
            <div className="flex items-center gap-3 mb-4 h-fit">
              {/* Imagen del Candidato */}
              {candidato.pfp ? (
                <img
                  src={`http://localhost:8080/api/usuarios/imgsrc/${candidato.pfp}`}
                  alt={`Imagen de ${candidato.nombre}`}
                  className="rounded-full w-24 h-24"
                />
              ) : (
                <img
                  src={`/img/pato.png`}
                  alt={`Imagen de ${candidato.nombre}`}
                  width={100}
                  height={100}
                />
              )}
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
            <div className=" flex md:flex-row flex-col gap-2 items-center">
              <Link
                to={`${candidato.idUsuario}`}
                className="bg-sky-800 rounded hover:bg-sky-950 transition-colors p-2 text-center w-full block text-white font-bold uppercase text-xs"
              >
                {" "}
                Ver mas...
              </Link>
              {candidato.estado == 0 ? (
                <>
                  <button
                    onClick={() =>
                      handleAceptar(
                        candidato.id,
                        candidato.nombre,
                        candidato.apellido
                      )
                    }
                    className="bg-amber-500 rounded cursor-pointer hover:bg-amber-600 transition-colors p-2 text-center w-full block text-white font-bold uppercase text-xs"
                  >
                    {" "}
                    Aceptar
                  </button>
                  <button
                    onClick={() =>
                      handleRechazar(
                        candidato.id,
                        candidato.nombre,
                        candidato.apellido
                      )
                    }
                    className="bg-red-500 rounded cursor-pointer hover:bg-red-600 transition-colors p-2 text-center w-full block text-white font-bold uppercase text-xs"
                  >
                    {" "}
                    Rechazar
                  </button>
                </>
              ) : candidato.estado == 1 ? (
                <p className="text-xs text-center uppercase p-2 bg-green-100 text-green-600 border-green-600 border">
                  Aceptado
                </p>
              ) : (
                <p className="text-xs text-center uppercase p-2 bg-red-100 text-red-600 border-red-600 border">
                  Rechazado
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidatos;
