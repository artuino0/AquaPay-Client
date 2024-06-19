import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import requestController from "../../../helpers/request.axios";
import { ICompany } from "../../../interfaces/company";
import { PUBLIC_PATH } from "../../../global.variables";
import SpinnerLoading from "../../shared/SpinnerLoading";
import PageHeader from "../../shared/PageHeader";
import DaysLikeCalendar from "../../shared/DaysLikeCalendar";

interface FormValues {
  companyName: string;
  address: string;
  downtown: string;
  postalCode: string;
  city_state: string;
  phone: string;
  cellphone: string;
  logo: FileList;
}

const SettingsForm = () => {
  const [company, setCompany] = useState<ICompany>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [captureDays, setCaptureDays] = useState<number[]>([]);

  useEffect(() => {
    requestController<ICompany>({ endpoint: "settings", method: "GET" })
      .then((rs) => {
        setCompany(rs);
        setValue("companyName", rs.companyName);
        setValue("address", rs.address);
        setValue("downtown", rs.downtown);
        setValue("postalCode", rs.postalCode);
        setValue("city_state", rs.city_state);
        setValue("phone", rs.phone);
        setValue("cellphone", rs.cellphone);
        setCaptureDays(rs.captureDays);
        setPreviewImage(`${PUBLIC_PATH}/${rs.imagen}`);
        setIsLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();
  const [previewImage, setPreviewImage] = useState<any>(null);

  const onSubmit = (data: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append("address", data.address);
      formData.append("downtown", data.downtown);
      formData.append("postalCode", data.postalCode);
      formData.append("city_state", data.city_state);
      formData.append("phone", data.phone);
      formData.append("cellphone", data.cellphone);
      formData.append("logo", data.logo[0]);
      formData.append("captureDays", JSON.stringify(captureDays));

      requestController({
        endpoint: "settings",
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          alert("Datos de empresa actualizados");
          location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      // Manejo de errores
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <>
      {isLoaded ? (
        <div>
          <PageHeader title="Ajustes de generales" />
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
                  <div className="">
                    <img
                      className="w-full"
                      src={previewImage}
                      alt="Vista previa"
                    />
                  </div>
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
            <div className="w-[1px] bg-gray-100 "></div>
            <div className="w-[400px] flex flex-col gap-2">
              <div className="flex flex-col">
                <label className="text-sm text-gray-400" htmlFor="companyName">
                  Nombre de la empresa:
                </label>
                <input
                  className="border px-2 py-1 rounded-md"
                  type="text"
                  id="companyName"
                  {...register("companyName", { required: true })}
                />
                {errors.companyName && (
                  <span className="text-xs">Este campo es requerido</span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-400" htmlFor="address">
                  Dirección:
                </label>
                <input
                  className="border px-2 py-1 rounded-md"
                  type="text"
                  id="address"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-xs">Este campo es requerido</span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400" htmlFor="downtown">
                    Colonia:
                  </label>
                  <input
                    className="border px-2 py-1 rounded-md"
                    type="text"
                    id="downtown"
                    {...register("downtown", { required: true })}
                  />
                  {errors.downtown && (
                    <span className="text-xs">Este campo es requerido</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-400" htmlFor="postalCode">
                    Código Postal:
                  </label>
                  <input
                    className="border px-2 py-1 rounded-md"
                    type="text"
                    id="postalCode"
                    {...register("postalCode", { required: true })}
                  />
                  {errors.postalCode && (
                    <span className="text-xs">Este campo es requerido</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-400" htmlFor="city_state">
                  Ciudad, Estado:
                </label>
                <input
                  className="border px-2 py-1 rounded-md"
                  type="text"
                  id="city_state"
                  {...register("city_state", { required: true })}
                />
                {errors.city_state && (
                  <span className="text-xs">Este campo es requerido</span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-400" htmlFor="phone">
                    Número de teléfono:
                  </label>
                  <input
                    className="border px-2 py-1 rounded-md"
                    type="tel"
                    id="phone"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <span className="text-xs">Este campo es requerido</span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-gray-400" htmlFor="cellphone">
                    Número de celular:
                  </label>
                  <input
                    className="border px-2 py-1 rounded-md"
                    type="tel"
                    id="cellphone"
                    {...register("cellphone", { required: true })}
                  />
                  {errors.cellphone && (
                    <span className="text-xs">Este campo es requerido</span>
                  )}
                </div>
              </div>
              <input
                className="mt-2 px-6 py-2 bg-deep-blue rounded-md cursor-pointer text-white"
                type="submit"
                value="Guardar"
              />
            </div>
          </form>
          <hr className="mt-10" />
          <PageHeader title="Ajustes de fechas" />
          <DaysLikeCalendar
            title="Dias de captura"
            selectedDays={captureDays}
            setSelectedDays={setCaptureDays}
          />
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <SpinnerLoading />
        </div>
      )}
    </>
  );
};

export default SettingsForm;
