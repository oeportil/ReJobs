const Requisitos = () => {
  return (
    <div className="my-10 md:w-4/6 w-11/12 mx-auto">
      <h2 className="text-4xl font-bold text-slate-800">Requisitos</h2>
      <form action="" className="space-y-2 mt-5 p-4">
        <div className="flex flex-col ">
          <label
            htmlFor="nombre"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Requisito
          </label>
          <input
            type="text"
            name="nombre"
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
        <div className="flex items-center my-8">
          <input
            type="checkbox"
            className="w-5 size-4 cursor-pointer"
            name="minimo"
            id="minimo"
          />
          <label
            htmlFor="minimo"
            className="text-gray-600 font-bold uppercase text-xs ml-1"
          >
            Obligatorio
          </label>
        </div>
        <button
          type="submit"
          className="bg-sky-900 hover:bg-sky-950 cursor-pointer flex gap-1 items-center my-4 text-white p-3 rounded-md uppercase font-bold text-sm w-fit"
        >
          Crear
        </button>
      </form>

      {/* Requisitos */}
      <h3 className="font-bold text-xl mb-2">Requisitos Agregados</h3>
      <div className="grid ">
        <div className="bg-white shadow p-4">
          <h3 className="font-bold text-xl text-slate-900 pb-2">
            Saber Agronomia
          </h3>
          <p className="text-sm text-slate-700">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            eligendi laboriosam nulla voluptatem repellat ad eos incidunt
            laudantium? Ea similique maxime, nemo impedit qui eveniet fugit
            obcaecati accusamus quis quidem!
          </p>
          <p className="uppercase text-sm text-slate-800 font-bold mt-4">
            Obligatorio: Si
          </p>
          <button className="bg-red-400 mt-4 transition-colors hover:bg-red-500 text-white uppercase p-2 rounded text-center cursor-pointer font-bold text-sm w-full">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Requisitos;
