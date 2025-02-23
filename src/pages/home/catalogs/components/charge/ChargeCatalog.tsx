import { useState } from "react";
import { Modal } from "react-overlays";
import { RenderBD } from "@/components/RenderBD";
import ChargeForm from "./components/ChargeForm";
import { useGetCharges, useDeleteCharge } from "@/hooks/useCharge";
import { DataTableWPagination } from "@/components/DataTableWPagination";
import { chargeColumns } from "@/builders/columns/ChargeColumns";
import { ICharge } from "@/types/charge.interface";
import ConfirmModal from "@/components/ConfirModal";

const ChargeCatalog = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState<ICharge | null>(null);
  const { data: charges, isLoading } = useGetCharges();
  const deleteChargeMutation = useDeleteCharge();

  const handleClose = () => setShowModal(false);
  const handleEdit = (charge: ICharge) => {
    setSelectedCharge(charge);
    setShowModal(true);
  };

  const handleDelete = (charge: ICharge) => {
    setSelectedCharge(charge);
    setShowModalDelete(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCharge) {
      deleteChargeMutation.mutate(selectedCharge.id);
      setShowModalDelete(false);
      setSelectedCharge(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataTableWPagination
        columns={chargeColumns}
        data={charges || []}
        showActions
        showEdit
        handleEdit={handleEdit}
        showDelete
        handleDelete={handleDelete}
      />
      <Modal
        className={"modal"}
        show={showModal}
        onHide={handleClose}
        renderBackdrop={RenderBD}
      >
        <ChargeForm
          setShowModal={setShowModal}
          selectedCharge={selectedCharge}
          setSelectedCharge={setSelectedCharge}
        />
      </Modal>
      <Modal
        className={"modal"}
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        renderBackdrop={RenderBD}
      >
        <ConfirmModal
          text={`Eliminando cargo ${selectedCharge?.name}`}
          handleSubmit={handleConfirmDelete}
          handleCancel={() => setShowModalDelete(false)}
          title="Eliminar cargo"
        >
          <p>
            Estas a punto de eliminar el cargo{" "}
            <span className="font-semibold">{selectedCharge?.name}</span>, este
            proceso es irreversible. <br /> <br />
            ¿Estás seguro de que deseas continuar?
          </p>
        </ConfirmModal>
      </Modal>
      <div
        onClick={() => setShowModal(true)}
        className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer"
      >
        +
      </div>
    </div>
  );
};

export default ChargeCatalog;
