import { createUser, getUsers, updateUser, deleteUser } from "@/api/usersApi";
import { useToastStore } from "@/stores/toastStore";
import { IUserCreate, IUserRequest, IUserUpdate } from "@/types/user.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUsers = (
  page: number,
  limit: number,
  showDeleted: boolean
) => {
  return useQuery<IUserRequest>({
    queryKey: ["users", page, limit, showDeleted],
    queryFn: () => getUsers({ page, limit, showDeleted }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateUser = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: IUserCreate) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      addToast({
        type: "success",
        message: "Usuario creado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al crear usuario",
        autoClose: true,
      });
    },
  });
};

export const useUpdateUser = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      userData,
    }: {
      userId: string;
      userData: IUserUpdate;
    }) => updateUser(userId, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      addToast({
        type: "success",
        message: "Usuario actualizado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al actualizar usuario",
        autoClose: true,
      });
    },
  });
};

export const useDeleteUser = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      addToast({
        type: "success",
        message: "Usuario eliminado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al eliminar usuario",
        autoClose: true,
      });
    },
  });
};
