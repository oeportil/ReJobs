import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Errores from "../../components/Errores";
import { useRequisito } from "../../hooks/useRequisito";
import Exito from "../../components/Exito";
import { IRequisito } from "../../interface/IVacante";
import { confirmAlert } from "react-confirm-alert";

const Requisitos = () => {
  const { createRequisito, listRequisitos, deleteRequisito } = useRequisito();

  const params = useParams();
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [minimo, setMinimo] = useState<boolean>(false);

  const [errores, setErrores] = useState<string[]>([]);
  const [exitos, setExitos] = useState<string[]>([]);
  const [requisitos, setRequisitos] = useState<IRequisito[]>([]);

  useEffect(() => {
    listRequisitos(+params.id).then((response) => {
      setRequisitos(response);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = [];
    if (!nombre) err.push("El Campo Nombre es Requerido");
    if (!descripcion) err.push("El Campo Descripción es Requerido");
    if (err.length != 0) return setErrores(err);
    setErrores([]);
    const newRequisito = {
      nombre,
      descripcion,
      minimo,
      idVacante: parseInt(params.id),
    };
    await createRequisito(newRequisito);
    const response = await listRequisitos(+params.id);
    setRequisitos(response);
    setNombre("");
    setDescripcion("");
    setMinimo(false);
    setExitos(["Requisito creado con Exito"]);
  };

  const handleEliminar = async (id: number) => {
    confirmAlert({
      title: "¿Estas Seguro de Eliminar El Requisito?",
      message: "No podras revertir esto",
      buttons: [
        {
          label: "Si",
          onClick: async () => {
            await deleteRequisito(id);
            const response = await listRequisitos(+params.id);
            setRequisitos(response);
            setExitos(["Requisito Eliminado con Exito"]);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="my-10 md:w-4/6 w-11/12 mx-auto">
      <h2 className="text-4xl font-bold text-slate-800">Requisitos</h2>
      <Errores errores={errores} />
      <Exito exitos={exitos} />
      <form
        action=""
        className="space-y-2 mt-5 p-4"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col ">
          <label
            htmlFor="nombre"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Requisito
          </label>
          <input
            type="text"
            name="nombre"
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
        <div className="flex items-center my-8">
          <input
            type="checkbox"
            className="w-5 size-4 cursor-pointer"
            name="minimo"
            checked={minimo}
            onChange={(e) => setMinimo(e.target.checked)}
            id="minimo"
          />
          <label
            htmlFor="minimo"
            className="text-gray-600 font-bold uppercase text-xs ml-1"
          >
            Obligatorio
          </label>
        </div>
        <button
          type="submit"
          className="bg-sky-900 hover:bg-sky-950 cursor-pointer flex gap-1 items-center my-4 text-white p-3 rounded-md uppercase font-bold text-sm w-fit"
        >
          Crear
        </button>
      </form>

      {/* Requisitos */}
      <h3 className="font-bold text-xl mb-2">Requisitos Agregados</h3>
      <div className="grid space-y-2">
        {requisitos.map((requisito) => (
          <div className="bg-white shadow p-4">
            <h3 className="font-bold text-xl text-slate-900 pb-2">
              {requisito.nombre}
            </h3>
            <p className="text-sm text-slate-700">{requisito.descripcion}</p>
            <p className="uppercase text-sm text-slate-800 font-bold mt-4">
              Obligatorio: {requisito.minimo ? "Si" : "No"}
            </p>
            <button
              onClick={() => handleEliminar(requisito.id)}
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

export default Requisitos;
