const Idiomas = () => {
  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">Mis Idiomas</h2>
      <form action="" className="space-y-2 mt-5 p-4">
        <div className="flex flex-col ">
          <label
            htmlFor="idioma"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Idioma
          </label>
          <input
            type="text"
            name="idioma"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-900 hover:bg-sky-950 cursor-pointer flex gap-1 items-center my-4 text-white p-3 rounded-md uppercase font-bold text-sm w-fit"
        >
          Crear
        </button>
      </form>

      <div className="grid ">
        <div className="bg-white shadow p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <h3 className="font-bold text-xl text-slate-900 ">Nahuat</h3>
          <button className="bg-red-400  transition-colors hover:bg-red-500 text-white uppercase p-2 rounded text-center cursor-pointer font-bold text-sm md:w-fit w-full">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Idiomas;
