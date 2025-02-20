import { Link } from "react-router";

const MisPostulaciones = () => {
  const estado = () => 0;
  return (
    <div className="my-10">
      <h2
        className="text-4xl font-bold text-slate-800 
        text-center"
      >
        Mis Postulaciones
      </h2>
      <div className="grid items-center md:w-1/2 w-11/12 mx-auto my-5 ">
        <Link
          to={`/vacancy/${1}`}
          className={`${
            estado() == 0
              ? `bg-white border-gray-400`
              : estado() == 1
              ? `bg-sky-100 border-sky-800`
              : `bg-red-100 border-red-500`
          } rounded-md p-4 border hover:shadow shadow-gray-500`}
        >
          {/* Nombre de Vacante */}
          <h3 className="font-bold text-2xl text-slate-900">
            Desarrollador de Tierra
          </h3>
          {/* Nombre de la Empresa  */}
          <p className="uppercase text-sm font-bold text-slate-800">
            ReWare Studios
          </p>
          {/* Dia que me postule */}
          <p className="text-xs font-bold">
            Fecha que te postulaste:{" "}
            <span className="text-slate-600">11 de enero del 2002</span>
          </p>
          {/* Estado */}
          <p
            className={`mt-1 text-end font-bold uppercase text-xs ${
              estado() == 0
                ? `text-slate-700`
                : estado() == 1
                ? `text-sky-800`
                : `text-red-500`
            }`}
          >
            {estado() === 0
              ? "Tu aplicacion Esta en revisión"
              : estado() === 1
              ? "Estas Seleccionado"
              : "El Reclutador a Decidido No seguir con tu postulación"}
          </p>
          {/* Fecha de estado */}
          <p className="text-end font-bold text-slate-700 text-xs">
            9 de diciembre del 2025
          </p>
        </Link>
      </div>
    </div>
  );
};
export default MisPostulaciones;
