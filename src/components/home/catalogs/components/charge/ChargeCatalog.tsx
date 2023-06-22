import { useEffect, useState } from "react";
import { ICharge } from "../../../../../types/charge.interface";
import { Modal } from "react-overlays";
import { RenderBD } from "../../../../shared/RenderBD";
import ChargeForm from "./components/ChargeForm";
import requestController from "../../../../../helpers/request.axios";

const ChargeCatalog = () => {
  const [charges, setCharges] = useState<ICharge[]>();
  const [updater, setUpdater] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    requestController<ICharge[]>({ endpoint: "charges", method: "GET" }).then((data) => {
      setCharges(data);
    });
  }, []);

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-3 px-2 w-fit">Nombre del cargo:</th>
            <th className="py-2">Tarifa:</th>
            <th className="px-2">Estado:</th>
            <th className="px-2">Creado Por:</th>
            <th className="px-2 text-deep-blue">
              <i className="bi bi-three-dots-vertical"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {charges?.map((charge) => (
            <tr className="cursor-default border-b last:border-b-0 even:bg-gray-50 hover:bg-gray-100" key={charge.id}>
              <td className="text-left px-6 w-fit">{charge.name}</td>
              <td className="px-6 py-3 text-center">{charge.amount}</td>
              <td className="text-center">{charge.active ? <span className="text-green-500">Activo</span> : <span className="text-red-500">Inactivo</span>}</td>
              <td className="text-center">{charge.createdBy?.name ? charge.createdBy?.name : "N/A"}</td>
              <td className="text-center flex justify-center items-center py-3 gap-6 text-base">
                <i className="bi bi-pencil-square hover:text-deep-blue cursor-pointer"></i>
                <i className="bi bi-trash hover:text-red-500 cursor-pointer"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal className={"modal"} show={showModal} onHide={handleClose} renderBackdrop={RenderBD}>
        <ChargeForm setShowModal={setShowModal} setUpdater={setUpdater} updater={updater} />
      </Modal>
      <div onClick={() => setShowModal(true)} className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer">
        +
      </div>
    </div>
  );
};

export default ChargeCatalog;
