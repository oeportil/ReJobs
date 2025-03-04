import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useCandidato } from "../../hooks/useCandidato";
import { IUsuario } from "../../interface/IUser";
import { useCurriculum } from "../../hooks/useCurriculum";
import useSWR from "swr";
import { ICurriculum } from "../../interface/ICurriculum";
import { formatDate } from "../../utils";
import { useReactToPrint } from "react-to-print";

const Candidato = () => {
  const params = useParams();
  const { getCandidato } = useCandidato();
  const [candidato, setCandidato] = useState<IUsuario>();
  const { getCurriculum } = useCurriculum();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCandidato(+params.aplicantId).then((response) =>
      setCandidato(response.usuario)
    );
  }, []);
  const fetcher = () =>
    getCurriculum(+params.aplicantId).then((response) => response);
  const { data } = useSWR<{ curriculum: ICurriculum }>(
    `/curriculum/usuario/${params.aplicantId}`,
    fetcher
  );

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Candidato",
  });

  return (
    <div className="my-10 md:w-4/6 w-11/12 mx-auto">
      <button
        onClick={handlePrint}
        className="bg-sky-800 text-white p-2 rounded-md mb-2 cursor-pointer text-sm hover:bg-sky-900 transition-all"
      >
        Descargar PDF
      </button>{" "}
      <div
        ref={contentRef}
        className="my-4 bg-white rounded-lg shadow-md shadow-slate-400"
      >
        <div className="flex flex-col gap-12 md:flex-row items-center p-8">
          <img
            src={`http://localhost:8080/api/usuarios/imgsrc/${candidato?.pfp}`}
            alt="Imagen de candidato"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {candidato?.nombre} {candidato?.apellido}
            </h2>
            <p className="font-bold text-slate-700">{candidato?.email}</p>
            <p className="font-bold text-sm text-slate-700">
              {candidato?.telefono}
            </p>
          </div>
        </div>
        {data?.curriculum && (
          <div className="p-8">
            <h4 className="text-slate-700 font-bold border-b border-slate-700">
              Descripcion
            </h4>
            <p className="mt-2 mb-4 text-sm">{data.curriculum.descripcion}</p>

            <h4 className="text-slate-700 font-bold border-b border-slate-700">
              Biografia
            </h4>
            <p className="mt-2 mb-4 text-sm">{data.curriculum.biografia}</p>

            <h4 className="text-slate-700 font-bold border-b border-slate-700">
              Idiomas
            </h4>
            {data.curriculum?.idiomas?.map((idioma) => (
              <p key={idioma.id} className="mt-1 last-of-type:mb-4 text-sm">
                {idioma.idioma}
              </p>
            ))}

            <h4 className="text-slate-700 font-bold border-b border-slate-700 mt-4">
              Titulos Academicos
            </h4>
            {data.curriculum?.academicas?.map((academica) => (
              <div key={academica.id} className="my-2  pb-2 ">
                <p className="mt-1 text-sm">{academica.titulo}</p>
                <p className="mt-1 text-xs uppercase font-bold text-slate-700">
                  {academica.institucion}, {academica.sede}
                </p>
                <p className="text-sm text-slate-800 mt-1">
                  {academica.descripcion}
                </p>
                <p className="text-end font-bold text-xs">
                  {formatDate(academica.fecha)}
                </p>
              </div>
            ))}

            <h4 className="text-slate-700 font-bold border-b border-slate-700 mt-4">
              Experiencias
            </h4>
            {data.curriculum?.experiencias?.map((experiencia) => (
              <div key={experiencia.id} className="my-2  pb-2 ">
                <p className="mt-1 text-sm">{experiencia.area}</p>
                <p className="mt-1 text-xs uppercase font-bold text-slate-700">
                  {experiencia.empresa}, {experiencia.cargo}
                </p>
                <p className="text-sm text-slate-800 mt-1">
                  {experiencia.descripcion}
                </p>
                <p className="text-end font-bold text-xs flex justify-between">
                  <span>{formatDate(experiencia.fechaInicio)}</span>
                  {formatDate(experiencia.fechaFin)}
                </p>
              </div>
            ))}

            <h4 className="text-slate-700 font-bold border-b border-slate-700 mt-4">
              Hitos
            </h4>
            {data.curriculum?.hitos?.map((hito) => (
              <div key={hito.id} className="my-2  pb-2 ">
                <p className="mt-1 text-sm">{hito.hito}</p>
                <p className="text-sm text-slate-800 mt-1">
                  {hito.descripcion}
                </p>
                <a
                  className="text-sm text-sky-900 underline"
                  href={hito.url}
                  target="_blank"
                >
                  Ver Enlace
                </a>
                <p className="text-end font-bold text-xs ">
                  {formatDate(hito.fecha)}
                </p>
              </div>
            ))}

            <h4 className="text-slate-700 font-bold border-b border-slate-700 mt-4">
              Valores
            </h4>
            {data.curriculum?.valores?.map((valor) => (
              <div key={valor.id} className="my-2 pb-2">
                <p className="mt-1 text-sm">{valor.valor}</p>
                <p className="text-sm text-slate-800 mt-1">
                  {valor.descripcion}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidato;
