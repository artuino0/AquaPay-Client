import axios from "axios";
import { useForm } from "react-hook-form";
import { BASE_PATH } from "../../../../../../global.variables";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface IProps {
  setUpdater: (newValue: number) => void;
  setShowModal: (newValue: boolean) => void;
  updater: number;
}

const ChargeForm = (props: IProps) => {
  const { setShowModal, setUpdater, updater } = props;
  const Authorization = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post(`${BASE_PATH}/charges`, { ...data }, { headers: { Authorization } })
      .then(() => {
        setUpdater(updater + 1);
        setShowModal(false);
      })
      .catch((e: AxiosError) => {
        if (e.response) {
          if (e.response.status === 401) {
            alert("Tu sesion a caducado, vuelve a iniciar sesion!");
            navigate("/login");
          }
        } else {
          alert("Servidor no disponible");
        }
      });
  };
  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className=" border-b px-6 py-3 text-deep-blue">Creando nuevo cargo</div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          <div className="flex gap-2 w-full">
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Descripcion del cargo" type="text" id="name" {...register("name", { required: true })} />
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Monto en MXN" type="number" id="amount" {...register("amount", { required: true })} />
          </div>
        </div>
        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button type="reset" className="bg-red-300 text-red-600 px-6 py-2">
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
