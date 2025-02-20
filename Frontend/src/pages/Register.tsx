import { Link } from "react-router";

const Register = () => {
  return (
    <div className="md:w-4/6 w-11/12 mx-auto mt-5 md:mt-0">
      <h2 className="text-4xl font-bold text-slate-800">Crear Cuenta</h2>
      <p className="text-slate-700 mb-4">
        Llena el siguiente formulario para crear tu cuenta
      </p>
      <div className="bg-white rounded shadow-sm shadow-gray-500 p-4 w-full">
        <form action="" className="space-y-4">
          <div className="flex flex-col ">
            <label
              htmlFor="nombre"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              className="border border-gray-300 p-1 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="apellido"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              className="border border-gray-300 p-1 rounded "
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="reclutador"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Tipo de Cuenta
            </label>
            <select
              name="reclutador"
              id="reclutador"
              className="border border-gray-300 p-1 rounded"
            >
              <option>-- Selecciona una opcion --</option>
              <option value="1">
                Reclutador -- Podras Crear Vacantes de Trabajo
              </option>
              <option value="0">
                Postulante -- Podras Postularte a las Vacantes
              </option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="border border-gray-300 p-1 rounded "
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="border border-gray-300 p-1 rounded "
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Repetir Password
            </label>
            <input
              type="password"
              name="password"
              className="border border-gray-300 p-1 rounded "
            />
          </div>
          <input
            type="submit"
            value={"Crear Cuenta"}
            className="bg-sky-800 text-white font-bold text-center p-2 rounded w-full hover:bg-sky-950 transition-colors cursor-pointer"
          />
        </form>
        <p className="text-slate-700 mt-3">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/auth" className="text-sky-900 font-bold">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
