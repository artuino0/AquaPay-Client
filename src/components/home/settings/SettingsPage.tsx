import { useState } from "react";
import { useForm } from "react-hook-form";
import SettingsForm from "./SettingsForm";

interface ICompany {
  companyName: string;
  address: string;
  downtown: string;
  postalCode: string;
  city_state: string;
  phone: string;
  cellphone: string;
  imagen: FileList;
}

const SettingsPage = () => {
  return (
    <div className="bg-white border rounded-md overflow-hidden p-10 text-sm">
      {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start">
        <h3>Logo:</h3>
        {previewImage && (
          <div className="rounded-md overflow-hidden w-fit border p-1 mb-3">
            <img src={previewImage} className="w-36 rounded-md" alt="Vista previa" />
          </div>
        )}
        <input className="border outline-deep-blue mb-4 px-2 py-1 rounded-md" type="file" id="logo" {...register("imagen")} onChange={handleImageChange} />

        <div className="flex flex-col w-[500px]">
          <label htmlFor="companyName">Nombre de la empresa:</label>
          <input className="border outline-deep-blue mb-4 px-2 py-1 rounded-md" type="text" id="companyName" {...register("companyName", { required: true })} />
        </div>

        <div className="flex gap-3 w-[500px]">
          <div className="flex flex-grow flex-col">
            <label htmlFor="address">Dirección:</label>
            <input className="border outline-deep-blue mb-4 px-2 py-1 rounded-md" type="text" id="address" {...register("address", { required: true })} />
          </div>

          <div className="flex flex-grow flex-col">
            <label htmlFor="downtown">Colonia:</label>
            <input className="border outline-deep-blue mb-4 px-2 py-1 rounded-md" type="text" id="downtown" {...register("downtown", { required: true })} />
          </div>
        </div>

        <div className="flex gap-3 w-[500px]">
          <div className="flex flex-grow flex-col">
            <label htmlFor="postalCode">Codigo Postal:</label>
            <input className="border outline-deep-blue mb-4 px-2 py-1 rounded-md" type="text" id="postalCode" {...register("postalCode", { required: true })} />
          </div>

          <div className="flex flex-grow flex-col">
            <label htmlFor="city_state">Ciudad, Estado:</label>
            <input className="border outline-deep-blue mb-4 px-2 py-1 rounded-md" type="text" id="city_state" {...register("city_state", { required: true })} />
          </div>
        </div>

        <div className="flex flex-col w-[500px]">
          <label htmlFor="phone">Número de teléfono:</label>
          <input className="border outline-deep-blue mb-4 px-2 py-1 rounded-md" type="tel" id="telefono" {...register("phone", { required: true })} />
        </div>

        <div className="flex flex-col w-[500px]">
          <label htmlFor="cellphone">Número de celular:</label>
          <input className="border outline-deep-blue mb-4 px-2 py-1 rounded-md" type="tel" id="cellphone" {...register("cellphone", { required: true })} />
        </div>

        <input type="submit" value="Guardar" className="bg-deep-blue opacity-90 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-deep-blue hover:opacity-100" />
      </form> */}

      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
