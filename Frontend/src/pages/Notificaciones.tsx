import { useEffect, useState } from "react";
import { useCategoria } from "../hooks/useCategoria";
import { useNotificacion } from "../hooks/useNotificacion";
import useSWR from "swr";

const Notificaciones = () => {
  const [categorias, setCategorias] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [notificaciones, setNotificaciones] = useState<
    { id: number; categoriaId: number }[]
  >([]); // Guarda los id de notificaciones y categorías

  const { listCategorias } = useCategoria();
  const { addNotificacion, deleteNotificacion, getNotificaciones } =
    useNotificacion();
  const { id } = JSON.parse(localStorage.getItem("REJOBS_TOKEN")!);

  const fetcher = () =>
    getNotificaciones(id).then((response) => {
      const notificacionesData = response.notificaciones.map((noti) => ({
        id: noti.id, // id de la notificación
        categoriaId: noti.categoria.id, // id de la categoría asociada
      }));
      setNotificaciones(notificacionesData);
    });

  useSWR(`/notificaciones/usuario/${id}`, fetcher, { refreshInterval: 500 });

  useEffect(() => {
    listCategorias().then((response) => setCategorias(response.categorias));
  }, []);

  return (
    <div className="my-10 w-11/12 md:w-4/6 mx-auto">
      <h2 className="text-4xl font-bold text-slate-800 text-center">
        Notificaciones
      </h2>
      <p className="text-center text-slate-700 mt-2">
        Al suscribirse a cualquiera de las categorías del sistema de
        notificaciones, usted recibirá correos sobre las nuevas vacantes que se
        creen.
      </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 mt-4">
        {categorias.map((cat) => {
          const isNotificado = notificaciones.some(
            (noti) => noti.categoriaId === cat.id
          );

          return (
            <div
              key={cat.id}
              className={`p-2 cursor-pointer rounded-md text-center transition-colors 
                ${
                  isNotificado
                    ? "bg-sky-800 text-white shadow-md"
                    : "bg-white hover:shadow"
                }
              `}
              onClick={() => handleClick(cat.id)}
            >
              {cat.nombre}
            </div>
          );
        })}
      </div>
    </div>
  );

  // Maneja la adición o eliminación de notificaciones
  async function handleClick(idCategoria: number) {
    const existingNotification = notificaciones.find(
      (noti) => noti.categoriaId === idCategoria
    );

    if (!existingNotification) {
      // Si la notificación no existe, agregarla
      const addNoti = { idCategoria, idUsuario: id };
      await addNotificacion(addNoti);
    } else {
      await deleteNotificacion(existingNotification.id);
    }
  }
};

export default Notificaciones;
