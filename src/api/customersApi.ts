import { api } from "./apiInstance";
import {
  ICustomerByID,
  ICustomerCreate,
  ICustomerRequest,
  ICustomerUpdate,
} from "@/types/customer.interface";

export const getCustomers = async ({
  page,
  limit,
  showDeleted,
}: {
  page: number;
  limit: number;
  showDeleted: boolean;
}): Promise<ICustomerRequest> => {
  const response = await api.get<ICustomerRequest>("/customers", {
    params: { page, limit, showDeleted },
  });
  return response.data;
};

export const getCustomerById = async (id: string) => {
  const response = await api.get<ICustomerByID>("/customers/" + id);
  return response.data;
};

export const createCustomer = async (data: ICustomerCreate) => {
  const response = await api.post<ICustomerCreate>("/customers", data);
  return response.data;
};

export const updateCustomer = async (id: string, data: ICustomerUpdate) => {
  const response = await api.put<ICustomerUpdate>("/customers/" + id, data);
  return response.data;
};

export const deleteCustomer = async (serviceId: string): Promise<void> => {
  await api.delete(`/customers/${serviceId}`);
};
