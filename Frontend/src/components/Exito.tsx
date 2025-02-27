type Props = {
  exitos: string[];
};

const Exito = ({ exitos }: Props) => {
  return (
    <>
      {exitos.length != 0 && (
        <div className="space-y-2 mb-2">
          {exitos.map((exito, index) => (
            <p
              key={index}
              className="text-green-700 text-xs uppercase text-center bg-green-100 p-1 border border-green-500"
            >
              {exito}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Exito;
