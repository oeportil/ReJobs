import { Link } from "react-router";
import DireccionCard from "../components/DireccionCard";

const Direccion = () => {
  return (
    <div className="my-10">
      {" "}
      <h2 className="text-4xl font-bold text-slate-800">Mis Direcciones</h2>
      <div className="">
        <Link
          to={"create-address"}
          className="flex gap-1 items-center my-4 bg-white w-fit p-3 border border-gray-300 rounded-md uppercase font-bold text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Crear
        </Link>
      </div>
      <div>
        <DireccionCard />
      </div>
    </div>
  );
};

export default Direccion;
