import { Link } from "react-router";
import Logo from "./Logo";
import useReJobsContext from "../hooks/useReJobsContext";
import { IRejobsContext } from "../context/ReJobsProvider";
import { useAuth } from "../hooks/useAuth";
import { useUsuario } from "../hooks/useUsuario";
import { useEffect, useState } from "react";
import { IUsuario } from "../interface/IUser";

const Header = () => {
  const [usuario, setUsuario] = useState<IUsuario>();
  const { modalView, setModalView } = useReJobsContext() as IRejobsContext;
  const { isRecruiter } = useAuth({});
  const { getUsuario } = useUsuario();
  useEffect(() => {
    getUsuario().then((response) => {
      setUsuario(response.usuario);
    });
  }, []);

  return (
    <header className="flex md:flex-row flex-col p-4 bg-white justify-between items-center">
      <Link to={"/"} className="flex items-center">
        <img src="/img/pato.png" alt="Imagen del Pato" width={50} />
        <Logo />
      </Link>
      <nav className="flex gap-4 text-slate-700 md:flex-row flex-col items-center mt-4 md:mt-0">
        <div className="flex items-center gap-2">
          {
            <img
              src={usuario?.pfp ?? "/img/guest.png"}
              alt={`Imagen de ${usuario?.nombre ?? "Usuario"}`}
              width={30}
              height={30}
              className="rounded-full h-9 w-9"
            />
          }
          <p>Bienvenido {usuario?.nombre ?? "Usuario"}</p>
        </div>
        <Link to={"/notifications"} className=" flex gap-1">
          <span className="bg-sky-800 text-white px-2 rounded-full">0</span>{" "}
          <p className="hover:underline">Notificaciones</p>
        </Link>
        {!isRecruiter() && (
          <>
            <Link to={"/user"} className="hover:underline">
              Usuario
            </Link>
            <Link to={"/cv"} className="hover:underline">
              Mi CV
            </Link>
            <Link to={"/applications"} className="hover:underline">
              Mis Postulaciones
            </Link>
          </>
        )}
        {isRecruiter() && (
          <Link to={"/vacancy"} className="hover:underline">
            Mis Vacantes
          </Link>
        )}
        <button
          onClick={() => setModalView(!modalView)}
          className="hover:underline cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default Header;
