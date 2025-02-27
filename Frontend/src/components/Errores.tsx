type Props = {
  errores: Array<string>;
};

const Errores = ({ errores }: Props) => {
  return (
    <>
      {errores.length != 0 && (
        <div className="space-y-2 mb-2">
          {errores.map((error, index) => (
            <p
              key={index}
              className="text-red-500 text-xs uppercase text-center bg-red-100 p-1 border border-red-500"
            >
              {error}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Errores;
