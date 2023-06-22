import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import loginImage from "../../assets/loginimage.png";
import logo from "../../assets/logo.svg";
import { BASE_PATH } from "../../global.variables";
import { useState } from "react";
import SpinnerLoading from "../shared/SpinnerLoading";
import { ILogin, ILoginError } from "../../types/login.interface";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const login = (data: FormData) => {
    setIsLoading(true);
    axios
      .post<ILogin>(`${BASE_PATH}/auth/login`, { ...data }, { headers: { Authorization: "" } })
      .then(({ data }) => {
        setTimeout(() => {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("name", data.user.name);
          window.localStorage.setItem("email", data.user.email);
          if (window.innerWidth < 700) {
            return (window.location.href = "/mobile");
          }
          window.location.href = `/`;
        }, 1500);
      })
      .catch((e: AxiosError<ILoginError>) => {
        setIsLoading(false);
        if (e.response) {
          alert(e.response.data.error);
        } else {
          alert("Servidor no disponible");
        }
      });
  };

  return (
    <section className="flex h-screen">
      <div className="hidden w-5/12 bg-light-gray desktop:flex items-center justify-center flex-col relative">
        <div className="select-none absolute flex gap-3 top-5 left-5 animate__animated animate__fadeInLeft">
          <img style={{ width: "70px" }} src={logo} alt="" />
          <p className="text-dark-blue font-bold italic text-2xl">AquaPay</p>
        </div>
        <img className="animate__animated animate__fadeInLeft" onDragStart={(event) => event.preventDefault()} src={loginImage} style={{ width: "400px", height: "365px" }} alt="" />
      </div>
      <div className="flex flex-grow justify-center items-center relative">
        {isLoading ? (
          <SpinnerLoading />
        ) : (
          <form onSubmit={handleSubmit(login)} className="flex flex-col animate__animated animate__fadeInUp" style={{ width: "350px" }}>
            <h1 className="select-none text-2xl font-semibold mb-4">Bienvenido!</h1>
            <p className="select-none text-sm text-gray-500 mb-9">Maneja de manera eficiente tus servicios.</p>
            {errors.email && <span className="text-red-400 text-xs mb-1">This field is required</span>}
            <input {...register("email", { required: true })} className="bg-light-gray text-xs px-3 py-3 rounded-md mb-4 outline-deep-blue" type="text" placeholder="johndoe@mail.com" />
            {errors.password && <span className="text-red-400 text-xs mb-1">This field is required</span>}
            <input {...register("password", { required: true })} className="bg-light-gray text-xs px-3 py-3 rounded-md mb-1 outline-deep-blue" type="password" placeholder="Ingresa tu contraseña" />

            <small className="select-none mb-4 text-deep-blue font-medium text-right cursor-pointer hover:text-blue-700 transition-colors duration-300">Olvidaste tu contraseña?</small>
            <input className="select-none text-white text-xs px-3 py-3 bg-deep-blue rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300" type="submit" value={"Iniciar sesion"} />

            <span className="select-none text-center my-8 relative flex justify-center">
              <p className="text-gray-300 bg-white w-fit px-6">o</p>
              <div className="absolute top-1/2 left-0 w-full bg-gray-200 -z-10" style={{ height: "1px" }}></div>
            </span>
            <button className="select-none text-gray-500 text-xs px-3 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300">Solicite acceso</button>
          </form>
        )}
        <p className="select-none absolute text-xs text-gray-300 bottom-10">Desarrollado por: Arturo Muñoz - 2023</p>
      </div>
    </section>
  );
};
export default LoginPage;
