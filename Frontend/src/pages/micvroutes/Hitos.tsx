import { FormEvent, useState } from "react";
import Errores from "../../components/Errores";
import Exito from "../../components/Exito";
import useReJobsContext from "../../hooks/useReJobsContext";
import { IRejobsContext } from "../../context/ReJobsProvider";
import { useCurriculum } from "../../hooks/useCurriculum";
import { formatDate } from "../../utils";
import { confirmAlert } from "react-confirm-alert";

const Hitos = () => {
  const { curriculum, getCV } = useReJobsContext() as IRejobsContext;
  const { createHito, deleteHito } = useCurriculum();

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const [errores, setErrores] = useState<string[]>([]);
  const [exitos, setExitos] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const err: string[] = [];
    if (!nombre) err.push("El Campo nombre es Requerido");
    if (!date) err.push("El Campo Fecha es Requerido");
    if (!descripcion) err.push("El Campo url es Requerido");

    if (err.length != 0) return setErrores(err);
    const newHito = {
      hito: nombre,
      fecha: date,
      descripcion,
      url,
      idCurriculum: curriculum.id,
    };
    await createHito(newHito);
    await getCV();
    console.log(curriculum);
    setExitos(["Valor Agregado Correctamente"]);
    setNombre("");
    setDate("");
    setDescripcion("");
    setUrl("");
    setTimeout(() => {
      setExitos([]);
    }, 2000);
    setErrores([]);
    setErrores([]);
  };

  const handleEliminar = async (id: number) => {
    confirmAlert({
      title: "¿Estas Seguro de Eliminar El Valor?",
      message: "No podras revertir esto",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await deleteHito(id);
            getCV();
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">Mis Hitos</h2>
      <Errores errores={errores} />
      <Exito exitos={exitos} />
      <form action="" className="space-y-2 mt-5 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="hito"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Hito
          </label>
          <input
            type="text"
            name="hito"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border border-gray-300 p-1 rounded bg-white h-20"
          ></textarea>
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={today}
            className="border border-gray-300 p-1 rounded bg-white w-full"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="url"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Url (Opcional)
          </label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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

      <div className="grid space-y-2 h-72 overflow-y-scroll">
        {curriculum?.hitos?.map((hito, i) => (
          <div key={i} className="bg-white shadow p-4 h-fit">
            <h3 className="font-bold text-xl text-slate-900 pb-2">
              {hito.hito}
            </h3>
            <p className="text-sm text-slate-700">{hito.descripcion}</p>
            <div className="mt-1">
              {hito.url && (
                <a
                  href={hito.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-900 font-bold text-sm hover:underline"
                >
                  Enlace hito {hito.hito}
                </a>
              )}
            </div>
            <p className="text-xs font-bold text-slate-600 mt-4 text-end">
              {formatDate(hito.fecha)}
            </p>

            <button
              onClick={() => handleEliminar(hito.id)}
              className="bg-red-400 mt-4 transition-colors hover:bg-red-500 text-white uppercase p-2 rounded text-center cursor-pointer font-bold text-sm w-full"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hitos;
