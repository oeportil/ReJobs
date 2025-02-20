import { useParams } from "react-router";

const GuardarVacante = () => {
  const params = useParams();
  console.log(params);
  const isEdit = () => params.id;

  return (
    <div className="my-10 md:w-4/6 w-11/12 mx-auto">
      <h2
        className="text-4xl font-bold text-slate-800 
        text-center"
      >
        {isEdit() ? "Editar Vacante" : " Crear Vacante"}
      </h2>

      <form action="" className="space-y-2 mt-5 p-4">
        <div className="flex flex-col ">
          <label
            htmlFor="empresa"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre Empresa
          </label>
          <input
            type="text"
            name="empresa"
            className="border border-gray-300 p-1 rounded bg-white"
            placeholder="Ejem: ReWare Studios, Netflix ..."
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="fecha_inicio"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Fecha de Inicio
          </label>
          <input
            type="date"
            name="fecha_incio"
            className="border border-gray-300 p-1 rounded bg-white w-full"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="fecha_fin"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Fecha de Fin
          </label>
          <input
            type="date"
            name="fecha_fin"
            className="border border-gray-300 p-1 rounded bg-white w-full"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="nombre"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Titulo
          </label>
          <input
            type="text"
            name="nombre"
            className="border border-gray-300 p-1 rounded bg-white"
            placeholder="Programador de C++"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-2">
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
              placeholder="Santa Ana"
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
              placeholder="Santa Ana"
            />
          </div>

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
              placeholder="Singapur"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-col ">
            <label
              htmlFor="tel_contacto"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Telefono de Contacto
            </label>
            <input
              type="tel"
              name="tel_contacto"
              className="border border-gray-300 p-1 rounded bg-white"
              placeholder="6007 0489"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="email_contacto"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Email de Contacto
            </label>
            <input
              type="email"
              name="email_contacto"
              className="border border-gray-300 p-1 rounded bg-white"
              placeholder="email@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-2">
          <div className="flex flex-col ">
            <label
              htmlFor="horario"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Horario
            </label>
            <input
              type="text"
              name="horario"
              className="border border-gray-300 p-1 rounded bg-white"
              placeholder="De 8 de la mañana a 4 de la tarde, lunes a viernes"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="formato"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Formato
            </label>
            <input
              type="text"
              name="formato"
              className="border border-gray-300 p-1 rounded bg-white"
              placeholder="Remoto"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="contrato"
              className="text-gray-600 font-bold uppercase text-xs mb-1"
            >
              Contrato
            </label>
            <input
              type="text"
              name="contrato"
              className="border border-gray-300 p-1 rounded bg-white"
              placeholder="6 meses"
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="salario"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Salario
          </label>
          <input
            type="number"
            name="salario"
            className="border border-gray-300 p-1 rounded bg-white"
            placeholder="$5000"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="categoria"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Categoria
          </label>
          <select
            name="categoria"
            id="categoria"
            className="border border-gray-300 p-1 rounded bg-white"
          >
            <option value=""></option>
          </select>
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="subcategoria_id"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            SubCategoria
          </label>
          <select
            name="subcategoria_id"
            id="subcategoria_id"
            className="border border-gray-300 p-1 rounded bg-white"
          >
            <option value=""></option>
          </select>
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
            className="border border-gray-300 p-1 rounded bg-white h-20"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-sky-900 hover:bg-sky-950 cursor-pointer flex gap-1 items-center my-4 text-white p-3 rounded-md uppercase font-bold text-sm w-fit"
        >
          {isEdit() ? "Editar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default GuardarVacante;
