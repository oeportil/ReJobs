import { useParams } from "react-router";

const SaveAddress = () => {
  const params = useParams();
  console.log(params);
  const isEdit = () => params.id;

  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">
        {isEdit() ? "Editar Dirección" : "Crear Dirección"}
      </h2>
      <p className="text-slate-700 mb-4"></p>
      <form action="" className="space-y-4 p-2">
        <div className="flex flex-col ">
          <label
            htmlFor="pais"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Pais
          </label>
          <input
            type="text"
            name="pais"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="region"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Region
          </label>
          <input
            type="text"
            name="region"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="distrito"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Distrito
          </label>
          <input
            type="text"
            name="distrito"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="ciudad"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Ciudad
          </label>
          <input
            type="text"
            name="ciudad"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="direccion"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Dirección
          </label>
          <textarea
            name="direccion"
            id="direccion"
            className="border border-gray-300 p-1 rounded bg-white h-20"
          ></textarea>
        </div>
        <input
          type="submit"
          value={isEdit() ? "Editar Dirección" : "Crear Dirección"}
          className="bg-sky-800 text-white font-bold text-center p-2 rounded w-full hover:bg-sky-950 transition-colors cursor-pointer"
        />
      </form>
    </div>
  );
};

export default SaveAddress;
