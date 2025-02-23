import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/stores/toastStore";
import {
  getTariffs,
  getTariffById,
  createTariff,
  updateTariff,
  deleteTariff,
  activateTariff,
} from "@/api/tariffApi";

export const useGetTariffs = () => {
  return useQuery({
    queryKey: ["tariffs"],
    queryFn: () => getTariffs(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetTariffById = (tariffId: string) => {
  return useQuery({
    queryKey: ["tariff", tariffId],
    queryFn: () => getTariffById(tariffId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateTariff = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tariffData: any) => createTariff(tariffData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tariffs"] });
      addToast({
        type: "success",
        message: "Tarifa creada exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al crear tarifa",
        autoClose: true,
      });
    },
  });
};

export const useUpdateTariff = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tariffId,
      tariffData,
    }: {
      tariffId: string;
      tariffData: any;
    }) => updateTariff(tariffId, tariffData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tariffs"] });

      addToast({
        type: "success",
        message: "Tarifa actualizada exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al actualizar tarifa",
        autoClose: true,
      });
    },
  });
};

export const useDeleteTariff = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tariffId: string) => deleteTariff(tariffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tariffs"] });
      addToast({
        type: "success",
        message: "Tarifa eliminada exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al eliminar tarifa",
        autoClose: true,
      });
    },
  });
};

export const useActivateTariff = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tariffId: string) => activateTariff(tariffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tariffs"] });
      addToast({
        type: "success",
        message: "Tarifa activada exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al activar tarifa",
        autoClose: true,
      });
    },
  });
};
