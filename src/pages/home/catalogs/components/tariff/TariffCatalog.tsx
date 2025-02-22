import { useEffect, useState } from "react";
import { Modal } from "react-overlays";
import { RenderBD } from "../../../../../components/RenderBD";
import TariffForm from "./components/TariffForm";
import { ITariff, TariffElement } from "../../../../../types/tariff.interface";
import { getStringDateCreated } from "../../../../../helpers/date.string";
import requestController from "../../../../../helpers/request.axios";
import TariffList from "./components/TariffList";
import ChangeStore from "../../../../../store/ChangesStore";
import floppy from "../../../../../assets/svgs/floppy.svg";

const TariffCatalog = () => {
  const [tableOpen, setTableOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tariffs, setTariffs] = useState<ITariff[]>([]);
  const [tariffsCubic, setTariffCubic] = useState<TariffElement[] | null>(null);
  const [cycleId, setCycleId] = useState<string | null>(null);
  const [updater, setUpdater] = useState<number>(0);

  const { changes, clearChanges } = ChangeStore();

  useEffect(() => {
    let d = new Date();
    setMonth(d.getMonth() + 1);
  }, []);

  useEffect(() => {
    requestController<ITariff[]>({
      endpoint: "tariffs",
      method: "GET",
    }).then((data) => {
      setTariffs(data);
    });
  }, [updater]);

  const saveChanges = () => {
    requestController({
      endpoint: `tariffs/${cycleId}`,
      method: "PUT",
      body: changes,
    })
      .then(() => {
        alert("tarifas actualizadas correctamente");
        clearChanges();
      })
      .catch(() => {});
  };

  return (
    <div>
      <div className="flex">
        <table className="w-full text-sm h-fit sticky top-0">
          <thead>
            {month == 12 || month == 1 || tariffs.length === 0 ? (
              <tr>
                <td className="py-3 px-2 text-right" colSpan={5}>
                  <button
                    className="bg-deep-blue text-white px-6 py-2"
                    onClick={() => setShowModal(true)}
                  >
                    Generar nuevo ciclo
                  </button>
                </td>
              </tr>
            ) : null}
            <tr className="bg-gray-100 border-b sticky top-0">
              <th className="py-3 px-2">Ciclo:</th>
              <th className="px-2">Fecha de alta:</th>
              <th className="px-2">Creado Por:</th>
              <th className="px-2">Estado:</th>
              <th className="px-2 text-deep-blue">
                <i
                  className="bi bi-three-dots-vertical"
                  onClick={() => setTableOpen(!tableOpen)}
                ></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {tariffs.map((tariff) => (
              <tr
                key={tariff._id}
                className="border-gray-200 text-center hover:bg-gray-50"
              >
                <td className="py-3 px-2">{tariff.year}</td>
                <td className="px-2">
                  {getStringDateCreated(tariff.createdAt)}
                </td>
                <td className="px-2">{tariff.createdBy.name}</td>
                <td className="text-center">
                  {tariff.active ? (
                    <span className="text-green-500">Activo</span>
                  ) : (
                    <span className="text-red-500">Inactivo</span>
                  )}
                </td>
                <td className="px-2 text-deep-blue">
                  <i
                    className="bi bi-pencil-square hover:text-deep-blue cursor-pointer"
                    onClick={() => {
                      setTariffCubic(tariff.tariffs);
                      setCycleId(tariff._id);
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tariffsCubic && cycleId ? (
          <TariffList cycleId={cycleId} tariffsCubic={tariffsCubic} />
        ) : null}
      </div>
      {changes.length != 0 && tariffsCubic ? (
        <button
          className="fixed bottom-[5.5rem] right-6 bg-blue-600 text-white h-14 w-14 shadow-lg rounded-full text-xl flex justify-center items-center"
          onClick={() => saveChanges()}
        >
          <img src={floppy} alt="" className="w-8" />
        </button>
      ) : null}
      {tariffsCubic ? (
        <button
          className="fixed bottom-6 right-6 bg-red-600 text-white h-14 w-14 shadow-lg rounded-full text-xl"
          onClick={() => setTariffCubic(null)}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      ) : null}
      <Modal className="modal" show={showModal} renderBackdrop={RenderBD}>
        <TariffForm
          setShowModal={setShowModal}
          setUpdater={setUpdater}
          updater={updater}
        />
      </Modal>
    </div>
  );
};

export default TariffCatalog;
