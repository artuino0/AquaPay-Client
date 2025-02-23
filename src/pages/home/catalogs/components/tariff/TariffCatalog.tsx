import { useEffect, useState } from "react";
import { Modal } from "react-overlays";
import { RenderBD } from "@/components/RenderBD";
import TariffForm from "./components/TariffForm";
import { ITariff, TariffElement } from "@/types/tariff.interface";
import { getStringDateCreated } from "@/helpers/date.string";
import requestController from "@/helpers/request.axios";
import TariffList from "./components/TariffList";
import ChangeStore from "@/store/ChangesStore";
import floppy from "@/assets/svgs/floppy.svg";
import { useActivateTariff, useGetTariffs } from "@/hooks/useTariff";
import { DataTableWPagination } from "@/components/DataTableWPagination";
import { TariffColumns } from "@/builders/columns/TariffColumns";
import { useUpdateTariff } from "@/hooks/useTariff";
import ConfirmModal from "@/components/ConfirModal";

const TariffCatalog = () => {
  const [tableOpen, setTableOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalActivate, setShowModalActivate] = useState<boolean>(false);
  const [selectedTariff, setSelectedTariff] = useState<ITariff | null>(null);
  const [tariffsCubic, setTariffCubic] = useState<TariffElement[] | null>(null);
  const [cycleId, setCycleId] = useState<string | null>(null);
  const [updater, setUpdater] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { changes, clearChanges } = ChangeStore();
  const { data, isPending, refetch } = useGetTariffs();
  const updateTariffMutation = useUpdateTariff();
  const activateTariffMutation = useActivateTariff();

  useEffect(() => {
    let d = new Date();
    setMonth(d.getMonth() + 1);
  }, []);
  useEffect(() => {
    refetch();
    if (cycleId && data?.data) {
      const updatedTariff = data.data.find((t) => t._id === cycleId);
      if (updatedTariff) {
        setTariffCubic(updatedTariff.tariffs);
      }
    }
  }, [updater, cycleId]);
  const saveChanges = () => {
    updateTariffMutation.mutate(
      { tariffId: cycleId!, tariffData: changes },
      {
        onSuccess: () => {
          // get tariffs from tarrifId
          let newtariff = data?.data?.find((t) => t._id === cycleId);
          setTariffCubic(newtariff?.tariffs || []);
          clearChanges();
          setUpdater((prev) => prev + 1);
        },
      }
    );
  };
  const handleEdit = (tariff: ITariff) => {
    setTariffCubic(tariff.tariffs);
    setCycleId(tariff._id);
  };
  const handleActivate = (tariff: ITariff) => {
    const currentYear = new Date().getFullYear();
    if (tariff.year !== currentYear) {
      setSelectedTariff(tariff);
      setShowModalActivate(true);
    } else {
      activateTariffMutation.mutate(tariff._id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  const handleConfirmActivate = () => {
    if (selectedTariff) {
      activateTariffMutation.mutate(selectedTariff._id, {
        onSuccess: () => {
          refetch();
          setShowModalActivate(false);
          setSelectedTariff(null);
        },
      });
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="w-full">
          {month == 12 || month == 1 || !data?.data?.length ? (
            <div className="flex justify-end p-3">
              <button
                className="bg-deep-blue text-white px-6 py-2"
                onClick={() => setShowModal(true)}
              >
                Generar nuevo ciclo
              </button>
            </div>
          ) : null}
          <DataTableWPagination
            columns={TariffColumns}
            data={data?.data || []}
            limit={limit}
            currentPage={currentPage}
            pagination={data?.pagination}
            setLimit={setLimit}
            onPageChange={setCurrentPage}
            showActions
            showEdit
            handleEdit={handleEdit}
            showActivate
            handleActivate={handleActivate}
          />
        </div>

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
      <Modal
        className="modal"
        show={showModalActivate}
        onHide={() => setShowModalActivate(false)}
        renderBackdrop={RenderBD}
      >
        <ConfirmModal
          text={`Activando tarifa ${selectedTariff?.year}`}
          handleSubmit={handleConfirmActivate}
          handleCancel={() => setShowModalActivate(false)}
          title="Activar tarifa"
        >
          <p>
            Estas a punto de activar una tarifa del año{" "}
            <span className="font-semibold">{selectedTariff?.year}</span>, este
            proceso puede afectar los cobros. <br /> <br />
            ¿Estás seguro de que deseas continuar?
          </p>
        </ConfirmModal>
      </Modal>
    </div>
  );
};

export default TariffCatalog;
