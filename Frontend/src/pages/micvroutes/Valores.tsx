import { FormEvent, useRef, useState } from "react";
import { IRejobsContext } from "../../context/ReJobsProvider";
import useReJobsContext from "../../hooks/useReJobsContext";
import Errores from "../../components/Errores";
import { useCurriculum } from "../../hooks/useCurriculum";

import { confirmAlert } from "react-confirm-alert";
import Exito from "../../components/Exito";

const Valores = () => {
  const { curriculum, getCV } = useReJobsContext() as IRejobsContext;
  const [errores, setErrores] = useState<string[]>([]);
  const [exitos, setExitos] = useState<string[]>([]);
  const { createValor, deleteValor } = useCurriculum();

  const nombreRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const idCurriculum = curriculum.id;
    const valor = formData.get("valor");
    const descripcion = formData.get("descripcion");
    if (!valor || !descripcion) {
      setErrores(["Los campos de valor y descripción son requeridos"]);
      return;
    }
    const newValor = {
      idCurriculum,
      valor,
      descripcion,
    };
    await createValor(newValor);
    await getCV();
    setExitos(["Valor Agregado Correctamente"]);
    nombreRef.current.value = "";
    descripcionRef.current.value = "";
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
            await deleteValor(id);
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
      <h2 className="text-4xl font-bold text-slate-800">Mis Valores</h2>
      <Errores errores={errores} />
      <Exito exitos={exitos} />
      <form action="" className="space-y-2 mt-5 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="valor"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Valor
          </label>
          <input
            type="text"
            name="valor"
            ref={nombreRef}
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
            ref={descripcionRef}
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

      <div className="grid space-y-2 h-60 overflow-y-scroll">
        {curriculum?.valores?.map((valor, i) => (
          <div className="bg-white shadow p-4 h-fit" key={i}>
            <h3 className="font-bold text-xl text-slate-900 pb-2">
              {valor.valor}
            </h3>
            <p className="text-sm text-slate-700">{valor.descripcion}</p>
            <button
              onClick={() => handleEliminar(valor.id)}
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

export default Valores;
