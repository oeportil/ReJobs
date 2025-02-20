const Usuario = () => {
  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">
        Tu Información: Xavier Avila
      </h2>
      <p className="text-slate-700 mb-4"></p>
      <form action="" className="space-y-4 p-2">
        <div className="flex flex-col ">
          <label
            htmlFor="nombre"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="apellido"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Repetir Password
          </label>
          <input
            type="password"
            name="password"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="img"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Subir o Actualizar Imagen
          </label>
          <input
            type="file"
            name="img"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>
        <input
          type="submit"
          value={"Editar Informacion"}
          className="bg-sky-800 text-white font-bold text-center p-2 rounded w-full hover:bg-sky-950 transition-colors cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Usuario;
