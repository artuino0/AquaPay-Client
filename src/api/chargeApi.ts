import { ICharge } from "@/types/charge.interface";
import { api } from "./apiInstance";

export const getCharges = async (): Promise<ICharge[]> => {
  const response = await api.get<ICharge[]>("/charges");
  return response.data;
};

export const createCharge = async (data: Partial<ICharge>): Promise<ICharge> => {
  const response = await api.post<ICharge>("/charges", data);
  return response.data;
};

export const updateCharge = async (id: string, data: Partial<ICharge>): Promise<ICharge> => {
  const response = await api.put<ICharge>(`/charges/${id}`, data);
  return response.data;
};

export const deleteCharge = async (id: string): Promise<void> => {
  await api.delete(`/charges/${id}`);
};