import { useForm } from "react-hook-form";
import { useCreateCharge, useUpdateCharge } from "@/hooks/useCharge";
import { ICharge } from "@/types/charge.interface";

interface IProps {
  setShowModal: (newValue: boolean) => void;
  selectedCharge: ICharge | null;
  setSelectedCharge: (charge: ICharge | null) => void;
}

const ChargeForm: React.FC<IProps> = ({ setShowModal, selectedCharge, setSelectedCharge }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: selectedCharge || {}
  });
  const { mutate: createCharge } = useCreateCharge();
  const { mutate: updateCharge } = useUpdateCharge();

  const onSubmit = (data: any) => {
    if (selectedCharge) {
      updateCharge(
        { id: selectedCharge.id, data },
        {
          onSuccess: () => {
            setShowModal(false);
            setSelectedCharge(null);
            reset();
          },
        }
      );
    } else {
      createCharge(data, {
        onSuccess: () => {
          setShowModal(false);
          reset();
        },
      });
    }
  };

  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className=" border-b px-6 py-3 text-deep-blue">
        {selectedCharge ? "Editando cargo" : "Creando nuevo cargo"}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          <div className="flex gap-2 w-full">
            <input
              className="border grow outline-deep-blue box-border px-3 py-2 rounded-md "
              placeholder="Descripcion del cargo"
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            <input
              className="border grow outline-deep-blue box-border px-3 py-2 rounded-md "
              placeholder="Monto en MXN"
              type="number"
              id="amount"
              {...register("amount", { required: true })}
            />
          </div>
        </div>
        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button
            type="reset"
            className="bg-red-300 text-red-600 px-6 py-2"
            onClick={() => setShowModal(false)}
          >
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

export default ChargeForm;
