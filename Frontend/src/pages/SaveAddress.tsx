import { useState } from "react";
import { useDirection } from "../hooks/useDirection";

const SaveAddress = () => {
  const [error, setErrores] = useState<Array<string>>([]);
  const { createDirection } = useDirection();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const err: string[] = [];
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pais = formData.get("pais");
    const region = formData.get("region");
    const distrito = formData.get("distrito");
    const ciudad = formData.get("ciudad");
    const direccion = formData.get("direccion");

    const { id } = JSON.parse(localStorage.getItem("REJOBS_TOKEN")!);

    const Direction = {
      pais,
      region,
      distrito,
      ciudad,
      direccion,
      idUsuario: id,
    };
    Object.keys(Direction).forEach((field) => {
      if (Direction[field].length == 0) {
        err.push(`El Campo ${field} es Requerido`);
      }
    });
    if (err.length != 0) return setErrores(err);
    createDirection(Direction, setErrores);
  };

  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">Crear Dirección</h2>
      {error.length != 0 && (
        <div className="space-y-2 mb-2">
          {error.map((error, index) => (
            <p
              key={index}
              className="text-red-500 text-xs uppercase text-center bg-red-100 p-1 border border-red-500"
            >
              {error}
            </p>
          ))}
        </div>
      )}
      <form action="" className="space-y-4 p-2" onSubmit={handleSubmit}>
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
          value={"Crear Dirección"}
          className="bg-sky-800 text-white font-bold text-center p-2 rounded w-full hover:bg-sky-950 transition-colors cursor-pointer"
        />
      </form>
    </div>
  );
};

export default SaveAddress;
