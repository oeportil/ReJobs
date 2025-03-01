import { FormEvent, useEffect, useRef, useState } from "react";
import Warning from "../../components/Warning";
import { IRejobsContext } from "../../context/ReJobsProvider";
import useReJobsContext from "../../hooks/useReJobsContext";
import Errores from "../../components/Errores";
import Exito from "../../components/Exito";

const CV = () => {
  const { curriculum, createcv, getCV, updatecv } =
    useReJobsContext() as IRejobsContext;
  const [errores, setErrores] = useState<string[]>([]);
  const [exitos, setExitos] = useState<string[]>([]);
  const biograRef = useRef<HTMLTextAreaElement>(null);
  const descripRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const err = [];
    e.preventDefault();
    const { id } = JSON.parse(localStorage.getItem("REJOBS_TOKEN"));
    const formData = new FormData(e.currentTarget);
    const descripcion = formData.get("descripcion") ?? "";
    const biografia = formData.get("biografia") ?? "";
    const Cv = {
      descripcion,
      biografia,
      idUsuario: id,
    };
    Object.keys(Cv).forEach((key) => {
      if (Cv[key] === "") {
        err.push(`El campo ${key} es requerido`);
      }
    });
    if (err.length != 0) return setErrores(err);
    if (!curriculum) {
      createcv(Cv);
    } else {
      const { idUsuario, ...upCV } = Cv;
      updatecv(upCV, curriculum.id).then((response) => {
        setExitos(response);
        setTimeout(() => {
          setExitos([]);
        }, 3000);
      });
    }
  };
  useEffect(() => {
    getCV().then((response) => {
      if (response) {
        biograRef.current.value = response.biografia;
        descripRef.current.value = response.descripcion;
      }
    });
  }, []);

  return (
    <div className="my-10">
      {" "}
      {!curriculum && (
        <Warning warnings={["Crea un Curriculum para Añadir mas Campos"]} />
      )}
      <h2 className="text-4xl font-bold text-slate-800">
        Crea o Edita tu Curriculum Vitae
      </h2>
      <Errores errores={errores} />
      <Exito exitos={exitos} />
      <form action="" className="space-y-4 my-5 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="descripcion"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Descripción
          </label>
          <textarea
            ref={descripRef}
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
            ref={biograRef}
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
