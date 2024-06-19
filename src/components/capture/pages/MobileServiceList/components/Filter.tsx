import { IService } from "../../../../../types/service.interface";
import { useState } from "react";

interface IProps {
  services: IService[];
  mutatedServices: IService[];
  setMutatedServices: (newValue: IService[]) => void;
}

const Filter: React.FC<IProps> = ({ services, setMutatedServices }) => {
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    if (e.target.value.length === 0) {
      setMutatedServices(services);
      return;
    }

    const filteredServices = services.filter((service) => {
      const fullString = `${service.number} ${service.street} ${service.customerId.externalContractId} ${service.customerId.name} ${service.customerId.middleName} ${service.customerId.lastName} `;
      return fullString.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setMutatedServices(filteredServices);
  };

  return (
    <div className="sticky top-[46px]">
      <input className="border border-t-0 pl-2 pr-12 py-3 w-full outline-none rounded-none" type="text" placeholder="Buscar servicio" onChange={handleChange} />
      <i className="bi bi-search absolute right-4 top-4 text-gray-400"></i>
    </div>
  );
};

export default Filter;
