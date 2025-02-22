import { useEffect, useState } from "react";
import requestController from "../../../../../../helpers/request.axios";
import { useForm } from "react-hook-form";

interface IProps {
  setShowModal: (newValue: boolean) => void;
  setUpdater: (newValue: number) => void;
  updater: number;
}

const TariffForm = (props: IProps) => {
  const { setShowModal, setUpdater, updater } = props;
  const [year, setYear] = useState<number>(0);
  const [maxConsuption, setMaxConsuption] = useState<number>(50);

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
    requestController({ endpoint: "tariffs", method: "POST", body: { ...data } }).then(() => {
      alert(`El ciclo ${year}, ha sido creado correctamente`);
      setUpdater(updater + 1);
      setShowModal(false);
    });
  };

  return (
    <div className="modal-container ">
      <div className=" border-b px-6 py-3 text-deep-blue">Creando nuevo ciclo</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 py-6 px-6 items-start">
          <label htmlFor="year" className="text-sm">
            Ciclo:
          </label>
          <input id="year" type="number" placeholder="Año" className=" mb-3 border outline-deep-blue w-full box-border px-3 py-2 rounded-md" {...register("year", { required: true })} />
          <label htmlFor="consuption" className="text-sm">
            Consumo Maximo (m3):
          </label>
          <input id="consuption" type="number" placeholder="Año" className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md" {...register("maxConsuption", { required: true })} />
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
          <button className="bg-deep-blue text-white px-6 py-2 rounded-md cursor-pointer">Crear</button>
        </div>
      </form>
    </div>
  );
};

export default TariffForm;
