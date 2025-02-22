import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanySettings, updateCompanySettings } from "@/api/companyApi";
import { ICompany } from "@/interfaces/company";
import { useToastStore } from "@/stores/toastStore";

export const useGetCompanySettings = () => {
  return useQuery<ICompany>({
    queryKey: ["companySettings"],
    queryFn: getCompanySettings,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateCompanySettings = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: updateCompanySettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companySettings"] });
      addToast({
        type: "success",
        message: "Configuración actualizada",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al actualizar configuración",
        autoClose: true,
      });
    },
  });
};
