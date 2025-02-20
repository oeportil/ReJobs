import { Link } from "react-router";

const Login = () => {
  return (
    <div className="md:w-4/6 w-11/12 mx-auto mt-5 md:mt-0">
      <h2 className="text-4xl font-bold text-slate-800">Inicia Sesión</h2>
      <p className="text-slate-700 mb-4">
        Llena el siguiente formulario para iniciar Sesión
      </p>
      <div className="bg-white rounded shadow-sm shadow-gray-500 p-4 w-full">
        <form action="" className="space-y-4">
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
          <input
            type="submit"
            value={"Iniciar Sesión"}
            className="bg-sky-800 text-white font-bold text-center p-2 rounded w-full hover:bg-sky-950 transition-colors cursor-pointer"
          />
        </form>
        <p className="text-slate-700 mt-3">
          ¿No tienes cuenta?{" "}
          <Link to="/auth/register" className="text-sky-900 font-bold">
            Crea una
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
