import { api } from "./apiInstance";

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};
