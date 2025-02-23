import {
  IService,
  IServiceCreate,
  IServiceGetResponse,
  IServiceUpdate,
} from "@/types/service.interface";
import { api } from "./apiInstance";

export const getSerives = async ({
  page,
  limit,
  keyword,
  meterless,
  isMobile,
}: {
  page: number;
  limit: number;
  keyword: string;
  meterless: boolean;
  isMobile: boolean;
}) => {
  const response = await api.get<IServiceGetResponse>("/services", {
    params: { page, limit, keyword, meterless, isMobile },
  });
  return response.data;
};

export const getService = async (id: string) => {
  const response = await api.get<IService>(`/services/${id}`);
  return response.data;
};

export const createService = async (data: IServiceCreate) => {
  const response = await api.post<IServiceCreate>("/services", data);
  return response.data;
};

export const updateService = async (id: string, data: IServiceUpdate) => {
  const response = await api.put<IServiceUpdate>(`/services/${id}`, data);
  return response.data;
};
