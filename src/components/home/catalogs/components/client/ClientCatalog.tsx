import { useEffect, useState } from "react";
import { Modal } from "react-overlays";
import { ICustomer } from "../../../../../types/customer.interface";
import { RenderBD } from "../../../../shared/RenderBD";
import ClientForm from "./components/ClientForm";
import ClientsRows from "./components/ClientsTable";
import ClientInput from "./components/ClientInput";
import requestController from "../../../../../helpers/request.axios";

const ClientCatalog = () => {
  const [customers, setCustomers] = useState<ICustomer[]>();
  const [mutatedCustomers, setMutatedCustomers] = useState<ICustomer[]>();
  const [updater, setUpdater] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);

  useEffect(() => {
    requestController<ICustomer[]>({
      method: "GET",
      endpoint: "customers",
    }).then((data) => {
      setCustomers(data);
      setMutatedCustomers(data);
    });
  }, [updater]);

  const handleCustomerSeletion = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  return (
    <div className="">
      <table className="w-full text-sm">
        <thead className="sticky top-0">
          <tr>
            <td className="py-2 px-2 w-fit bg-white text-right border-b" colSpan={8}>
              <ClientInput customers={customers!} setMutatedCustomers={setMutatedCustomers} />
            </td>
          </tr>
          <tr className="border-b bg-gray-100">
            <th className="py-3 px-2 w-fit">Contrato:</th>
            <th className="py-2">Nombre:</th>
            <th className="px-2">Correo:</th>
            <th className="px-2">Telefono:</th>
            <th className="px-2">Servicios:</th>
            <th className="px-2">Estado:</th>
            <th className="px-2">Creado Por:</th>
            <th className="px-2 text-deep-blue">
              <i className="bi bi-three-dots-vertical"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers ? (
            <ClientsRows customers={mutatedCustomers!} handleCustomerSeletion={handleCustomerSeletion} />
          ) : (
            <tr>
              <td colSpan={8}>Cargando</td>
            </tr>
          )}
        </tbody>
      </table>

      <div onClick={() => setShowModal(true)} className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer">
        +
      </div>

      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <ClientForm selectedCustomer={selectedCustomer} setShowModal={setShowModal} setUpdater={setUpdater} updater={updater} setSelectedCustomer={setSelectedCustomer} />
      </Modal>
    </div>
  );
};

export default ClientCatalog;
