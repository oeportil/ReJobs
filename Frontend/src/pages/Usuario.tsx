import { useEffect, useRef, useState } from "react";
import { useUsuario } from "../hooks/useUsuario";
import Errores from "../components/Errores";
import Exito from "../components/Exito";

const Usuario = () => {
  const { getUsuario, updateUsuario, updatePassword, updateImg } = useUsuario();
  const [error, setErrores] = useState<Array<string>>([]);
  const [exito, setExito] = useState<string[]>([]);
  const [usuario, setUsuario] = useState<{ nombre: string; apellido: string }>({
    nombre: "",
    apellido: "",
  });
  const nombre = useRef(null);
  const apellido = useRef(null);
  const email = useRef(null);
  const telefono = useRef(null);
  useEffect(() => {
    getUsuario().then((response) => {
      const { usuario } = response;
      nombre.current.value = usuario.nombre;
      apellido.current.value = usuario.apellido;
      email.current.value = usuario.email;
      telefono.current.value = usuario.telefono;
      setUsuario({ nombre: usuario.nombre, apellido: usuario.apellido });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err: string[] = [];

    const form = new FormData(e.currentTarget);
    const nombre = (form.get("nombre") as string) ?? "";
    const apellido = (form.get("apellido") as string) ?? "";
    const email = (form.get("email") as string) ?? "";
    const telefono = (form.get("telefono") as string) ?? "";
    const password = (form.get("password") as string) ?? "";
    const password_conf = (form.get("password_conf") as string) ?? "";
    const img = (form.get("img") as File) ?? "";

    const UpdateUsuario = {
      nombre,
      apellido,
      email,
      telefono,
    };
    Object.keys(UpdateUsuario).forEach((field) => {
      if (UpdateUsuario[field].length == 0) {
        err.push(`El Campo ${field} es Requerido`);
      }
    });
    if (password != password_conf) {
      err.push("Las Contraseñas no coinciden");
    }

    if (err.length != 0) return setErrores(err);
    updateUsuario(UpdateUsuario, setErrores, setExito, exito);
    if (password.toString().length != 0) {
      updatePassword(password.toString(), setErrores, setExito, exito);
    }
    if (img.name) {
      const formData = new FormData();
      formData.append("file", img);
      updateImg(formData, setErrores, setExito, exito);
    }
    setTimeout(() => {
      setExito([]);
    }, 3000);
  };

  return (
    <div className="my-10">
      <h2 className="text-4xl font-bold text-slate-800">
        Tu Información: {usuario.nombre + " " + usuario.apellido}
      </h2>
      <Errores errores={error} />
      <Exito exitos={exito} />
      <form action="" className="space-y-4 p-2" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label
            htmlFor="nombre"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Nombre
          </label>
          <input
            ref={nombre}
            type="text"
            name="nombre"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col ">
          <label
            htmlFor="apellido"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Apellido
          </label>
          <input
            ref={apellido}
            type="text"
            name="apellido"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Email
          </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="telefono"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Telefono
          </label>
          <input
            ref={telefono}
            type="tel"
            name="telefono"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Repetir Password
          </label>
          <input
            type="password"
            name="password_conf"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="img"
            className="text-gray-600 font-bold uppercase text-xs mb-1"
          >
            Subir o Actualizar Imagen
          </label>
          <input
            type="file"
            name="img"
            className="border border-gray-300 p-1 rounded bg-white"
          />
        </div>
        <input
          type="submit"
          value={"Editar Informacion"}
          className="bg-sky-800 text-white font-bold text-center p-2 rounded w-full hover:bg-sky-950 transition-colors cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Usuario;
