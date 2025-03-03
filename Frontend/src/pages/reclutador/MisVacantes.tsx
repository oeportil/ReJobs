import { Link } from "react-router";
import VacanteCard from "../../components/VacanteCard";
import useSWR from "swr";
import axiosClient from "../../utils/axiosClient";
import { IVacante } from "../../interface/IVacante";

const MisVacantes = () => {
  const { id } = JSON.parse(localStorage.getItem("REJOBS_TOKEN"));
  const fetcher = () =>
    axiosClient.get(`/vacantes/usuario/${id}?asc=false`).then((r) => r.data);
  const { data, error, isLoading } = useSWR<{ vacantes: IVacante[] }>(
    `/vacantes/usuario/${id}?asc=false`,
    fetcher,
    {
      refreshInterval: 500,
    }
  );

  if (isLoading) return <div>Cargando...</div>;
  return (
    <div className="my-10">
      <h2
        className="text-4xl font-bold text-slate-800 
    text-center"
      >
        Mis Vacantes
      </h2>
      <div className="md:w-4/6 w-11/12 mx-auto">
        <Link
          to={"create-vacancy"}
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
        {error ? (
          <div>Error al cargar los datos</div>
        ) : (
          <div className="grid space-y-2">
            {data.vacantes.map((vacante, i) => (
              <VacanteCard reclutador vacante={vacante} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisVacantes;
