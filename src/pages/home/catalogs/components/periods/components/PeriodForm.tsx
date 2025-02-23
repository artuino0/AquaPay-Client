import { useState, useEffect } from "react";
import { MESES } from "../../../../../../global.variables";
import { useCreatePeriod } from "@/hooks/usePeriods";
import moment from "moment";

interface IProps {
  setShowModal: (newValue: boolean) => void;
  setUpdater: (newValue: number) => void;
  updater: number;
}

const PeriodForm = (props: IProps) => {
  const { setShowModal, setUpdater, updater } = props;
  const createPeriodMutation = useCreatePeriod();

  const [months, setMonths] = useState<string[]>([]);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [paymentDeadline, setPaymentDeadline] = useState<string>("");

  useEffect(() => {
    setMonths(MESES);
    const d = new Date();
    setMonth(d.getMonth() + 1);
    setYear(d.getFullYear());

    // Set initial dates
    const initialDate = new Date(d.getFullYear(), d.getMonth(), 1);
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    const deadlineDate = new Date(d.getFullYear(), d.getMonth(), 15);

    setStartDate(initialDate.toISOString().split('T')[0]);
    setEndDate(lastDay.toISOString().split('T')[0]);
    setPaymentDeadline(deadlineDate.toISOString().split('T')[0]);
  }, []);

  const monthHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(event.target.value);
    setMonth(newMonth);

    // Update dates when month changes
    const startDate = new Date(year, newMonth - 1, 1);
    const endDate = new Date(year, newMonth, 0);
    const deadlineDate = new Date(year, newMonth - 1, 15);

    setStartDate(startDate.toISOString().split('T')[0]);
    setEndDate(endDate.toISOString().split('T')[0]);
    setPaymentDeadline(deadlineDate.toISOString().split('T')[0]);
  };

  const yearHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = Number(event.target.value);
    setYear(newYear);

    // Update dates when year changes
    const startDate = new Date(newYear, month - 1, 1);
    const endDate = new Date(newYear, month, 0);
    const deadlineDate = new Date(newYear, month - 1, 15);

    setStartDate(startDate.toISOString().split('T')[0]);
    setEndDate(endDate.toISOString().split('T')[0]);
    setPaymentDeadline(deadlineDate.toISOString().split('T')[0]);
  };
  const sendHandler = () => {
    createPeriodMutation.mutate(
      { 
        month, 
        year,
        fecha_inicio: new Date(startDate),
        fecha_fin: new Date(endDate),
        fecha_limite_pago: new Date(paymentDeadline)
      },
      {
        onSuccess: () => {
          setShowModal(false);
          setUpdater(updater + 1);
        },
      }
    );
  };

  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className="border-b px-6 py-3 text-deep-blue">Creando nuevo periodo</div>
      <div className="border-b px-6 py-3 space-y-3">
        <input
          type="text"
          className="border w-full px-3 py-2 rounded-md outline-deep-blue"
          value={year}
          placeholder="Año"
          onChange={yearHandler}
        />
        <select
          name="select"
          className="border w-full px-3 py-2 rounded-md outline-deep-blue text-black"
          onChange={monthHandler}
        >
          {months.map((monthIteration, i) => (
            <option key={i} value={i + 1} selected={i + 1 === month}>
              {monthIteration}
            </option>
          ))}
        </select>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
          <input
            type="date"
            className="border w-full px-3 py-2 rounded-md outline-deep-blue"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de fin</label>
          <input
            type="date"
            className="border w-full px-3 py-2 rounded-md outline-deep-blue"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha límite de pago</label>
          <input
            type="date"
            className="border w-full px-3 py-2 rounded-md outline-deep-blue"
            value={paymentDeadline}
            onChange={(e) => setPaymentDeadline(e.target.value)}
          />
        </div>
      </div>
      <div className="border-b px-6 py-3 text-deep-blue">
        <div className="flex justify-end gap-3">
          <button
            className="bg-red-300 text-red-600 px-6 py-2"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-deep-blue text-white px-6 py-2"
            onClick={sendHandler}
            disabled={createPeriodMutation.isPending}
          >
            {createPeriodMutation.isPending ? "Creando..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeriodForm;
