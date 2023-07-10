import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICustomerByID } from "../../../../../types/customer.interface";
import { Modal } from "react-overlays";
import ServiceForm from "./components/ServiceForm";
import { RenderBD } from "../../../../shared/RenderBD";
import requestController from "../../../../../helpers/request.axios";

const CustomerSerices = () => {
  const routeParams = useParams();
  const [customer, setCustomer] = useState<ICustomerByID>();
  const [customerId, setCustomerId] = useState<string | undefined>(routeParams.customerId);
  const [updater, setUpdater] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!customerId) return;
    requestController<ICustomerByID>({ endpoint: `customers/${customerId}`, method: "GET" }).then((data) => {
      setCustomer(data);
    });
  }, [customerId, updater]);

  const handleClose = () => setShowModal(false);

  return (
    <div className="">
      {/* <InputSelector setCustomerId={setCustomerId} /> */}
      <div>
        {customer ? (
          <>
            <h2 className="border-b text-xl font-semibold  px-6 py-3">
              Servicios de {customer?.name} {customer?.lastName} {customer?.middleName}
            </h2>
          </>
        ) : (
          <></>
        )}

        {/* Resto del contenido */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left py-3 px-6 w-fit">Medidor:</th>
              <th className="py-2">Direccion:</th>
              <th className="px-2">Tipo:</th>
              <th className="px-2">Estado:</th>
              <th className="px-2">Creado Por:</th>
              <th className="px-2 text-deep-blue">
                <i className="bi bi-three-dots-vertical"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {customer?.services?.map((service) => (
              <tr className="cursor-default border-b last:border-b-0 even:bg-gray-50 hover:bg-gray-100" key={service._id}>
                <td className="px-6 py-3">{service.meterNumber === "" ? "N/A" : service.meterNumber}</td>
                <td className="text-center w-fit">
                  {service.street} #{service.number}, {service.city}, {service.state}
                </td>
                <td className="text-center w-fit">{service.serviceType === "domestic" ? <>Domestico</> : service.serviceType === "commercial" ? <>Comercial</> : <>Mixto</>}</td>
                <td className="text-center">{service.status ? <span className="text-green-500">Activo</span> : <span className="text-red-500">Inactivo</span>}</td>
                <td className="text-center w-fit">{service.createdBy.name}</td>
                <td className="text-center flex justify-center items-center py-3 gap-6 text-base">
                  <i className="bi bi-pencil-square hover:text-deep-blue cursor-pointer"></i>
                  <i className="bi bi-trash hover:text-red-500 cursor-pointer"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {customerId ? (
        <div className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer" onClick={() => setShowModal(true)}>
          +
        </div>
      ) : (
        <></>
      )}
      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <ServiceForm setShowModal={setShowModal} customerId={customerId!} setUpdater={setUpdater} updater={updater} />
      </Modal>
    </div>
  );
};

export default CustomerSerices;

{
  /* <tr className="cursor-default border-b last:border-b-0 even:bg-gray-50 hover:bg-gray-100">
              <td className="text-center w-fit">{customer.externalContractId}</td>
              <td className="px-6 py-3 text-center">
                {customer.name} {customer.lastName} {customer.middleName}
              </td>
              <td className="text-center">{customer.email ? <a href={`mailto:${customer.email}`}>{customer.email}</a> : "Sin registro"}</td>
              <td className="text-center">{customer.phoneNumber ? <a href={`tel:+52${customer.phoneNumber}`}>{customer.phoneNumber}</a> : "Sin registro"}</td>
              <td className="text-center">
                <Link className="text-deep-blue" to={`../services/${customer.id}`}>
                  Ver {customer.services.length}
                </Link>
              </td>
              <td className="text-center">{customer.active ? <span className="text-green-500">Activo</span> : <span className="text-red-500">Inactivo</span>}</td>
              <td className="text-center">{customer.createdBy?.name ? customer.createdBy?.name : "N/A"}</td>
              <td className="text-center flex justify-center items-center py-3 gap-6 text-base">
                <i className="bi bi-pencil-square hover:text-deep-blue cursor-pointer"></i>
                <i className="bi bi-trash hover:text-red-500 cursor-pointer"></i>
              </td>
            </tr> */
}
