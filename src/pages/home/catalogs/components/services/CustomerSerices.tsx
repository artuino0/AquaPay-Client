import { useParams } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-overlays";
import ServiceForm from "./components/ServiceForm";
import { RenderBD } from "../../../../../components/RenderBD";
import { DataTableWPagination } from "@/components/DataTableWPagination";
import { useGetCustomerById } from "@/hooks/useCustomer";
import { Column } from "@/interfaces/columns";

const CustomerSerices = () => {
  const routeParams = useParams();
  const [customerId, setCustomerId] = useState<string | undefined>(
    routeParams.customerId
  );
  const [updater, setUpdater] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  const serviceColumns: Column[] = [
    { label: "Medidor", field: "meterNumber", type: "text" },
    {
      label: "Dirección",
      field: ["street", "number", "neighborhood"],
      type: "text",
    },
    { label: "Tipo", field: "serviceType", type: "text" },
    { label: "Estado", field: "status", type: "status" },
    { label: "Creado Por", field: "createdBy.name", type: "text" },
  ];

  const { data, isPending, error } = useGetCustomerById(customerId || "");

  const handleClose = () => setShowModal(false);

  return (
    <div className="">
      {data ? (
        <>
          <h2 className="border-b text-xl font-semibold  px-6 py-3">
            Servicios de {data?.name} {data?.lastName} {data?.middleName}
          </h2>
        </>
      ) : (
        <></>
      )}
      <DataTableWPagination
        columns={serviceColumns}
        data={data?.services || []}
        showActions={true}
        showEdit={true}
        handleEdit={() => setShowModal(true)}
        showDelete={true}
        handleDelete={() => console.log("Eliminando")}
        onRowClick={(user) => console.log("Fila clickeada:", user)}
      />

      {customerId ? (
        <div
          className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          +
        </div>
      ) : (
        <></>
      )}
      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <ServiceForm setShowModal={setShowModal} customerId={customerId!} />
      </Modal>
    </div>
  );
};

export default CustomerSerices;
