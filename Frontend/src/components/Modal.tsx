import ReactModal from "react-modal";
import useReJobsContext from "../hooks/useReJobsContext";
import { IRejobsContext } from "../context/ReJobsProvider";
import { useAuth } from "../hooks/useAuth";

const Modal = () => {
  const { modalView, setModalView } = useReJobsContext() as IRejobsContext;
  const { logout } = useAuth();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: " #e6e6e6 ",
    },
  };
  ReactModal.setAppElement("#root");

  return (
    <ReactModal
      isOpen={modalView}
      onRequestClose={() => setModalView(false)}
      style={customStyles}
    >
      <button onClick={() => setModalView(false)} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className=" flex gap-0 md:flex-row flex-col items-center">
        <img
          src="/img/logout.png"
          alt="Imagen de logout"
          className="md:w-72 w-48"
        />
        <div>
          <h2 className="text-center font-bold text-xl">
            ¿Estás seguro de cerrar sesión?
          </h2>
          <p className="text-center font-bold text-sm text-slate-700">
            Esto eliminará todos tus datos de sesión.
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:items-center justify-center mt-5">
            <button
              onClick={() => {
                logout();
                setModalView(!modalView);
              }}
              className="bg-sky-800 text-white font-bold rounded p-2 hover:bg-sky-900 cursor-pointer transition-colors"
            >
              Aceptar
            </button>
            <button
              onClick={() => setModalView(false)}
              className="bg-red-500 text-white font-bold rounded p-2 hover:bg-red-600 cursor-pointer transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
