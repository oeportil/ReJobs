import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="h-screen flex md:flex-row flex-col justify-center items-center gap-5">
      <div>
        <h1 className="text-8xl font-bold text-slate-800">404</h1>
        <p className="text-slate-700 font-semibold">
          Ooh No Pudimos Encontrar La Pagina Que Tu Deseas
        </p>
        <Link to={"/"} className="text-slate-600 hover:underline">
          Da click aqui para ir a Inicio
        </Link>
      </div>
      <img
        src="/img/notfound.png"
        alt="Imagen de pagina no encontrada"
        className="w-72"
      />
    </main>
  );
};

export default NotFound;
