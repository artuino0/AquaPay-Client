import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { IServiceCreate, IService } from "@/types/service.interface";
import { useCreateService, useUpdateService } from "@/hooks/useService";

interface IProps {
  setShowModal: (newValue: boolean) => void;
  customerId: string;
  serviceData?: IService | null; // Si existe, es edición
}

const ServiceForm: React.FC<IProps> = ({ setShowModal, customerId, serviceData }) => {
  const [hasMeter, setHasMeter] = useState<boolean>(!!serviceData?.meterNumber);
  const [initialize, setInitialize] = useState<boolean>(!!serviceData?.lastRead);

  const createServiceMutation = useCreateService();
  const updateServiceMutation = useUpdateService();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IServiceCreate>();

  // 🔹 Precargar datos si se edita un servicio
  useEffect(() => {
    if (serviceData) {
      setValue("meterNumber", serviceData.meterNumber || "");
      setValue("serviceType", serviceData.serviceType);
      setValue("street", serviceData.street);
      setValue("number", serviceData.number);
      setValue("lastRead", serviceData.lastRead || null);
      setValue("previousDebt", serviceData.previousDebt || null);
    }
  }, [serviceData, setValue]);

  const onSubmit = (data: IServiceCreate) => {
    let form: IServiceCreate = {
      ...data,
      customerId, // Asegurar que es string
      lastRead: data.lastRead ? Number(data.lastRead) : null, // Convertir a número
      previousDebt: data.previousDebt ? Number(data.previousDebt) : null, // Convertir a número
    };

    if (!hasMeter) {
      form.meterNumber = "";
    }

    if (!initialize) {
      form.previousDebt = null;
      form.lastRead = null;
    }

    if (serviceData) {
      // 🔥 Editar servicio
      updateServiceMutation.mutate(
        { serviceId: serviceData._id, serviceData: form },
        {
          onSuccess: () => {
            alert("Servicio actualizado correctamente");
            setShowModal(false);
          },
        }
      );
    } else {
      // 🔥 Crear servicio
      createServiceMutation.mutate(form, {
        onSuccess: () => {
          alert("Servicio creado correctamente");
          setShowModal(false);
        },
      });
    }
  };

  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className="border-b px-6 py-3 text-deep-blue">
        {serviceData ? "Editando servicio" : "Creando nuevo servicio"}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          {/* Checkbox Medidor */}
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <input
              id="hasMeter"
              type="checkbox"
              checked={hasMeter}
              onChange={() => {
                setHasMeter(!hasMeter);
                setValue("meterNumber", hasMeter ? "" : serviceData?.meterNumber || "");
              }}
            />
            <label htmlFor="hasMeter">El servicio tiene medidor?</label>
          </div>

          {/* Número de Medidor */}
          <input
            className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md"
            placeholder="Número de medidor"
            type="text"
            {...register("meterNumber")}
            disabled={!hasMeter}
          />

          {/* Tipo de Servicio */}
          <select className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md" {...register("serviceType", { required: true })}>
            <option value="domestic">Doméstica</option>
            <option value="commercial">Comercial</option>
            <option value="mixed">Mixta</option>
          </select>

          {/* Dirección */}
          <div className="flex gap-2 w-full">
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md" placeholder="Calle" type="text" {...register("street")} />
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md" placeholder="Número" type="text" {...register("number")} />
          </div>

          {/* Ubicación (Deshabilitada) */}
          <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md" value="Villa de las flores" disabled />
          <div className="flex gap-2 w-full">
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md" value="Silao" disabled />
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md" value="Guanajuato" disabled />
          </div>

          {/* Checkbox Inicializar */}
          <div className="flex items-center gap-3 mt-3 text-gray-400 text-xs">
            <input
              id="initialize"
              type="checkbox"
              checked={initialize}
              onChange={() => {
                setInitialize(!initialize);
                setValue("lastRead", initialize ? null : 0);
                setValue("previousDebt", initialize ? null : 0);
              }}
            />
            <label htmlFor="initialize">Inicializar con {hasMeter ? "lectura y" : ""} adeudo</label>
          </div>

          {/* Última lectura y adeudo */}
          <div className="flex gap-2 w-full">
            {hasMeter && <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md" placeholder="Última lectura" type="text" {...register("lastRead")} disabled={!initialize} />}
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md" placeholder="Adeudo anterior" type="text" {...register("previousDebt")} disabled={!initialize} />
          </div>
        </div>

        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button type="reset" className="bg-red-300 text-red-600 px-6 py-2" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
          <button type="submit" className="bg-deep-blue text-white px-6 py-2">
            {serviceData ? "Guardar cambios" : "Crear servicio"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
