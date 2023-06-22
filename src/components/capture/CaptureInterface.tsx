import { useState, useEffect } from "react";
import { IService } from "../../types/service.interface";
import axios from "axios";
import { BASE_PATH } from "../../global.variables";
const CaptureInterface = () => {
  const [services, setServices] = useState<IService[]>();
  const Authorization = window.localStorage.getItem("token");

  useEffect(() => {
    if (window.innerWidth > 700) {
      alert("Esta seccion solo esta disponible para dispositivos moviles");
      window.location.href = "/";
    }

    axios.get<IService[]>(`${BASE_PATH}/services`, { headers: { Authorization } }).then(({ data }) => {
      setServices(data);
    });
  }, []);

  return (
    <>
      <div className="bg-deep-blue text-white text-xl px-3 py-5 shadow-md sticky top-0 left-0">Linea de captura</div>
      <div className="">
        <h1 className="text-xl font-bold bg-gray-100 px-2 py-3 border">Lista de servicios</h1>
        <div className="relative">
          <input className="border border-t-0 pl-2 pr-12 py-3 w-full outline-deep-blue rounded-none" type="text" placeholder="Buscar servicio" />
          <i className="bi bi-search absolute right-4 top-4 text-gray-400"></i>
        </div>
        <ul>
          {services?.map((service) => (
            <li key={service._id} className="flex items-center justify-between border border-t-0 px-2 py-2 leading-tight even:bg-gray-50">
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CaptureInterface;
