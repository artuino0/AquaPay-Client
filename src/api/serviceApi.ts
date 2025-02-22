import { IServiceCreate, IServiceUpdate } from "@/types/service.interface";
import { api } from "./apiInstance";

export const createService = async (data: IServiceCreate) => {
  const response = await api.post<IServiceCreate>("/services", data);
  return response.data;
};

export const updateService = async (id: string, data: IServiceUpdate) => {
  const response = await api.put<IServiceUpdate>(`/services/${id}`, data);
  return response.data;
};
