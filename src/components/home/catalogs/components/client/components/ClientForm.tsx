import { useForm } from "react-hook-form";
import { ICustomer } from "../../../../../../types/customer.interface";
import { useEffect, useState } from "react";
import requestController from "../../../../../../helpers/request.axios";

interface IProps {
  setUpdater: (newValue: number) => void;
  setShowModal: (newValue: boolean) => void;
  updater: number;
  selectedCustomer: ICustomer | null;
  setSelectedCustomer: (newValue: null) => void;
}

const ClientForm = (props: IProps) => {
  const { setShowModal, setUpdater, updater, selectedCustomer, setSelectedCustomer } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isCustomerSelected, setIsCustomerSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCustomer) {
      setIsCustomerSelected(true);
      setValue("externalContractId", selectedCustomer.externalContractId);
      setValue("name", selectedCustomer.name);
      setValue("lastName", selectedCustomer.lastName);
      setValue("middleName", selectedCustomer.middleName);
      setValue("email", selectedCustomer.email);
      setValue("phoneNumber", selectedCustomer.phoneNumber);
      setValue("lastRecord", selectedCustomer.lastRecord);
      setValue("lastBalance", selectedCustomer.lastBalance);
    }
  }, []);

  const onSubmit = (data: any) => {
    if (isCustomerSelected) {
      updateRecord(data);
    } else {
      newRecord(data);
    }
  };

  const newRecord = (data: any) => {
    requestController({ endpoint: "customers", method: "POST", body: data }).then(() => {
      alert("Cliente creado correctamente");
      setUpdater(updater + 1);
      setShowModal(false);
    });
  };

  const updateRecord = (data: any) => {
    requestController({ endpoint: `customers/${selectedCustomer!.id}`, method: "PUT", body: data }).then(() => {
      alert("Cliente actualizado correctamente");
      setUpdater(updater + 1);
      setShowModal(false);
    });
  };

  const handleClose = () => {
    setShowModal(false);
    if (!selectedCustomer) return;
    setSelectedCustomer(null);
  };
  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className=" border-b px-6 py-3 text-deep-blue">{isCustomerSelected ? "Modificando cliente" : "Creando nuevo cliente"}</div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          <div>
            <input
              className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md "
              placeholder="Numero de contrato"
              type="number"
              id="externalContractId"
              {...register("externalContractId", { required: true })}
              disabled={isCustomerSelected}
            />
          </div>
          <div>
            <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md " placeholder="Nombre(s) del cliente" type="text" id="name" {...register("name", { required: true })} />
          </div>
          <div className="flex gap-2 w-full">
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Apellido paterno" type="text" id="lastName" {...register("lastName", { required: true })} />
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Apellido materno" type="text" id="middleName" {...register("middleName")} />
          </div>
          <div>
            <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md " placeholder="Correo electronico" type="email" id="email" {...register("email")} />
          </div>
          <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md " placeholder="Telefono" type="tel" id="phone" {...register("phoneNumber")} />
          <hr />
          <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md " placeholder="Ultima lectura" type="number" id="phone" {...register("lastRecord")} />
          <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md " placeholder="Saldo" type="number" id="phone" {...register("lastBalance")} />
        </div>
        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button type="reset" className="bg-red-300 text-red-600 px-6 py-2" onClick={handleClose}>
            Cancelar
          </button>
          <button type="submit" className="bg-deep-blue text-white px-6 py-2">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
