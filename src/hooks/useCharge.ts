import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCharges, createCharge, updateCharge, deleteCharge } from "@/api/chargeApi";
import { ICharge } from "../types/charge.interface";
import { useToastStore } from "@/stores/toastStore";

export const useGetCharges = () => {
  return useQuery<ICharge[]>({
    queryKey: ["charges"],
    queryFn: getCharges,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCharge = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (data: Partial<ICharge>) => createCharge(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charges"] });
      addToast({
        type: "success",
        message: "Cargo creado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al crear cargo",
        autoClose: true,
      });
    },
  });
};

export const useUpdateCharge = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ICharge> }) => updateCharge(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charges"] });
      addToast({
        type: "success",
        message: "Cargo actualizado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al actualizar cargo",
        autoClose: true,
      });
    },
  });
};

export const useDeleteCharge = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (id: string) => deleteCharge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["charges"] });
      addToast({
        type: "success",
        message: "Cargo eliminado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al eliminar cargo",
        autoClose: true,
      });
    },
  });
};
