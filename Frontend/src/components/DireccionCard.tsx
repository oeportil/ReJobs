import { Link } from "react-router";

const DireccionCard = () => {
  return (
    <div className="bg-white flex sm:flex-row flex-col justify-between sm:items-center p-4 rounded">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">El Salvador</h3>
        <p className="text-slate-800">
          {" "}
          <span className="font-bold">Region:</span> Santa Ana
        </p>
        <p className="text-slate-800">
          {" "}
          <span className="font-bold">Distrito:</span> Santa Ana, Centro
        </p>
        <p className="text-slate-800">
          {" "}
          <span className="font-bold">Ciudad:</span> Santa Ana
        </p>
      </div>
      <div className="flex flex-col space-y-2 sm:mt-0 mt-2">
        <Link
          to={`${1}`}
          className="bg-sky-900 hover:bg-sky-950 text-white uppercase p-2 rounded text-center font-bold text-sm"
        >
          Editar
        </Link>
        <button
          type="button"
          className="bg-red-400  hover:bg-red-500 text-white uppercase p-2 rounded text-center cursor-pointer font-bold text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DireccionCard;
