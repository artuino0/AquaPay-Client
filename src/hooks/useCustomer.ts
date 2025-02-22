import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "@/api/customersApi";
import { useToastStore } from "@/stores/toastStore";
import {
  ICustomerByID,
  ICustomerCreate,
  ICustomerRequest,
  ICustomerUpdate,
} from "@/types/customer.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCustomers = (
  page: number,
  limit: number,
  showDeleted: boolean
) => {
  return useQuery<ICustomerRequest>({
    queryKey: ["customers", page, limit, showDeleted],
    queryFn: () => getCustomers({ page, limit, showDeleted }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetCustomerById = (customerId: string) => {
  return useQuery<ICustomerByID>({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerById(customerId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCustomer = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerData: ICustomerCreate) => createCustomer(customerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      addToast({
        type: "success",
        message: "Cliente creado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al crear cliente",
        autoClose: true,
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const addToast = useToastStore((state) => state.addToast);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      customerId,
      customerData,
    }: {
      customerId: string;
      customerData: ICustomerUpdate;
    }) => updateCustomer(customerId, customerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      addToast({
        type: "success",
        message: "Cliente actualizado exitosamente",
        autoClose: true,
      });
    },
    onError: (error: any) => {
      addToast({
        type: "danger",
        message: error.message || "Error al actualizar cliente",
        autoClose: true,
      });
    },
  });
};
