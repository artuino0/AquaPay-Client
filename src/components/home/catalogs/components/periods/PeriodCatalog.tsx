import requestController from "../../../../../helpers/request.axios";
import { useEffect, useState } from "react";
import { IPeriod } from "../../../../../types/period.interface";
import { getStringDateCreated } from "../../../../../helpers/date.string";
import { Modal } from "react-overlays";
import { RenderBD } from "../../../../shared/RenderBD";
import PeriodForm from "./components/PeriodForm";

const PeriodCatalog = () => {
  const [periods, setPeriods] = useState<IPeriod[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [date, setDate] = useState<number>(0);
  const [updater, setUpdater] = useState<number>(0);

  useEffect(() => {
    const d = new Date();
    setDate(d.getDate());
    requestController<IPeriod[]>({ endpoint: "periods", method: "GET" }).then((data) => {
      setPeriods(data);
    });
  }, [updater]);

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 border-b sticky top-0">
            <th className="px-6 py-3">Nombre</th>
            <th>Alta</th>
            <th>Registro</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => (
            <tr key={period.id} className={(period.active ? "bg-green-100 text-green-600 hover:bg-green-100 " : "even:bg-gray-50 hover:bg-gray-100 ") + "text-center"}>
              <td className="px-6 py-3 font-medium">{period.name}</td>
              <td>{getStringDateCreated(period.createdAt)}</td>
              <td>{period.createdBy.name}</td>
              <td className="text-center">{period.active ? <span className="text-green-500">Activo</span> : <span className="text-red-500">Inactivo</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[28, 29, 30, 31, 15, 16, 17].includes(date) ? (
        <div className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer" onClick={() => setShowModal(true)}>
          +
        </div>
      ) : null}
      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <PeriodForm setShowModal={setShowModal} setUpdater={setUpdater} updater={updater} />
      </Modal>
    </div>
  );
};

export default PeriodCatalog;
