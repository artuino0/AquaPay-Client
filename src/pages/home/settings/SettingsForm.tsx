import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICompany } from "@/interfaces/company";
import {
  useGetCompanySettings,
  useUpdateCompanySettings,
} from "@/hooks/useCompany";
import { PUBLIC_PATH } from "@/global.variables";
import SpinnerLoading from "@/components/SpinnerLoading";
import PageHeader from "@/components/PageHeader";
import DaysLikeCalendar from "@/components/DaysLikeCalendar";
import { InputField } from "@/components/InputField";

interface ICompanyForm extends Omit<ICompany, "imagen"> {
  logo?: FileList;
}

const SettingsForm = () => {
  const { data: company, isLoading } = useGetCompanySettings();
  const updateCompanyMutation = useUpdateCompanySettings();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICompanyForm>();

  const [captureDays, setCaptureDays] = useState<number[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (company) {
      Object.keys(company).forEach((key) => {
        if (key !== "imagen") {
          setValue(key as keyof ICompanyForm, company[key as keyof ICompany]);
        }
      });
      setCaptureDays(company.captureDays);
      setPreviewImage(`${PUBLIC_PATH}/${company.imagen}`);
    }
  }, [company, setValue]);

  const onSubmit = (data: ICompanyForm) => {
    const formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("address", data.address);
    formData.append("downtown", data.downtown);
    formData.append("postalCode", data.postalCode);
    formData.append("city_state", data.city_state);
    formData.append("phone", data.phone);
    formData.append("cellphone", data.cellphone);
    formData.append("captureDays", JSON.stringify(captureDays));

    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    updateCompanyMutation.mutate(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <SpinnerLoading />
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 mt-6">
            <div className="border relative w-[350px] rounded-md flex justify-center items-center">
              <label
                htmlFor="imagen"
                className="cursor-pointer hover:text-deep-blue absolute -bottom-3 -right-3 text-gray-400 bg-white w-10 h-10 flex items-center justify-center shadow-md rounded-full border"
              >
                <i className="bi bi-pencil"></i>
              </label>
              <div className="px-6 py-6 absolute">
                {previewImage && (
                  <img
                    className="w-full"
                    src={previewImage}
                    alt="Vista previa"
                  />
                )}
              </div>
              <input
                className="opacity-0"
                type="file"
                id="imagen"
                {...register("logo")}
                onChange={handleImageChange}
              />
            </div>

            <div className="w-[1px] bg-gray-100"></div>

            <div className="w-[400px] flex flex-col gap-2">
              <InputField
                label="Nombre de la empresa"
                type="text"
                name="companyName"
                register={register}
                errors={errors}
                required
              />
              <InputField
                label="Dirección"
                type="text"
                name="address"
                register={register}
                errors={errors}
                required
              />
              <div className="flex gap-2 w-full">
                <InputField
                  label="Colonia"
                  type="text"
                  name="downtown"
                  register={register}
                  errors={errors}
                  required
                />
                <InputField
                  label="Código Postal"
                  type="text"
                  name="postalCode"
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <InputField
                label="Ciudad, Estado"
                type="text"
                name="city_state"
                register={register}
                errors={errors}
                required
              />
              <div className="flex gap-2 w-full">
                <InputField
                  label="Teléfono"
                  type="tel"
                  name="phone"
                  register={register}
                  errors={errors}
                  required
                />
                <InputField
                  label="Celular"
                  type="tel"
                  name="cellphone"
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              <input
                className="mt-2 px-6 py-2 bg-deep-blue rounded-md cursor-pointer text-white"
                type="submit"
                value="Guardar"
                disabled={updateCompanyMutation.isPending}
              />
            </div>
          </form>

          <hr className="mt-10" />
          <PageHeader title="Ajustes de fechas" />
          <DaysLikeCalendar
            title="Días de captura"
            selectedDays={captureDays}
            setSelectedDays={setCaptureDays}
          />
        </div>
      )}
    </>
  );
};

export default SettingsForm;
