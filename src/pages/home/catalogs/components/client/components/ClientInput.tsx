import { useState } from "react";
import { ICustomer } from "../../../../../../types/customer.interface";

interface IProps {
  customers: ICustomer[];
  setMutatedCustomers: (newData: ICustomer[]) => void;
}

const ClientInput = (props: IProps) => {
  const { customers, setMutatedCustomers } = props;
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    if (e.target.value.length === 0) {
      setMutatedCustomers(customers);
    }

    setMutatedCustomers([]);

    const filteredCustomers = customers.filter((customer) => {
      const { externalContractId, name, lastName, middleName, email, phoneNumber } = customer;
      const customerData = `${externalContractId} ${name} ${lastName} ${middleName} ${email} ${phoneNumber}`;
      return customerData.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setMutatedCustomers(filteredCustomers);
  };

  return <input type="text" className="border py-2 px-2 w-[500px] rounded-md outline-deep-blue" placeholder="Buscar por contrato, nombre, correo o telefono" value={keyword} onChange={handleSearch} />;
};

export default ClientInput;
