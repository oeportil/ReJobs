import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth({});

  const [error, setErrores] = useState<Array<string>>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = [];
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
      err.push("El Campo Email es Requerido");
    }
    if (!password) {
      err.push("El Campo Contraseña es Requerido");
    }
    if (err.length != 0) return setErrores(err);
    setErrores([]);
    login({ email, password }, setErrores);
  };

  return (
    <div className="md:w-4/6 w-11/12 mx-auto mt-5 md:mt-0">
      <h2 className="text-4xl font-bold text-slate-800">Inicia Sesión</h2>
      <p className="text-slate-700 mb-4">
        Llena el siguiente formulario para iniciar Sesión
      </p>
      <div className="bg-white rounded shadow-sm shadow-gray-500 p-4 w-full">
        {error.length != 0 && (
          <div className="space-y-2 mb-2">
            {error.map((error, index) => (
              <p
                key={index}
                className="text-red-500 text-xs uppercase text-center bg-red-100 p-1 border border-red-500"
              >
                {error}
              </p>
            ))}
          </div>
        )}
        <form action="" className="space-y-4" onSubmit={handleSubmit}>
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
