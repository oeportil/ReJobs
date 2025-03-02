import { useState } from "react";
import Errores from "../../components/Errores";
import Exito from "../../components/Exito";
import useReJobsContext from "../../hooks/useReJobsContext";
import { IRejobsContext } from "../../context/ReJobsProvider";
import { useCurriculum } from "../../hooks/useCurriculum";
import { formatDate } from "../../utils";
import { confirmAlert } from "react-confirm-alert";

const Titulos = () => {
  const [errores, setErrores] = useState<string[]>([]);
  const { getCV, curriculum } = useReJobsContext() as IRejobsContext;
  const { createTitulo, deleteTitulo } = useCurriculum();
  const [exitos, setExitos] = useState<string[]>([]);
  const [titulo, setTitulo] = useState<{
    institucion: string;
    fecha: string;
    sede: string;
    titulo: string;
    descripcion: string;
  }>({
    institucion: "",
    fecha: "",
    sede: "",
    titulo: "",
    descripcion: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err: string[] = [];
    Object.keys(titulo).forEach((key) => {
      if (titulo[key] === "") {
        err.push(`El Campo ${key} es Requerido`);
      }
    });
    if (err.length != 0) return setErrores(err);
    setErrores([]);
    const newTitulo = {
      idCurriculum: curriculum.id,
      ...titulo,
    };
    await createTitulo(newTitulo);
    setTitulo({
      institucion: "",
      fecha: "",
      sede: "",
      titulo: "",
      descripcion: "",
    });
    getCV();
    setExitos(["Título Agregado Correctamente"]);
    setTimeout(() => {
      setExitos([]);
    }, 2000);
  };

  const hadndleEliminar = async (id: number) => {
    confirmAlert({
      title: "¿Estas Seguro de Eliminar El Titulo?",
      message: "No podras revertir esto",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await deleteTitulo(id);
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
      <h2 className="text-4xl font-bold text-slate-800">
        Mis Titulos Academicos
      </h2>
      <Errores errores={errores} />
      <Exito exitos={exitos} />
      <form action="" className="space-y-2 mt-5 p-4" onSubmit={handleSubmit}>
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
            value={titulo.institucion}
            onChange={(e) =>
              setTitulo({ ...titulo, institucion: e.target.value })
            }
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
            value={titulo.fecha}
            onChange={(e) => setTitulo({ ...titulo, fecha: e.target.value })}
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
            value={titulo.sede}
            onChange={(e) => setTitulo({ ...titulo, sede: e.target.value })}
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
            value={titulo.titulo}
            onChange={(e) => setTitulo({ ...titulo, titulo: e.target.value })}
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
            value={titulo.descripcion}
            onChange={(e) =>
              setTitulo({ ...titulo, descripcion: e.target.value })
            }
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

      <div className="grid space-y-2 h-72 overflow-y-scroll">
        {curriculum?.academicas?.map((titulo, i) => (
          <div key={i} className="bg-white shadow p-4 h-fit">
            <h3 className="font-bold text-xl text-slate-900 pb-2">
              {titulo.titulo}
            </h3>
            <p className="font-bold text-sm uppercase text-slate-500">
              {titulo.institucion}, {titulo.sede}
            </p>
            <p className="text-sm text-slate-700">{titulo.descripcion}</p>
            <p className="text-xs font-bold text-slate-600 mt-4 text-end">
              {formatDate(titulo.fecha)}
            </p>
            <button
              onClick={() => hadndleEliminar(titulo.id)}
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

export default Titulos;
