import { Link } from "react-router";
import Logo from "./Logo";
import useReJobsContext from "../hooks/useReJobsContext";
import { IRejobsContext } from "../context/ReJobsProvider";
import { useAuth } from "../hooks/useAuth";
import { useUsuario } from "../hooks/useUsuario";
import { useEffect, useState } from "react";
import { IUsuario } from "../interface/IUser";
import { useCandidato } from "../hooks/useCandidato";
import useSWR from "swr";

const Header = () => {
  const [usuario, setUsuario] = useState<IUsuario>();
  const { modalView, setModalView } = useReJobsContext() as IRejobsContext;
  const { isRecruiter } = useAuth({});
  const { getUsuario, getImg } = useUsuario();
  const { countPostulacion } = useCandidato();
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    Promise.all([getUsuario(), getImg()]).then(([uresponse, iresponse]) => {
      setUsuario({ ...uresponse.usuario, pfp: iresponse });
    });
  }, []);
  const fetcher = () =>
    countPostulacion().then((response) => setTotal(response));
  useSWR(`/candidatos/usuario/0/count`, fetcher, {
    refreshInterval: 500,
  });
  return (
    <header className="flex lg:flex-row flex-col p-4 bg-white justify-between items-center">
      <Link to={"/"} className="flex items-center">
        <img src="/img/pato.png" alt="Imagen del Pato" width={50} />
        <Logo />
      </Link>
      <nav className="flex gap-4 text-slate-700 lg:flex-row flex-col items-center mt-4 lg:mt-0">
        <div className="flex items-center gap-2">
          {
            <img
              src={usuario?.pfp ?? "/img/guest.png"}
              alt={`Imagen de ${usuario?.nombre ?? "Usuario"}`}
              width={30}
              height={30}
              className="rounded-full h-8 w-8"
            />
          }
          <p>Bienvenid@ {usuario?.nombre ?? "Usuario"}</p>
        </div>

        {!isRecruiter() && (
          <>
            <Link to={"/notifications"} className=" ">
              <p className="hover:underline">Notificaciones</p>
            </Link>
            <Link to={"/user"} className="hover:underline">
              Usuario
            </Link>
            <Link to={"/cv"} className="hover:underline">
              Mi CV
            </Link>
            <Link to={"/applications"} className="hover:underline flex gap-1">
              <span className="bg-sky-800 text-white px-2 rounded-full">
                {total}
              </span>{" "}
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
