import React, { FormEvent, useEffect, useState } from "react";
import { useCategoria } from "../hooks/useCategoria";
import { useVacante } from "../hooks/useVacante";
import { IVacante } from "../interface/IVacante";
import VacanteCard from "../components/VacanteCard";
import useSWR from "swr";

const Inicio = () => {
  const [vacantes, setVacantes] = useState<IVacante[]>([]);
  const { listVacantesSearch, listAllVacantes, listVacantesSearchSubCat } =
    useVacante();

  const [categorias, setCategorias] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [subcategorias, setSubCategorias] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [orden, setOrden] = useState<boolean>(false);
  const [idSubCategoria, setIdSubCategoria] = useState<string>("");
  const { listCategorias, subCategoriasByID } = useCategoria();

  const [int, setInt] = useState<number>(1000);

  useEffect(() => {
    listCategorias().then((response) => {
      setCategorias(response.categorias);
    });
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    const response = await subCategoriasByID(+e.currentTarget.value.toString());
    setIdSubCategoria("");
    setSubCategorias(response.subcategorias);
  };

  const handleBuscar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const search = fd.get("busqueda").toString() ?? "";

    if (!idSubCategoria && search) {
      listVacantesSearch(search, orden).then((response) => {
        setVacantes(response);
      });
      setInt(0);
    } else if (idSubCategoria.length > 0) {
      listVacantesSearchSubCat(search, +idSubCategoria, orden).then(
        (response) => {
          setVacantes(response);
        }
      );
      setInt(0);
    } else {
      console.log("busqueda simple");
      listAllVacantes().then((response) => {
        setVacantes(response);
      });
      setInt(1000);
    }
  };

  const fetchData = () =>
    listAllVacantes().then((response) => setVacantes(response));
  useSWR("/vacantes/all", fetchData, {
    refreshInterval: int,
  });

  return (
    <>
      <div className="max-w-3xl mx-auto my-4 bg-[url(../../public/img/banner.jpg)]">
        <h2 className="text-center text-slate-700 font-bold text-2xl ">
          Encuentra el trabajo de tu Sueños
        </h2>
        <form
          action=""
          className=" mt-2 md:w-auto w-11/12 mx-auto"
          onSubmit={handleBuscar}
        >
          <div className="flex">
            <input
              type="text"
              name="busqueda"
              placeholder="¿Qué trabajo estás buscando?"
              className="border border-gray-300 p-1 rounded-bl-full rounded-tl-full w-full bg-white"
            />
            <button
              type="submit"
              className="bg-sky-900 hover:bg-sky-950 cursor-pointer transition-colors text-white p-2 rounded-br-full rounded-tr-full
              "
            >
              Buscar
            </button>
          </div>
          <div className="flex gap-2 md:flex-row flex-col justify-center items-center">
            <div className="flex gap-2 mt-2 bg-white md:w-fit w-full p-2 rounded-full text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
              <select
                name=""
                id=""
                className="md:min-w-48 text-center w-full"
                onChange={handleChange}
              >
                <option value="">Todas las Categorias</option>
                {categorias.map((categoria, i) => (
                  <option value={categoria.id} key={i}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-2 bg-white md:w-fit w-full p-2 rounded-full text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <select
                name=""
                id=""
                className="md:min-w-48 text-center w-full"
                value={idSubCategoria}
                onChange={(e) => setIdSubCategoria(e.target.value ?? "")}
              >
                <option value="">Todas las SubCategorias</option>
                {subcategorias.map((subcategoria, i) => (
                  <option value={subcategoria.id} key={i}>
                    {subcategoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mt-2 bg-white md:w-fit w-full  p-2 rounded-full text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
              <div className="flex items-center flex-row ">
                <label htmlFor="" className="md:min-w-48 text-center">
                  Orden Ascendente
                </label>
                <input
                  type="checkbox"
                  name="asc"
                  id="asc"
                  className="mr-4"
                  onChange={(e) => setOrden(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto max-w-6xl w-11/12 my-10">
        {vacantes?.map((vacante, i) => (
          <VacanteCard key={i} vacante={vacante} />
        ))}
      </section>
    </>
  );
};

export default Inicio;
