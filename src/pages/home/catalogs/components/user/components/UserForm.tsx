import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { IUser, IUserCreate } from "@/types/user.interface";
import { useCreateUser, useUpdateUser } from "@/hooks/useUsers";
import { InputField } from "@/components/InputField";

interface IProps {
  setShowModal: (newValue: boolean) => void;
  setUserSelected: (newValue: null) => void;
  userSelected: IUser | null;
}

const UserForm = ({ setShowModal, userSelected, setUserSelected }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IUserCreate>();

  const password = watch("password");
  const repassword = watch("repassword");

  useEffect(() => {
    if (userSelected) {
      setValue("name", userSelected.name);
      setValue("email", userSelected.email);
      setValue("phone", userSelected.phone);
    }
  }, [userSelected, setValue]);

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const onSubmit = (data: IUserCreate) => {
    if (data.password && data.password !== data.repassword) {
      return alert("Las contraseñas no coinciden, valide la información!");
    }

    if (userSelected) {
      updateUserMutation.mutate(
        { userId: userSelected.id, userData: data },
        {
          onSuccess: () => {
            setShowModal(false);
          },
        }
      );
    } else {
      createUserMutation.mutate(data, {
        onSuccess: () => {
          setShowModal(false);
        },
      });
    }
  };

  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className="border-b px-6 py-3 text-deep-blue">
        {userSelected ? "Modificando usuario" : "Creando nuevo usuario"}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          <InputField
            label="Nombre"
            type="text"
            name="name"
            register={register}
            errors={errors}
            required
          />
          <InputField
            label="Correo electrónico"
            type="email"
            name="email"
            register={register}
            errors={errors}
            required
          />

          <div className="grid grid-cols-2 gap-2 w-full">
            <InputField
              label="Contraseña"
              type="password"
              name="password"
              register={register}
            />
            <InputField
              label="Repetir contraseña"
              type="password"
              name="repassword"
              register={register}
              validate={(value: any) =>
                !password ||
                value === password ||
                "Las contraseñas deben coincidir"
              }
              errors={errors}
            />
          </div>

          <InputField
            label="Teléfono"
            type="tel"
            name="phone"
            register={register}
          />
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
          <button
            type="submit"
            className="bg-deep-blue text-white px-6 py-2"
            disabled={
              createUserMutation.isPending || updateUserMutation.isPending
            }
          >
            {createUserMutation.isPending || updateUserMutation.isPending
              ? "Guardando..."
              : userSelected
              ? "Guardar"
              : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
