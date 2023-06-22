export interface ILogin {
  user: {
    id: string;
    phone: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
  };
  token: string;
}
export interface ILoginError {
  error: string;
}
