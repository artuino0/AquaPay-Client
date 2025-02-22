import { IUserCreate, IUserRequest, IUserUpdate } from "@/types/user.interface";
import { api } from "./apiInstance";

export const getUsers = async ({
  page,
  limit,
  showDeleted,
}: {
  page: number;
  limit: number;
  showDeleted: boolean;
}): Promise<IUserRequest> => {
  const response = await api.get<IUserRequest>("/users", {
    params: { page, limit, showDeleted },
  });
  return response.data;
};

export const createUser = async (data: IUserCreate) => {
  const response = await api.post<IUserCreate>("/users", data);
  return response.data;
};

export const updateUser = async (id: string, data: IUserUpdate) => {
  const response = await api.put<IUserUpdate>("/users/" + id, data);
  return response.data;
};

export const deleteUser = async (serviceId: string): Promise<void> => {
  await api.delete(`/users/${serviceId}`);
};
