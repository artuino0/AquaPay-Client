import {
  createService,
  getSerives,
  getService,
  updateService,
} from "@/api/serviceApi";
import { useToastStore } from "@/stores/toastStore";
import { IServiceCreate, IServiceUpdate } from "@/types/service.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetServices = ({
  page,
  limit,
  keyword,
  meterless,
  isMobile = false,
}: {
  page: number;
  limit: number;
  keyword: string;
  meterless: boolean;
  isMobile?: boolean;
}) => {
  return useQuery({
    queryKey: ["allservices", page, limit, keyword, meterless, isMobile],
    queryFn: () => getSerives({ page, limit, keyword, meterless, isMobile }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetService = (serviceId: string) => {
  return useQuery({
    queryKey: ["service", serviceId],
    queryFn: () => getService(serviceId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateService = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (serviceData: IServiceCreate) => createService(serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allservices"] });
      addToast({
        type: "success",
        message: "Servicio creado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: AxiosError) => {
      addToast({
        type: "danger",
        message: error.message || "Error al crear servicio",
        autoClose: true,
      });
    },
  });
};

export const useUpdateService = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      serviceId,
      serviceData,
    }: {
      serviceId: string;
      serviceData: IServiceUpdate;
    }) => updateService(serviceId, serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      addToast({
        type: "success",
        message: "Servicio creado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: AxiosError) => {
      addToast({
        type: "danger",
        message: error.message || "Error al crear servicio",
        autoClose: true,
      });
    },
  });
};
