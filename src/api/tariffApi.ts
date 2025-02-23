import { api } from "./apiInstance";
import { ITariffRequest } from "@/types/tariff.interface";

export const getTariffs = async () => {
  const { data } = await api.get<ITariffRequest>(`/tariffs`);
  return data;
};

export const getTariffById = async (tariffId: string) => {
  const { data } = await api.get(`/tariffs/${tariffId}`);
  return data;
};

export const createTariff = async (tariffData: any) => {
  const { data } = await api.post(`/tariffs`, tariffData);
  return data;
};

export const updateTariff = async (tariffId: string, tariffData: any) => {
  const { data } = await api.put(`/tariffs/${tariffId}`, tariffData);
  return data;
};

export const deleteTariff = async (tariffId: string) => {
  const { data } = await api.delete(`/tariffs/${tariffId}`);
  return data;
};

export const activateTariff = async (tariffId: string) => {
  const { data } = await api.patch(`/tariffs/${tariffId}/activate`);
  return data;
};
