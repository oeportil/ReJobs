import { Outlet } from "react-router";
import Logo from "../components/Logo";

const GuestLayout = () => {
  return (
    <main className="md:flex h-screen items-center justify-center gap-5 container mx-auto">
      <div>
        <img
          src="/img/guest.png"
          alt="Imagen de Invitado"
          width={350}
          className="md:block hidden"
        />
        <Logo />
      </div>
      <Outlet />
    </main>
  );
};

export default GuestLayout;
