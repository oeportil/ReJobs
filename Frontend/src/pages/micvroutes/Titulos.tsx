const Titulos = () => {
  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">
        Mis Titulos Academicos
      </h2>

      <form action="" className="space-y-2 mt-5 p-4">
        <div className="flex flex-col ">
          <label
            htmlFor="institucion"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Institución
          </label>
          <input
            type="text"
            name="institucion"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="fecha"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            className="border border-gray-300 p-1 rounded bg-white w-full"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="sede"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Sede
          </label>
          <input
            type="text"
            name="sede"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="titulo"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Titulo
          </label>
          <input
            type="text"
            name="titulo"
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
          <h3 className="font-bold text-xl text-slate-900 pb-2">
            Ingeniero en Desarrollo de Tierra
          </h3>
          <p className="font-bold text-sm uppercase text-slate-500">
            UniCaca, Santa Ana
          </p>
          <p className="text-sm text-slate-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            eligendi laboriosam nulla voluptatem repellat ad eos incidunt
            laudantium? Ea similique maxime, nemo impedit qui eveniet fugit
            obcaecati accusamus quis quidem!
          </p>
          <p className="text-xs font-bold text-slate-600 mt-4 text-end">
            fecha: 12/12/12
          </p>
          <button className="bg-red-400 mt-4 transition-colors hover:bg-red-500 text-white uppercase p-2 rounded text-center cursor-pointer font-bold text-sm w-full">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Titulos;
