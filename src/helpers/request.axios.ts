import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_PATH } from "../global.variables";

interface IAxiosRequest {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: any;
}

const requestController = <T>(data: IAxiosRequest): Promise<T> => {
  console.log(data);
  const config: AxiosRequestConfig = {
    method: data.method,
    url: `${BASE_PATH}/${data.endpoint}`,
    headers: {
      Authorization: window.localStorage.getItem("token"),
      "Content-Type": data.headers ? "multipart/form-data" : "application/json",
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
