const CV = () => {
  return (
    <div className="my-10">
      {" "}
      <h2 className="text-4xl font-bold text-slate-800">
        Crea o Edita tu Curriculum Vitae
      </h2>
      <form action="" className="space-y-4 my-5 p-4">
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

        <div className="flex flex-col ">
          <label
            htmlFor="biografia"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Biografia
          </label>
          <textarea
            name="biografia"
            id="biografia"
            className="border border-gray-300 p-1 rounded bg-white h-20"
          ></textarea>
        </div>
        <input
          type="submit"
          value={"Guardar Datos"}
          className="bg-sky-800 text-white font-bold text-center p-2 rounded w-full hover:bg-sky-950 transition-colors cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CV;
