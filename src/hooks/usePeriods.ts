import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPeriods, createPeriod } from "../api/periodApi";
import { IPeriod } from "../types/period.interface";
import { useToastStore } from "@/stores/toastStore";

export const useGetPeriods = () => {
  return useQuery<IPeriod[]>({
    queryKey: ["periods"],
    queryFn: getPeriods,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreatePeriod = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (periodData: {
      month: number;
      year: number;
      fecha_inicio: Date;
      fecha_fin: Date;
      fecha_limite_pago: Date;
    }) => createPeriod(periodData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["periods"] });
      addToast({
        type: "success",
        message: "Periodo creado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al crear periodo",
        autoClose: true,
      });
    },
  });
};
