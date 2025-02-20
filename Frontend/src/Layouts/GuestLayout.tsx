import { Outlet } from "react-router";
import Logo from "../components/Logo";

const GuestLayout = () => {
  return (
    <main className="flex md:flex-row flex-col h-screen md:items-center md:gap-20 md:justify-center md:max-w-4xl mx-auto md:mt-0 mt-5 md:p-2">
      <div>
        <img
          src="/img/guest.png"
          alt="Imagen de Invitado"
          width={350}
          className="md:block hidden mx-auto"
        />
        <img
          src="/img/pato.png"
          alt=""
          className="w-16 mx-auto md:hidden block"
        />
        <Logo />
      </div>
      <Outlet />
    </main>
  );
};

export default GuestLayout;
