import { api } from "@/api/apiInstance";
import { ICompany } from "@/interfaces/company";

export const getCompanySettings = async (): Promise<ICompany> => {
  const response = await api.get<ICompany>("/settings");
  return response.data;
};

export const updateCompanySettings = async (
  formData: FormData
): Promise<void> => {
  await api.post("/settings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
