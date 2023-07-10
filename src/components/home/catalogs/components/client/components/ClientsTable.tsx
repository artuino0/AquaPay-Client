import { Link } from "react-router-dom";
import { ICustomer } from "../../../../../../types/customer.interface";

interface IProps {
  customers: ICustomer[];
  handleCustomerSeletion: (newValue: ICustomer) => void;
}

const ClientsRows = (props: IProps) => {
  const { customers, handleCustomerSeletion } = props;
  return (
    <>
      {customers?.map((customer) => (
        <tr className="cursor-default border-b last:border-b-0 even:bg-gray-50 hover:bg-gray-100 text-sm" key={customer.id}>
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
            <i className="bi bi-pencil-square hover:text-deep-blue cursor-pointer" onClick={() => handleCustomerSeletion(customer)}></i>
            <i className="bi bi-trash hover:text-red-500 cursor-pointer"></i>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ClientsRows;
