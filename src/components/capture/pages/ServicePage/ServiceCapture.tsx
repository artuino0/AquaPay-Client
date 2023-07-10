import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requestController from "../../../../helpers/request.axios";
import { dataStore } from "../../../../store/DataStore";
import { IRecordsService } from "../../../../interfaces/records";

const ServiceCapture = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState<IRecordsService>();
  const [isloaded, setIsLoaded] = useState<boolean>(false);

  const { setOnServiceCapture } = dataStore();

  useEffect(() => {
    setOnServiceCapture(true);
    requestController<IRecordsService>({ endpoint: `records/service/${serviceId}`, method: "GET" }).then((rs) => {
      setService(rs);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {isloaded ? (
        <>
          <div className="border m-3 shadow-sm rounded-lg p-6 text-sm">
            <p className="mb-3">
              <b>Direccion:</b> <br />
              <span className="italic">{`${service?.street} #${service?.number} ${service?.neighborhood}, ${service?.city}, ${service?.state}`}</span>
            </p>
            <p className="mb-3">
              <b>Cliente:</b> <br />
              <span className="italic">{`${service?.customerId.name} ${service?.customerId.middleName} ${service?.customerId.lastName}`}</span>
            </p>
            <p className="">
              <b>Medidor:</b> <br />
              <span className="italic">{service?.meterNumber !== "" ? service?.meterNumber : "N/A"}</span>
            </p>
          </div>
          {/* <div className="border m-3 shadow-md rounded-lg p-6">
            <b className="text-xl">Lecturas:</b>
          </div> */}

          <div className="border m-3 shadow-sm rounded-lg text-sm">
            <ul>
              <li className="flex justify-between px-6 py-2 border-b last:border-b-0 font-bold">Ultimas lecturas</li>
              {service?.records.length !== 0 ? (
                service?.records.map((r) => (
                  <li key={r._id} className="flex justify-between px-6 py-2 border-b last:border-b-0">
                    <div>{r.currentRecord}</div>
                    <div>{r.periodId.name}</div>
                  </li>
                ))
              ) : (
                <li className="px-6 py-2 border-b last:border-b-0 font-bold text-center">Sin registros</li>
              )}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ServiceCapture;
