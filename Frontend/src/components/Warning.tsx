type Props = {
  warnings: Array<string>;
};

const Warning = ({ warnings }: Props) => {
  return (
    <>
      {warnings.length != 0 && (
        <div className="space-y-2 mb-2">
          {warnings.map((warn, index) => (
            <p
              key={index}
              className="text-orange-500 text-xs uppercase text-center bg-orange-100 p-1 border border-orange-500"
            >
              {warn}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Warning;
