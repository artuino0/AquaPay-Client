import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requestController from "../../../../helpers/request.axios";
import { dataStore } from "../../../../store/DataStore";
import { IRecordsService } from "../../../../interfaces/records";
import Loader from "../../../../components/Loader";
import { useGetService } from "@/hooks/useService";
import { IService } from "@/types/service.interface";

const ServiceCapture = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState<IRecordsService>();
  const [updater, setUpdater] = useState(0);
  const [isloaded, setIsLoaded] = useState(false);
  const [recordValue, setRecordValue] = useState<string | undefined>();

  const { setOnServiceCapture, periodBilling } = dataStore();

  const { data, isPending, error } = useGetService(serviceId!);

  useEffect(() => {
    setOnServiceCapture(true);
  }, [updater]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value)))
      return alert(`${e.target.value} no es permitido, solo numeros enteros!`);

    setRecordValue(e.target.value);
  };

  const handleSave = () => {
    console.log(recordValue);
    if (!recordValue || recordValue === "0")
      return alert("El valor de la lectura no puede ser 0");
    if (
      data?.records.some((record) => record.periodId.id === periodBilling?.id)
    )
      return alert(
        `Ya existe un registro en el periodo ${periodBilling?.name}`
      );
    if (
      data?.records.some((record) => record.currentRecord > Number(recordValue))
    )
      return alert(`El nuevo registro no puede ser menor a uno anterior`);

    console.log(recordValue);
    setIsLoaded(false);

    setTimeout(() => {
      setUpdater(updater + 1);
    }, 1500);
  };

  return (
    <div>
      {!isPending ? (
        <main className="animate__animated animate__fadeIn">
          <div className="border m-3 shadow-sm rounded-lg p-6 text-sm ">
            <p className="mb-3">
              <b>Direccion:</b> <br />
              <span className="italic">{`${data?.street} #${data?.number} ${data?.neighborhood}, ${data?.city}, ${data?.state}`}</span>
            </p>
            <p className="mb-3">
              <b>Cliente:</b> <br />
              <span className="italic">{`${data?.customerId.name} ${data?.customerId.middleName} ${data?.customerId.lastName}`}</span>
            </p>
            <p className="">
              <b>Medidor:</b> <br />
              <span className="italic">
                {data?.meterNumber !== "" ? data?.meterNumber : "N/A"}
              </span>
            </p>
          </div>

          <div className="border m-3 shadow-sm rounded-lg text-sm ">
            <h1 className="flex justify-between px-6 py-2 border-b last:border-b-0 font-bold text-deep-blue">
              <span>Captura de lectura</span>
              <button
                className="text-gray-500 font-normal"
                onClick={() => handleSave()}
              >
                Guardar
              </button>
            </h1>
            <input
              onChange={handleOnChange}
              value={recordValue}
              type="text"
              placeholder={"Ingrese nueva lectura"}
              className="px-6 py-2 outline-deep-blue w-full rounded-br-lg rounded-bl-lg"
            />
          </div>
          <div className="border m-3 shadow-sm rounded-lg text-sm overflow-hidden">
            <ul>
              <li className="flex justify-between px-6 py-2 border-b last:border-b-0 font-bold">
                Ultimas lecturas
              </li>
              {data?.records.length !== 0 ? (
                data?.records.map((r) => (
                  <li
                    key={r._id}
                    className={`${
                      r.periodId.id == periodBilling?.id
                        ? "bg-deep-blue text-white font-medium "
                        : null
                    } flex justify-between px-6 py-2 border-b last:border-b-0`}
                  >
                    <div>{r.currentRecord}</div>
                    <div>{r.periodId.name}</div>
                  </li>
                ))
              ) : (
                <li className="px-6 py-2 border-b last:border-b-0 font-bold text-center">
                  Sin registros
                </li>
              )}
            </ul>
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ServiceCapture;
