import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_PATH } from "../global.variables";

interface IAxiosRequest {
  endpoint: string;
  method: string;
  body?: any;
}

const requestController = <T>(data: IAxiosRequest): Promise<T> => {
  const config: AxiosRequestConfig = {
    method: data.method,
    url: `${BASE_PATH}/${data.endpoint}`,
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
    data: data.body,
  };

  return axios(config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch((e: AxiosError) => {
      if (e.response) {
        if (e.response.status === 401) {
          alert("Tu sesion a caducado, vuelve a iniciar sesion!");
          window.localStorage.removeItem("token");
          window.location.replace("/login");
        }
      } else {
        alert("Servidor no disponible");
      }
      console.error("Error en la solicitud:", e);
      throw e;
    });
};

export default requestController;
