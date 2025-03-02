import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCategoria } from "../../hooks/useCategoria";
import { IVacante } from "../../interface/IVacante";
import Errores from "../../components/Errores";
import { useVacante } from "../../hooks/useVacante";

const GuardarVacante = () => {
  const [errores, setErrores] = useState<string[]>([]);
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);
  const isEdit = () => params.id;
  const [categorias, setCategorias] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [subcategorias, setSubCategorias] = useState<
    { id: number; nombre: string }[]
  >([]);
  const { listCategorias, subCategoriasByID } = useCategoria();
  const { createVacante } = useVacante();

  const [vacante, setVacante] = useState<IVacante>({
    empresa: "",
    fechaInicio: "",
    fechaFin: "",
    contrato: "",
    nombre: "",
    ciudad: "",
    region: "",
    pais: "",
    emailContacto: "",
    idSubCategoria: 0,
    telefonoContacto: "",
    horario: "",
    formato: "",
    salario: 0,
    descripcion: "",
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const {id} = JSON.parse(localStorage.getItem('REJOBS_TOKEN'));
    e.preventDefault();
    const err = [];
    Object.keys(vacante).forEach((key) => {
      if (vacante[key] === "" || vacante[key] === 0) {
        err.push(`El Campo ${key} es Requerido o es Incorrecto`);
      }
    });
    if (err.length != 0) return setErrores(err);
    setErrores([]);
    const newVacante = {
      ...vacante,
      idUsuario: id
    };
    await createVacante(newVacante);
    navigate("/vacancy");
  };

  return (
    <div className="my-10 md:w-4/6 w-11/12 mx-auto">
      <h2
        className="text-4xl font-bold text-slate-800 
        text-center"
      >
        {isEdit() ? "Editar Vacante" : " Crear Vacante"}
      </h2>
      <Errores errores={errores} />
      <form
        action=""
        className="space-y-2 mt-5 p-4"
        onSubmit={handleSubmit}
        method="post"
      >
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
            value={vacante.empresa}
            onChange={(e) =>
              setVacante({ ...vacante, empresa: e.currentTarget.value })
            }
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
            value={vacante.fechaInicio}
            onChange={(e) =>
              setVacante({ ...vacante, fechaInicio: e.currentTarget.value })
            }
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
            value={vacante.fechaFin}
            onChange={(e) =>
              setVacante({ ...vacante, fechaFin: e.currentTarget.value })
            }
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
            value={vacante.nombre}
            onChange={(e) =>
              setVacante({ ...vacante, nombre: e.currentTarget.value })
            }
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
              value={vacante.ciudad}
              onChange={(e) =>
                setVacante({ ...vacante, ciudad: e.currentTarget.value })
              }
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
              value={vacante.region}
              onChange={(e) =>
                setVacante({ ...vacante, region: e.currentTarget.value })
              }
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
              value={vacante.pais}
              onChange={(e) =>
                setVacante({ ...vacante, pais: e.currentTarget.value })
              }
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
              value={vacante.telefonoContacto}
              onChange={(e) =>
                setVacante({
                  ...vacante,
                  telefonoContacto: e.currentTarget.value,
                })
              }
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
              value={vacante.emailContacto}
              onChange={(e) =>
                setVacante({
                  ...vacante,
                  emailContacto: e.currentTarget.value,
                })
              }
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
              value={vacante.horario}
              onChange={(e) =>
                setVacante({
                  ...vacante,
                  horario: e.currentTarget.value,
                })
              }
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
              value={vacante.formato}
              onChange={(e) =>
                setVacante({
                  ...vacante,
                  formato: e.currentTarget.value,
                })
              }
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
              value={vacante.contrato}
              onChange={(e) =>
                setVacante({
                  ...vacante,
                  contrato: e.currentTarget.value,
                })
              }
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
            value={vacante.salario}
            onChange={(e) =>
              setVacante({
                ...vacante,
                salario: +e.currentTarget.value,
              })
            }
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
            onChange={handleChange}
          >
            <option value="" disabled>
              --Selecciona una Categoria--
            </option>
            {categorias.map((categoria, i) => (
              <option value={categoria.id} key={i}>
                {categoria.nombre}
              </option>
            ))}
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
            value={vacante.idSubCategoria}
            onChange={(e) =>
              setVacante({ ...vacante, idSubCategoria: +e.currentTarget.value })
            }
          >
            <option value="">-- Selecciona una SubCategoria --</option>
            {subcategorias.map((subcategoria, i) => (
              <option value={subcategoria.id} key={i}>
                {subcategoria.nombre}
              </option>
            ))}
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
            value={vacante.descripcion}
            onChange={(e) =>
              setVacante({
                ...vacante,
                descripcion: e.currentTarget.value,
              })
            }
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
