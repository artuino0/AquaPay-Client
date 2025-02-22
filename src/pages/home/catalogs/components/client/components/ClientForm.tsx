import { useForm } from "react-hook-form";
import { ICustomer, ICustomerCreate } from "@/types/customer.interface";
import { useEffect } from "react";
import { useCreateCustomer, useUpdateCustomer } from "@/hooks/useCustomer";

interface IProps {
  setShowModal: (newValue: boolean) => void;
  setSelectedCustomer: (newValue: null) => void;
  selectedCustomer: ICustomer | null;
}

const ClientForm = ({
  setShowModal,
  selectedCustomer,
  setSelectedCustomer,
}: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICustomerCreate>();

  useEffect(() => {
    if (selectedCustomer) {
      Object.keys(selectedCustomer).forEach((key) => {
        setValue(
          key as keyof ICustomerCreate,
          selectedCustomer[key as keyof ICustomerCreate]
        );
      });
    }
  }, [selectedCustomer, setValue]);

  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();

  const onSubmit = (data: ICustomerCreate) => {
    if (selectedCustomer) {
      updateCustomerMutation.mutate(
        {
          customerId: selectedCustomer.id,
          customerData: data,
        },
        {
          onSuccess: () => {
            setShowModal(false);
          },
        }
      );
    } else {
      createCustomerMutation.mutate(data, {
        onSuccess: () => {
          setShowModal(false);
        },
      });
    }
  };

  const handleClose = () => {
    setShowModal(false);
    if (selectedCustomer) setSelectedCustomer(null);
  };

  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className="border-b px-6 py-3 text-deep-blue">
        {selectedCustomer ? "Modificando cliente" : "Creando nuevo cliente"}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          <InputField
            label="Número de contrato"
            type="number"
            name="externalContractId"
            register={register}
            errors={errors}
            required
            disabled={!!selectedCustomer}
          />
          <InputField
            label="Nombre(s) del cliente"
            type="text"
            name="name"
            register={register}
            errors={errors}
            required
          />
          <div className="flex gap-2 w-full">
            <InputField
              label="Apellido paterno"
              type="text"
              name="lastName"
              register={register}
              errors={errors}
              required
            />
            <InputField
              label="Apellido materno"
              type="text"
              name="middleName"
              register={register}
              errors={errors}
            />
          </div>
          <InputField
            label="Correo electrónico"
            type="email"
            name="email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Teléfono"
            type="tel"
            name="phoneNumber"
            register={register}
            errors={errors}
          />
        </div>
        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button
            type="reset"
            className="bg-red-300 text-red-600 px-6 py-2"
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-deep-blue text-white px-6 py-2"
            disabled={
              createCustomerMutation.isPending ||
              updateCustomerMutation.isPending
            }
          >
            {createCustomerMutation.isPending ||
            updateCustomerMutation.isPending
              ? "Guardando..."
              : selectedCustomer
              ? "Guardar"
              : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  type,
  name,
  register,
  errors,
  required = false,
  disabled = false,
}: any) => (
  <div>
    <input
      className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md"
      placeholder={label}
      type={type}
      {...register(name, { required })}
      disabled={disabled}
    />
    {errors[name] && (
      <span className="text-red-500">
        {errors[name]?.message || `${label} es obligatorio`}
      </span>
    )}
  </div>
);

export default ClientForm;
