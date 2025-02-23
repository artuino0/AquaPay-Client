import { useState } from "react";
import { Modal } from "react-overlays";
import { IPeriod } from "../../../../../types/period.interface";
import { RenderBD } from "../../../../../components/RenderBD";
import PeriodForm from "./components/PeriodForm";
import { DataTableWPagination } from "@/components/DataTableWPagination";
import { useGetPeriods } from "@/hooks/usePeriods";

const PeriodCatalog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [date, setDate] = useState<number>(new Date().getDate());
  const [updater, setUpdater] = useState<number>(0);
  const [showDeleted, setShowDeleted] = useState(false);

  const { data, error, isPending } = useGetPeriods();

  return (
    <div className="relative">
      <div className="p-3 flex justify-end">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-blue-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium">Ocultar inactivos</span>
        </label>
      </div>
      <DataTableWPagination
        columns={[
          { label: "Nombre", field: "name", type: "text" },
          { label: "Alta", field: "createdAt", type: "date" },
          { label: "F. Inicio", field: "fecha_inicio", type: "date" },
          { label: "F. Fin", field: "fecha_fin", type: "date" },
          { label: "F. Limite Pago", field: "fecha_limite_pago", type: "date" },
          { label: "Creado Por", field: "createdBy.name", type: "text" },
          { label: "Activo", field: "active", type: "status" },
        ]}
        data={data || []}
        limit={limit}
        currentPage={currentPage}
        setLimit={setLimit}
        onPageChange={setCurrentPage}
        showActions={false}
      />
      {[22, 29, 30, 31, 15, 16, 17].includes(date) ? (
        <div
          className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          +
        </div>
      ) : null}
      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <PeriodForm
          setShowModal={setShowModal}
          setUpdater={setUpdater}
          updater={updater}
        />
      </Modal>
    </div>
  );
};

export default PeriodCatalog;
