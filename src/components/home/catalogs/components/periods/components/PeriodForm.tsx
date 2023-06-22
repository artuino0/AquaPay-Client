import { useState, useEffect } from "react";
import { MESES } from "../../../../../../global.variables";
import axios from "axios";
import requestController from "../../../../../../helpers/request.axios";

interface IProps {
  setShowModal: (newValue: boolean) => void;
  setUpdater: (newValue: number) => void;
  updater: number;
}

const PeriodForm = (props: IProps) => {
  const { setShowModal, setUpdater, updater } = props;

  const [months, setMonths] = useState<string[]>([]);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  useEffect(() => {
    setMonths(MESES);
    const d = new Date();
    setMonth(d.getMonth() + 1);
    setYear(d.getFullYear());
  }, []);

  const monthHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.target.value));
  };

  const yearHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(Number(event.target.value));
  };

  const sendHandler = () => {
    requestController({ endpoint: "periods", method: "POST", body: { month, year } })
      .then(() => {
        alert("Perido creado");
        setShowModal(false);
        setUpdater(updater + 1);
      })
      .catch(() => {
        alert("Error al crear el periodo, revisa la combinacion Mes-Año");
      });
  };

  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className=" border-b px-6 py-3 text-deep-blue">Creando nuevo servicio</div>
      <div className=" border-b px-6 py-3">
        <input type="text" className="border w-full px-3 py-2 rounded-md outline-deep-blue" value={year} placeholder="Año" onChange={yearHandler} />
        <select name="select" className="border w-full px-3 py-2 mt-3 rounded-md outline-deep-blue text-black" onChange={monthHandler}>
          {months.map((monthIteration, i) => {
            return (
              <option key={i} value={i + 1} selected={i + 1 == month}>
                {monthIteration}
              </option>
            );
          })}
        </select>
      </div>
      <div className=" border-b px-6 py-3 text-deep-blue">
        <div className="flex justify-end gap-3 ">
          <button className="bg-red-300 text-red-600 px-6 py-2" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
          <button className="bg-deep-blue text-white px-6 py-2" onClick={sendHandler}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodForm;
