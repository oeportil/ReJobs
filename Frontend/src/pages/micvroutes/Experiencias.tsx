import { FormEvent, useState } from "react";
import Errores from "../../components/Errores";
import useReJobsContext from "../../hooks/useReJobsContext";
import { IRejobsContext } from "../../context/ReJobsProvider";
import { useCurriculum } from "../../hooks/useCurriculum";
import Exito from "../../components/Exito";
import { formatDate } from "../../utils";
import { confirmAlert } from "react-confirm-alert";

const Experiencias = () => {
  const [errores, setErrores] = useState<string[]>([]);
  const [exitos, setExitos] = useState<string[]>([]);

  const { curriculum, getCV } = useReJobsContext() as IRejobsContext;
  const { createExperiencia, deleteExperiencia } = useCurriculum();

  const [experiencia, setExperiencia] = useState<{
    empresa: string;
    fecha_inicio: string;
    fecha_fin: string;
    cargo: string;
    area: string;
    descripcion: string;
  }>({
    empresa: "",
    fecha_inicio: "",
    fecha_fin: "",
    cargo: "",
    area: "",
    descripcion: "",
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err: string[] = [];
    Object.keys(experiencia).forEach((key) => {
      if (experiencia[key] === "") {
        err.push(`El Campo ${key} es Requerido`);
      }
    });
    if (err.length != 0) return setErrores(err);
    setErrores([]);
    const newExperiencia = {
      ...experiencia,
      idCurriculum: curriculum.id,
    };
    await createExperiencia(newExperiencia);
    setExperiencia({
      empresa: "",
      fecha_inicio: "",
      fecha_fin: "",
      cargo: "",
      area: "",
      descripcion: "",
    });
    getCV();
    setExitos(["Experiencia creada Correctamente"]);
    setTimeout(() => {
      setExitos([]);
    }, 2000);
  };

  const handleEliminar = (id: number) => {
    confirmAlert({
      title: "¿Estas Seguro de Eliminar El Valor?",
      message: "No podras revertir esto",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await deleteExperiencia(id);
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
      <h2 className="text-4xl font-bold text-slate-800">Mis Experiencias</h2>
      <Exito exitos={exitos} />
      <Errores errores={errores} />
      <form action="" className="space-y-2 mt-5 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="empresa"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Empresa
          </label>
          <input
            type="text"
            value={experiencia.empresa}
            onChange={(e) =>
              setExperiencia({ ...experiencia, empresa: e.target.value })
            }
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
            value={experiencia.fecha_inicio}
            onChange={(e) =>
              setExperiencia({ ...experiencia, fecha_inicio: e.target.value })
            }
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
            value={experiencia.fecha_fin}
            onChange={(e) =>
              setExperiencia({ ...experiencia, fecha_fin: e.target.value })
            }
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
            value={experiencia.cargo}
            onChange={(e) =>
              setExperiencia({ ...experiencia, cargo: e.target.value })
            }
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
            value={experiencia.area}
            onChange={(e) =>
              setExperiencia({ ...experiencia, area: e.target.value })
            }
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
            value={experiencia.descripcion}
            onChange={(e) =>
              setExperiencia({ ...experiencia, descripcion: e.target.value })
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
        {curriculum?.experiencias?.map((experiencia, i) => (
          <div className="bg-white shadow p-4 h-fit" key={i}>
            <div>
              <h3 className="font-bold text-xl text-slate-900 ">
                {experiencia.cargo}
              </h3>
              <p className="text-xs text-slate-600 mb-2">{experiencia.area}</p>
              <p className="font-bold text-sm uppercase text-slate-500">
                {experiencia.empresa}
              </p>
            </div>
            <p className="text-sm text-slate-700 text-justify">
              {experiencia.descripcion}
            </p>
            <div className="flex justify-between">
              <p className="text-xs font-bold text-slate-600 mt-4 text-end ">
                Inicio: {formatDate(experiencia.fechaInicio)}
              </p>
              <p className="text-xs font-bold text-slate-600 mt-4 text-end">
                Fin: {formatDate(experiencia.fechaFin)}
              </p>
            </div>
            <button
              onClick={() => handleEliminar(experiencia.id)}
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

export default Experiencias;
