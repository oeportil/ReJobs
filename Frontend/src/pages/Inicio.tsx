import React, { useEffect, useState } from "react";
import VacanteCard from "../components/VacanteCard";
import { useCategoria } from "../hooks/useCategoria";

const Inicio = () => {
  const [categorias, setCategorias] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [subcategorias, setSubCategorias] = useState<
    { id: number; nombre: string }[]
  >([]);
  const { listCategorias, subCategoriasByID } = useCategoria();

  useEffect(() => {
    listCategorias().then((response) => {
      setCategorias(response.categorias);
    });
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    const response = await subCategoriasByID(+e.currentTarget.value.toString());
    setSubCategorias(response.subcategorias);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto my-4 bg-[url(../../public/img/banner.jpg)]">
        <h2 className="text-center text-slate-700 font-bold text-2xl ">
          Encuentra el trabajo de tu Sueños
        </h2>
        <form action="" className=" mt-2 md:w-auto w-11/12 mx-auto">
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
              <select name="" id="" className="md:min-w-48 text-center w-full">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              <select name="" id="" className="min-w-48 text-center w-full">
                <option value=""> Fecha </option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto max-w-6xl w-11/12 my-10">
        {/* VacanteCard */}
        <VacanteCard />
        <VacanteCard />
        <VacanteCard />
        <VacanteCard />
        {/* VacanteCard */}
      </section>
    </>
  );
};

export default Inicio;
