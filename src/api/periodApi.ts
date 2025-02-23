import { IPeriod } from "@/types/period.interface";
import { api } from "./apiInstance";

export const getPeriods = async (): Promise<IPeriod[]> => {
  const response = await api.get<IPeriod[]>("/periods");
  return response.data;
};

export const createPeriod = async (
  data: Partial<IPeriod>
): Promise<IPeriod> => {
  const response = await api.post<IPeriod>("/periods", data);
  return response.data;
};

export const updatePeriod = async (
  id: string,
  data: Partial<IPeriod>
): Promise<IPeriod> => {
  const response = await api.put<IPeriod>(`/periods/${id}`, data);
  return response.data;
};

export const deletePeriod = async (id: string): Promise<void> => {
  await api.delete(`/periods/${id}`);
};
