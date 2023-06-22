import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { IUser } from "../../../../../../types/user.interface";
import requestController from "../../../../../../helpers/request.axios";

interface IProps {
  setUpdater: (newValue: number) => void;
  setShowModal: (newValue: boolean) => void;
  setUserSelected: (newValue: null) => void;
  updater: number;
  userSelected: IUser | null;
}

const UserForm = (props: IProps) => {
  const { setUpdater, updater, setShowModal, userSelected, setUserSelected } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (userSelected) {
      setValue("name", userSelected.name);
      setValue("email", userSelected.email);
      setValue("phone", userSelected.phone);
    }
  }, []);

  const onSubmit = (data: any) => {
    if (data.password !== data.repassword) return alert("Las contraseñas no coninciden, valide la informacion!");

    requestController({ endpoint: "users", method: "POST", body: data }).then((data) => {
      alert("El usuario ha sido creado");
      setUpdater(updater + 1);
      setShowModal(false);
    });
  };
  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className=" border-b px-6 py-3 text-deep-blue">{userSelected ? "Modificando usuario" : "Creando nuevo usuario"}</div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          <div>
            <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md" placeholder="Nombre" type="text" id="name" {...register("name", { required: true })} />
          </div>
          <div>
            <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md" placeholder="Correo electronico" type="email" id="email" {...register("email", { required: true })} />
          </div>

          <div className="flex gap-2 w-full">
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Contraseña" type="password" id="password" {...register("password", { required: true })} />
            <input className="border grow outline-deep-blue box-border px-3 py-2 rounded-md " placeholder="Repetir contraseña" type="password" id="password" {...register("repassword", { required: true })} />
          </div>
          <input className="border outline-deep-blue w-full box-border px-3 py-2 rounded-md" placeholder="Telefono" type="tel" id="phone" {...register("phone")} />
        </div>
        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button
            type="reset"
            className="bg-red-300 text-red-600 px-6 py-2"
            onClick={() => {
              setShowModal(false);
              setUserSelected(null);
            }}
          >
            Cancelar
          </button>
          <button type="submit" className="bg-deep-blue text-white px-6 py-2">
            {userSelected ? "Guardar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
