import { FormEvent, useEffect, useRef, useState } from "react";
import { IRejobsContext } from "../../context/ReJobsProvider";
import useReJobsContext from "../../hooks/useReJobsContext";
import Errores from "../../components/Errores";
import { useCurriculum } from "../../hooks/useCurriculum";

import { confirmAlert } from "react-confirm-alert";
import Exito from "../../components/Exito";

const Idiomas = () => {
  const { getCV, curriculum } = useReJobsContext() as IRejobsContext;
  const { createIdioma, deleteIdioma } = useCurriculum();
  const [errores, setErrores] = useState<string[]>([]);
  const [exitos, setExitos] = useState<string[]>([]);
  const idiomaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCV().then((response) => {
      console.log(response);
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const idCurriculum = curriculum.id;
    const idioma = formData.get("idioma");
    if (!idioma) {
      setErrores(["EL campo de idioma es requerido"]);
      return;
    }
    const newIdioma = {
      idCurriculum,
      idioma,
    };
    await createIdioma(newIdioma);
    await getCV();
    idiomaRef.current.value = "";
    setExitos(["Idioma Agregado Correctamente"]);
    setTimeout(() => {
      setExitos([]);
    }, 2000);
    setErrores([]);
  };

  const handleDelete = (id: number) => {
    confirmAlert({
      title: "¿Estas Seguro de Eliminar El Idioma?",
      message: "No podras revertir esto",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await deleteIdioma(id);
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
    return;
  };
  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">Mis Idiomas</h2>
      <Errores errores={errores} />
      <Exito exitos={exitos} />
      <form action="" className="space-y-2 mt-5 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="idioma"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Idioma
          </label>
          <input
            ref={idiomaRef}
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

      <div className="grid space-y-2 h-60 overflow-y-scroll">
        {curriculum?.idiomas?.map((idioma, i) => (
          <div
            key={i}
            className="bg-white shadow p-4 flex flex-col md:flex-row gap-4 justify-between items-center"
          >
            <h3 className="font-bold text-xl text-slate-900 ">
              {idioma.idioma}
            </h3>
            <button
              onClick={() => handleDelete(idioma.id)}
              className="bg-red-400  transition-colors hover:bg-red-500 text-white uppercase p-2 rounded text-center cursor-pointer font-bold text-sm md:w-fit w-full"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Idiomas;
