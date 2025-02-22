import { useState } from "react";
import { Modal } from "react-overlays";
import { ICustomer } from "../../../../../types/customer.interface";
import { RenderBD } from "../../../../../components/RenderBD";
import ClientForm from "./components/ClientForm";
import { DataTableWPagination } from "@/components/DataTableWPagination";
import { customerColumns } from "@/builders/columns/ClientColumns";
import { useNavigate } from "react-router-dom";
import { useGetCustomers } from "@/hooks/useCustomer";

const ClientCatalog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [updater, setUpdater] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );

  const columns = customerColumns;
  const navigate = useNavigate();

  const { data, isPending, error } = useGetCustomers(
    currentPage,
    limit,
    showDeleted
  );

  const handleCustomerSeletion = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = (customer: any) => {};

  const handleNavigation = (customer: any) => {
    navigate(`../customer/${customer.id}/services`);
  };

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
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-blue-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium">Ocultar inactivos</span>
        </label>
      </div>
      <DataTableWPagination
        columns={columns}
        data={data?.data || []}
        limit={limit}
        currentPage={currentPage}
        pagination={data?.pagination}
        setLimit={setLimit}
        onPageChange={setCurrentPage}
        showActions
        showEdit
        handleEdit={handleCustomerSeletion}
        showServices
        handleServices={handleNavigation}
        showDelete
        handleDelete={handleDelete}
      />

      <div
        onClick={() => setShowModal(true)}
        className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer"
      >
        +
      </div>

      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <ClientForm
          selectedCustomer={selectedCustomer}
          setShowModal={setShowModal}
          setSelectedCustomer={setSelectedCustomer}
        />
      </Modal>
    </div>
  );
};

export default ClientCatalog;
