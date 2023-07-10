import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";
import { convertirANumero } from "../../../../../../helpers/formater";
import requestController from "../../../../../../helpers/request.axios";

interface IProps {
  setUpdater: (newValue: number) => void;
  setShowModal: (newValue: boolean) => void;
  updater: number;
  customerId: string;
}

interface IServiceForm {
  meterNumber: string;
  serviceType: string;
  street: string;
  number: string;
  lastRead: string;
  previousDebt: string;
}

const ServiceForm = (props: IProps) => {
  const { setUpdater, updater, customerId, setShowModal } = props;
  const [hasMeter, setHasMeter] = useState<boolean>(true);
  const [initialize, setInitialize] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IServiceForm>();

  const onSubmit = (data: IServiceForm) => {
    let form: any;

    if (data.meterNumber === "" && hasMeter) {
      if (!confirm("Va a inicializar el servicio sin medidor, desea continuar?")) {
        return;
      }
    }

    if (!initialize) {
      const { previousDebt, lastRead, ...resto } = data;
      form = resto;
    } else {
      form = data;
    }

    console.log(form);

    requestController({ endpoint: "services", method: "POST", body: { ...form, customerId } }).then(() => {
      alert("Servicio creado correctamente");
      setUpdater(updater + 1);
      /* setShowModal(false); */
    });
  };
  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className=" border-b px-6 py-3 text-deep-blue">Creando nuevo servicio</div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <input
              id="hasMeter"
              type="checkbox"
              name=""
              checked={hasMeter}
              onChange={() => {
                if (!hasMeter) {
                  setHasMeter(!hasMeter);
                  setValue("meterNumber", "");
                } else {
                  setValue("meterNumber", "");
                  setHasMeter(!hasMeter);
                }
              }}
            />
            <label htmlFor="hasMeter">El servicio tiene medidor?</label>
          </div>
          <div>
            <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md " placeholder="Numero de medidor" type="text" id="meterNumber" {...register("meterNumber")} disabled={!hasMeter} />
          </div>
          <div>
            <select className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md " id="serviceType" {...register("serviceType", { required: true })}>
              <option value="domestic">Domestica</option>
              <option value="commercial">Comercial</option>
              <option value="mixed">Mixta</option>
            </select>
          </div>
          <div className="flex gap-2 w-full">
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Calle" type="text" id="street" {...register("street")} />
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Numero" type="text" id="number" {...register("number")} />
          </div>
          <div>
            <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md " placeholder="Colonia" type="text" id="neighborhood" /* {...register("neighborhood")} */ value={"Villa de las flores"} disabled={true} />
          </div>
          <div className="flex gap-2 w-full">
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Ciudad" type="text" id="city" /* {...register("city")} */ value={"Silao"} disabled={true} />
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Estado" type="text" id="state" /* {...register("state")} */ value={"Guanajuato"} disabled={true} />
          </div>
          <div className="flex items-center gap-3 mt-3 text-gray-400 text-xs">
            <input
              id="initialize"
              type="checkbox"
              name=""
              checked={initialize}
              onChange={() => {
                setInitialize(!initialize);
                setValue("lastRead", "0");
                setValue("previousDebt", "0");
              }}
            />
            <label htmlFor="initialize">Inicializar con {hasMeter ? "lectura y" : ""} adeudo</label>
          </div>
          <div className="flex gap-2 w-full">
            {hasMeter ? <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Ultima lectura" type="text" id="lastRead" {...register("lastRead")} disabled={!initialize} /> : null}
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Adeudo anterior" type="text" id="previousDebt" {...register("previousDebt")} disabled={!initialize} />
          </div>
        </div>
        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button type="reset" className="bg-red-300 text-red-600 px-6 py-2" onClick={() => setShowModal(false)}>
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

export default ServiceForm;
