import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateTariff } from "@/hooks/useTariff";

interface IProps {
  setShowModal: (newValue: boolean) => void;
  setUpdater: (newValue: number) => void;
  updater: number;
}

const TariffForm = (props: IProps) => {
  const { setShowModal, setUpdater, updater } = props;
  const [year, setYear] = useState<number>(0);
  const createTariffMutation = useCreateTariff();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    let d = new Date();
    setYear(d.getFullYear());
    setValue("year", d.getFullYear());
    setValue("maxConsuption", 50);
  }, []);

  const onSubmit = (data: any) => {
    createTariffMutation.mutate(data, {
      onSuccess: () => {
        setShowModal(false);
        setUpdater(updater + 1); // Add this line to trigger a refresh
      },
    });
  };

  return (
    <div className="modal-container ">
      <div className=" border-b px-6 py-3 text-deep-blue">
        Creando nuevo ciclo
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 py-6 px-6 items-start">
          <label htmlFor="year" className="text-sm">
            Ciclo:
          </label>
          <input
            id="year"
            type="number"
            placeholder="Año"
            className=" mb-3 border outline-deep-blue w-full box-border px-3 py-2 rounded-md"
            {...register("year", { required: true })}
          />
          {errors.year && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <label htmlFor="consuption" className="text-sm">
            Consumo Maximo (m3):
          </label>
          <input
            id="consuption"
            type="number"
            placeholder="Consumo máximo"
            className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md"
            {...register("maxConsuption", { required: true })}
          />
          {errors.maxConsuption && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
        </div>
        <div className="border-t py-3 px-6 flex text-sm justify-end gap-2">
          <button
            type="reset"
            className="bg-red-300 text-red-600 px-6 py-2"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="bg-deep-blue text-white px-6 py-2 rounded-md cursor-pointer"
            disabled={createTariffMutation.isPending}
          >
            {createTariffMutation.isPending ? "Creando..." : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TariffForm;
