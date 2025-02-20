const Experiencias = () => {
  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">Mis Experiencias</h2>

      <form action="" className="space-y-2 mt-5 p-4">
        <div className="flex flex-col ">
          <label
            htmlFor="empresa"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Empresa
          </label>
          <input
            type="text"
            name="empresa"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="fecha_inicio"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Fecha Inicio
          </label>
          <input
            type="date"
            name="fecha_inicio"
            className="border border-gray-300 p-1 rounded bg-white w-full"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="fecha_fin"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Fecha Fin
          </label>
          <input
            type="date"
            name="fecha_fin"
            className="border border-gray-300 p-1 rounded bg-white w-full"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="cargo"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Cargo
          </label>
          <input
            type="text"
            name="cargo"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="area"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Area
          </label>
          <input
            type="text"
            name="area"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="descripcion"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Descripción
          </label>
          <textarea
            name="descripcion"
            id="descripcion"
            className="border border-gray-300 p-1 rounded bg-white h-20"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-sky-900 hover:bg-sky-950 cursor-pointer flex gap-1 items-center my-4 text-white p-3 rounded-md uppercase font-bold text-sm w-fit"
        >
          Crear
        </button>
      </form>

      <div className="grid ">
        <div className="bg-white shadow p-4">
          <div>
            <h3 className="font-bold text-xl text-slate-900 ">Programador</h3>
            <p className="text-xs text-slate-600 mb-2">
              Desarrollador de Backend
            </p>
            <p className="font-bold text-sm uppercase text-slate-500">ReWare</p>
          </div>
          <p className="text-sm text-slate-700 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            eligendi laboriosam nulla voluptatem repellat ad eos incidunt
            laudantium? Ea similique maxime, nemo impedit qui eveniet fugit
            obcaecati accusamus quis quidem!
          </p>
          <div className="flex justify-between">
            <p className="text-xs font-bold text-slate-600 mt-4 text-end ">
              fecha inicio: 12/12/12
            </p>
            <p className="text-xs font-bold text-slate-600 mt-4 text-end">
              fecha fin: 13/12/12
            </p>
          </div>
          <button className="bg-red-400 mt-4 transition-colors hover:bg-red-500 text-white uppercase p-2 rounded text-center cursor-pointer font-bold text-sm w-full">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experiencias;
