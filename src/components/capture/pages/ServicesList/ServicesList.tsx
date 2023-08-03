import { useState } from "react";
import Filter from "./components/Filter";
import { IService } from "../../../../types/service.interface";
import { useEffect } from "react";
import requestController from "../../../../helpers/request.axios";
import { Link } from "react-router-dom";

const ServicesList = () => {
  const [services, setServices] = useState<IService[]>();
  const [mutatedServices, setMutatedServices] = useState<IService[]>();

  useEffect(() => {
    requestController<IService[]>({ endpoint: "services", method: "GET" }).then((data) => {
      setServices(data);
      setMutatedServices(data);
    });
  }, []);

  return (
    <div className="">
      <h1 className="text-xl font-bold bg-gray-100 px-2 py-3 border">Lista de servicios</h1>
      <Filter services={services!} mutatedServices={mutatedServices!} setMutatedServices={setMutatedServices} />
      <ul className="text-sm">
        {mutatedServices?.map((service) => (
          <div key={service._id}>
            {service.meterNumber !== "" ? (
              <Link to={`${service._id}`} key={service._id} className="flex items-center justify-between border border-t-0 px-2 py-2 leading-tight even:bg-gray-50">
                <div>
                  <span>
                    {service.street} #{service.number}
                  </span>
                  <br />
                  <small className="text-gray-400">
                    {service.customerId.externalContractId} - {service.customerId.name} {service.customerId.lastName} {service.customerId.middleName}
                  </small>
                </div>
                <i className="bi bi-chevron-right"></i>
              </Link>
            ) : null}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
