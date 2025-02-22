import { login, LoginResponse } from "@/api/authApi";
import { useToastStore } from "@/stores/toastStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const addToast = useToastStore((state) => state.addToast);

  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("name", data.user.name);
      window.localStorage.setItem("email", data.user.email);

      addToast({
        type: "success",
        message: "Inicio de sesión exitoso",
        autoClose: true,
      });

      const redirectPath = window.innerWidth < 700 ? "/mobile" : "/";
      navigate(redirectPath);
    },
    onError: (error) => {
      console.log(error);
      if (error.message == "Network Error") {
        return addToast({
          type: "danger",
          message: "Error en la conexión con el servidor",
          autoClose: true,
        });
      }
      if (error.message) {
        addToast({
          type: "danger",
          message: "Credenciales incorrectas",
          autoClose: true,
        });
      }
    },
  });
};
