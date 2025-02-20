import { Link } from "react-router";

const Candidatos = () => {
  return (
    <div className="my-10 w-11/12 md:w-3/6 mx-auto">
      <h2
        className="text-4xl font-bold text-slate-800 
    text-center"
      >
        Candidatos
      </h2>

      <div className="mt-5">
        <div className="bg-white rounded-md p-4 border border-gray-400">
          <div className="flex items-center gap-3 mb-4">
            {/* Imagen del Candidato */}
            <img
              src="/img/pato.png"
              alt={`Imagen de ${"Xavier"}`}
              width={100}
              height={100}
            />
            {/* Nombre del Candidato */}
            <div>
              <p className="font-bold text-xl">Xavier Avila</p>
              {/* Correo del Candidato */}
              <p className="font-bold text-sm text-gray-500">
                xavier@correo.com
              </p>
              {/* Teléfono del Candidato */}
              <p className="font-bold text-sm text-gray-500">1234-5678</p>
              {/* Ver mas informacion del Candidato  */}
            </div>
          </div>
          <div className=" flex md:flex-row flex-col gap-2">
            <Link
              to={`${1}`}
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
      </div>
    </div>
  );
};

export default Candidatos;
