import { Link } from "react-router";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex md:flex-row flex-col p-4 bg-white justify-between items-center">
      <Link to={"/"}>
        <Logo />
      </Link>
      <nav className="flex gap-4 text-slate-700 md:flex-row flex-col items-center mt-4 md:mt-0">
        <Link to={""} className=" flex gap-1">
          <span className="bg-sky-800 text-white px-2 rounded-full">0</span>{" "}
          <p className="hover:underline">Notificaciones</p>
        </Link>
        <Link to={"/user"} className="hover:underline">
          Usuario
        </Link>
        <Link to={"/cv"} className="hover:underline">
          Mi CV
        </Link>
        <Link to={""} className="hover:underline">
          Mis Postulaciones
        </Link>
        <Link to={""} className="hover:underline">
          Cerrar Sesión
        </Link>
      </nav>
    </header>
  );
};

export default Header;
